
'use client';

import { useState } from 'react';
import { SearchResult } from '@/types/search';

interface BookmarksProps {
  bookmarkedArticles: SearchResult[];
  removeBookmark: (articleId: string) => void;
}

export default function Bookmarks({ bookmarkedArticles, removeBookmark }: BookmarksProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const articlesPerPage = 5;

  // Format TLDR to highlight AI Analysis section
  const formatTldr = (tldr: string | undefined): JSX.Element => {
    if (!tldr) return <></>;
    
    const parts = tldr.split('AI Analysis:');
    
    if (parts.length === 1) {
      return <p>{tldr}</p>;
    }
    
    return (
      <>
        <p>{parts[0].trim()}</p>
        <div className="mt-2 pt-2 border-t border-blue-500/30">
          <p className="flex items-center">
            <span className="inline-block w-4 h-4 mr-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex-shrink-0"></span>
            <span className="font-semibold text-blue-300">AI Analysis:</span>
          </p>
          <p className="mt-1 pl-6">{parts[1].trim()}</p>
        </div>
      </>
    );
  };

  // Filter articles based on search term
  const filteredArticles = bookmarkedArticles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (article.summary && article.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (article.tldr && article.tldr.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sort articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = a.publishedDate ? new Date(a.publishedDate).getTime() : 0;
      const dateB = b.publishedDate ? new Date(b.publishedDate).getTime() : 0;
      return dateB - dateA; // Most recent first
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  // Calculate pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = sortedArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200">
          {'Your Bookmarks'}
        </h2>
        <div className="text-blue-300">
          <span className="font-semibold">{bookmarkedArticles.length}</span> saved articles
        </div>
      </div>

      {/* Search and sort controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            placeholder="Search your bookmarks..."
            className="w-full pl-12 py-3 bg-white/10 border border-blue-400/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-blue-200"
          />
        </div>
        <div className="flex-shrink-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
            className="px-4 py-3 bg-white/10 border border-blue-400/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
          >
            <option value="date" className="bg-gray-800 text-white">Sort by Date</option>
            <option value="title" className="bg-gray-800 text-white">Sort by Title</option>
          </select>
        </div>
      </div>

      {/* Empty state */}
      {bookmarkedArticles.length === 0 && (
        <div className="text-center py-16 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/50 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">No bookmarks yet</h3>
          <p className="text-blue-200 max-w-md mx-auto">
            Start exploring crypto articles and save them here for easy reference. Look for the bookmark icon when viewing search results.
          </p>
        </div>
      )}

      {/* Search results empty state */}
      {bookmarkedArticles.length > 0 && filteredArticles.length === 0 && (
        <div className="text-center py-12 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-400/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-blue-200">No bookmarks match your search. Try different keywords.</p>
        </div>
      )}

      {/* Bookmarked articles */}
      {currentArticles.length > 0 && (
        <div className="space-y-6">
          {currentArticles.map((article) => (
            <div key={article.id} className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6 transition-all duration-300 hover:bg-white/15">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">
                  <a 
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    {article.title}
                  </a>
                </h3>
                <button 
                  onClick={() => removeBookmark(article.id)}
                  className="ml-2 p-2 rounded-full text-yellow-300 bg-yellow-500/20 hover:bg-yellow-500/30 transition-all duration-300"
                  title="Remove bookmark"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
              
              {article.publishedDate && (
                <p className="text-sm text-blue-200/70 mb-3">
                  {'Published: '}{new Date(article.publishedDate).toLocaleDateString()}
                </p>
              )}

              {'tldr' in article && article.tldr && (
                <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 p-4 rounded-lg mb-4 border border-blue-500/30">
                  <h3 className="font-semibold text-blue-300 mb-2">{'TLDR:'}</h3>
                  <div className="text-blue-100">
                    {formatTldr(article.tldr)}
                  </div>
                </div>
              )}
              
              {article.summary && (
                <div className="mb-4 text-blue-100/90">
                  <p>{article.summary}</p>
                </div>
              )}
              
              {article.author && (
                <p className="text-sm text-blue-200/70 mt-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {article.author}
                </p>
              )}
              
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                <div className="flex items-center">
                  {article.favicon && (
                    <img src={article.favicon} alt="Source" className="h-4 w-4 mr-2" />
                  )}
                  <span className="text-xs text-blue-200/60 truncate">
                    {new URL(article.url).hostname}
                  </span>
                </div>
                <a 
                  href={article.url} 
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
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px bg-white/5 backdrop-blur-md p-1 border border-white/10">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
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
                onClick={() => paginate(index + 1)}
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
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
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