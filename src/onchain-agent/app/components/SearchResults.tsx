
'use client';

import { useState } from 'react';
import { type SearchResponse, SearchResult } from '@/types/search';

interface SearchResultsProps {
  results: SearchResponse;
  isLoading: boolean;
  onBookmark: (article: SearchResult) => void;
  bookmarkedArticles: SearchResult[];
}

export default function SearchResults({ results, isLoading, onBookmark, bookmarkedArticles }: SearchResultsProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const resultsPerPage = 5;

  // Function to validate and format date
  const validateAndFormatDate = (dateString?: string): { date: Date; display: string } => {
    const now = new Date();
    let date: Date;

    if (!dateString) {
      return { date: now, display: 'Recent' };
    }

    try {
      date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return { date: now, display: 'Recent' };
      }

      // If date is in the future, return current date
      if (date > now) {
        return { date: now, display: 'Recent' };
      }

      // Format the date display
      const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      // Calculate time differences
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      // Format relative time
      if (diffMins < 60) {
        return { 
          date, 
          display: `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago` 
        };
      } else if (diffHours < 24) {
        return { 
          date, 
          display: `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago` 
        };
      } else if (diffDays < 7) {
        return { 
          date, 
          display: `${diffDays} day${diffDays !== 1 ? 's' : ''} ago` 
        };
      } else {
        return { 
          date, 
          display: formatter.format(date) 
        };
      }
    } catch (error) {
      console.error('Date parsing error:', error);
      return { date: now, display: 'Recent' };
    }
  };

  // Sort results by validated date (most recent first)
  const sortedResults = [...results.results].sort((a, b) => {
    const dateA = validateAndFormatDate(a.publishedDate).date;
    const dateB = validateAndFormatDate(b.publishedDate).date;
    return dateB.getTime() - dateA.getTime();
  });

  // Calculate pagination
  const totalResults = sortedResults.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = sortedResults.slice(indexOfFirstResult, indexOfLastResult);

  // Format date for display
  const renderDate = (dateString?: string) => {
    const { display } = validateAndFormatDate(dateString);
    return display;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <p className="text-blue-300">
          <span className="font-semibold">{totalResults}</span> results found
        </p>
        {isLoading && (
          <div className="flex items-center text-blue-300">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Updating results...
          </div>
        )}
      </div>

      {currentResults.map((result) => (
        <div key={result.id} className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6 transition-all duration-300 hover:bg-white/15">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl font-semibold">
              <a 
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 transition-colors"
              >
                {result.title}
              </a>
            </h2>
            <button 
              onClick={() => onBookmark(result)}
              className={`ml-2 p-2 rounded-full transition-all duration-300 ${
                bookmarkedArticles.some(article => article.id === result.id)
                  ? 'text-yellow-300 bg-yellow-500/20' 
                  : 'text-gray-400 hover:text-yellow-300 hover:bg-white/10'
              }`}
              title={bookmarkedArticles.some(article => article.id === result.id) ? "Bookmarked" : "Add to bookmarks"}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill={bookmarkedArticles.some(article => article.id === result.id) ? "currentColor" : "none"} 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={bookmarkedArticles.some(article => article.id === result.id) ? 0 : 2} 
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
                />
              </svg>
            </button>
          </div>

          {result.publishedDate && (
            <p className="text-sm text-blue-200/70 mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {renderDate(result.publishedDate)}
            </p>
          )}

          {'tldr' in result && result.tldr && (
            <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 p-4 rounded-lg mb-4 border border-blue-500/30">
              <h3 className="font-semibold text-blue-300 mb-2">{'TLDR:'}</h3>
              <div className="text-blue-100">
                {result.tldr.split('AI Analysis:').map((part, index) => (
                  index === 0 ? (
                    <p key={index} className="mb-2">{part.trim()}</p>
                  ) : (
                    <div key={index} className="mt-2 pt-2 border-t border-blue-500/30">
                      <p className="flex items-center">
                        <span className="inline-block w-4 h-4 mr-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex-shrink-0"></span>
                        <span className="font-semibold text-blue-300">AI Analysis:</span>
                      </p>
                      <p className="mt-1 pl-6">{part.trim()}</p>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {result.highlights && result.highlights.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-blue-300 mb-2">{'Key Points:'}</h3>
              <ul className="space-y-2">
                {result.highlights.map((highlight, i) => (
                  <li key={i} className="text-blue-100/80 flex items-start">
                    <span className="inline-block w-4 h-4 mr-2 mt-1 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex-shrink-0"></span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.author && (
            <p className="text-sm text-blue-200/70 mt-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {result.author}
            </p>
          )}

          <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
            <div className="flex items-center">
              {result.favicon && (
                <img src={result.favicon} alt="Source" className="h-4 w-4 mr-2" />
              )}
              <span className="text-xs text-blue-200/60 truncate">
                {new URL(result.url).hostname}
              </span>
            </div>
            <a 
              href={result.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-blue-300 hover:text-blue-200 flex items-center"
            >
              Read Full Article
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px bg-white/5 backdrop-blur-md p-1 border border-white/10">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-3 py-2 rounded-l-md text-sm font-medium ${
                currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-blue-300 hover:bg-white/10'
              }`}
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                  currentPage === index + 1
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                    : 'text-blue-300 hover:bg-white/10'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-3 py-2 rounded-r-md text-sm font-medium ${
                currentPage === totalPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-blue-300 hover:bg-white/10'
              }`}
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
    