
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

// Retry configuration
const MAX_RETRIES = 3;
const BASE_DELAY = 1000; // Start with 1 second delay

// Helper function for exponential backoff delay
const getDelay = (retryCount: number) => {
  return BASE_DELAY * Math.pow(2, retryCount);
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  let retryCount = 0;

  const makeRequest = async (): Promise<Response> => {
    try {
      const body = await req.json();
      const { protocol, origin, path, headers, method, body: requestBody } = body;

      if (!protocol || !origin || !path) {
        throw new Error('Missing required proxy parameters');
      }

      const url = `${protocol}://${origin}${path}`;
      console.log(`[Attempt ${retryCount + 1}] Making request to: ${url}`);

      const response = await fetch(url, {
        method: method || 'POST',
        headers: {
          ...headers,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      console.log(`Response status: ${response.status}`);

      if (!response.ok) {
        const contentType = response.headers.get('content-type') || '';
        let errorMessage = `API returned status ${response.status}`;

        try {
          if (contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.error?.message || errorMessage;
          } else {
            const errorText = await response.text();
            errorMessage = `${errorMessage}: ${errorText.substring(0, 200)}`;
          }
        } catch (e) {
          console.error('Error parsing error response:', e);
        }

        // Retry on specific status codes
        if ([429, 500, 502, 503, 504].includes(response.status) && retryCount < MAX_RETRIES) {
          retryCount++;
          const delay = getDelay(retryCount);
          console.log(`Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return makeRequest();
        }

        throw new Error(errorMessage);
      }

      const contentType = response.headers.get('content-type') || '';
      
      if (contentType.includes('application/json')) {
        const text = await response.text();
        
        try {
          // Validate JSON
          JSON.parse(text);
          
          return new Response(text, {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (e) {
          console.error('Invalid JSON response:', text);
          throw new Error('Invalid JSON response from API');
        }
      } else {
        const text = await response.text();
        return new Response(text, {
          status: 200,
          headers: {
            'Content-Type': contentType,
          },
        });
      }
    } catch (error) {
      // Retry on network errors
      if (retryCount < MAX_RETRIES && error instanceof Error && 
         (error.message.includes('fetch failed') || error.message.includes('network'))) {
        retryCount++;
        const delay = getDelay(retryCount);
        console.log(`Network error, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return makeRequest();
      }
      throw error;
    }
  };

  try {
    const response = await makeRequest();
    return NextResponse.json(await response.json(), { status: response.status, headers: response.headers });
  } catch (error) {
    console.error('Final error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
   