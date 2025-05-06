
'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import SearchResults from '@/components/SearchResults';
import SearchInput from '@/components/SearchInput';
import SearchFilters from '@/components/SearchFilters';
import { type SearchResponse, SearchResult } from '@/types/search';

export interface FilterState {
  category: string;
  timeframe: string;
  sourceType: string;
}

interface SearchInterfaceProps {
  onBookmark: (article: SearchResult) => void;
  bookmarkedArticles: SearchResult[];
}

export default function SearchInterface({ onBookmark, bookmarkedArticles }: SearchInterfaceProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    timeframe: 'all',
    sourceType: 'all',
  });
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('coinplexity-search-history');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to parse search history:', error);
      }
    }
  }, []);

  // Save search history to localStorage
  useEffect(() => {
    localStorage.setItem('coinplexity-search-history', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleSearch = useCallback(async (query: string) => {
    // Cancel any in-flight requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new abort controller
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    
    setIsLoading(true);
    setError('');
    setCurrentQuery(query);
    
    try {
      console.log('Making search request:', query);

      // Make search request to our mock API
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
        }),
        signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
        throw new Error(errorData.error || 'Failed to fetch search results');
      }

      const data = await response.json();
      console.log('Search response:', data);
      
      if (!data || !Array.isArray(data.results)) {
        throw new Error('Invalid response format from search API');
      }
      
      // Set search results
      setSearchResults(data);
      
      // Add to search history
      setSearchHistory(prev => {
        const filtered = prev.filter(item => item !== query);
        return [query, ...filtered].slice(0, 10);
      });
    } catch (err) {
      if (signal.aborted) {
        console.log('Search request was aborted');
        return;
      }
      
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      if (!signal.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    if (currentQuery) {
      handleSearch(currentQuery);
    }
  }, [currentQuery, handleSearch]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <SearchInput 
        onSearch={handleSearch} 
        isLoading={isLoading} 
        searchHistory={searchHistory}
        clearHistory={() => setSearchHistory([])}
      />
      
      <div className="relative">
        <div className="absolute -left-1 -top-1 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
        <div className="absolute -right-1 -bottom-1 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
        <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
      </div>
      
      {error && (
        <div className="text-red-400 bg-red-900/20 backdrop-blur-md p-4 rounded-xl border border-red-700/30 flex items-center">
          <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      {isLoading && !searchResults && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 relative">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-400">Searching the crypto universe...</p>
        </div>
      )}
      
      {searchResults && (
        <div className="relative">
          <div className="absolute -left-4 top-1/4 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl"></div>
          <div className="absolute right-0 bottom-1/3 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
          <SearchResults 
            results={searchResults} 
            isLoading={isLoading}
            onBookmark={onBookmark}
            bookmarkedArticles={bookmarkedArticles}
          />
        </div>
      )}
    </div>
  );
}
 