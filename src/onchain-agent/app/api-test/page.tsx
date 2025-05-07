
'use client';

import { useState } from 'react';

export default function ApiTestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testExaSearch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          protocol: 'https',
          origin: 'api.exa.ai',
          path: '/search',
          headers: {
            'Authorization': 'Bearer secret_cm83jutwj00002v6sw3vhzgab',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            query: 'Bitcoin price',
            numResults: 3,
            useAutoprompt: true,
          }),
        }),
      });

      if (!response.ok) {
        let errorMessage = `API returned ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // If we can't parse JSON, try to get text
          try {
            const errorText = await response.text();
            errorMessage = `${errorMessage}: ${errorText.substring(0, 200)}...`;
          } catch (e2) {
            // If all else fails, use status code
            errorMessage = `API returned status ${response.status}`;
          }
        }
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Expected JSON response but got ${contentType}: ${text.substring(0, 200)}...`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('API test error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">API Proxy Test</h1>
        
        <div className="mb-8">
          <button
            onClick={testExaSearch}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Testing...' : 'Test Exa Search API'}
          </button>
        </div>
        
        {error && (
          <div className="mb-8 p-4 bg-red-900/30 border border-red-500/30 rounded-lg text-red-300">
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <pre className="whitespace-pre-wrap overflow-auto max-h-[300px]">{error}</pre>
          </div>
        )}
        
        {result && (
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
            <h2 className="text-xl font-semibold mb-4">API Response</h2>
            <div className="overflow-auto max-h-[500px]">
              <pre className="text-sm text-blue-200 whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
   