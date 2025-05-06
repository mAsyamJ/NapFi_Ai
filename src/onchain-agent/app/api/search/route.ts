
import { NextRequest, NextResponse } from 'next/server';

const EXA_API_KEY = 'secret_cm83jutwj00002v6sw3vhzgab';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    console.log('Making search request with query:', query);

    const response = await fetch('https://api.exa.ai/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${EXA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        numResults: 10,
        useAutoprompt: true,
        text: true,
        highlights: true,
      }),
    });

    // Log the response status and headers for debugging
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    // Handle non-OK responses
    if (!response.ok) {
      let errorMessage = `API returned status ${response.status}`;
      const contentType = response.headers.get('content-type');
      
      try {
        if (contentType?.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } else {
          const errorText = await response.text();
          errorMessage = `${errorMessage}: ${errorText.substring(0, 200)}`;
        }
      } catch (parseError) {
        console.error('Error parsing error response:', parseError);
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    // Handle successful response
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: `Expected JSON response but got ${contentType}` },
        { status: 500 }
      );
    }

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      console.error('Response text:', responseText);
      return NextResponse.json(
        { error: 'Invalid JSON response from API' },
        { status: 500 }
      );
    }

    // Process the results to add TLDR summaries
    const resultsWithTldr = await Promise.all(
      data.results.map(async (result: any) => {
        try {
          const summaryResponse = await fetch('/api/summary', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: result.title,
              content: result.text,
              sourceType: result.url.includes('twitter.com') ? 'twitter' : 
                         result.url.includes('reddit.com') ? 'reddit' : 'web',
            }),
          });

          if (summaryResponse.ok) {
            const { summary } = await summaryResponse.json();
            return { ...result, tldr: summary };
          }
          
          return result;
        } catch (error) {
          console.error('Error generating TLDR for result:', error);
          return result;
        }
      })
    );

    // Return the processed results
    return NextResponse.json({
      ...data,
      results: resultsWithTldr,
    });
  } catch (error) {
    console.error('Unexpected search error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to complete search request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
      