
'use client';

import { useState, useRef, useEffect } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  searchHistory: string[];
  clearHistory: () => void;
}

interface QuickPrompt {
  text: string;
  emoji: string;
  query: string;
}

export default function SearchInput({ onSearch, isLoading, searchHistory, clearHistory }: SearchInputProps) {
  const [query, setQuery] = useState<string>('');
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const historyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyButtonRef = useRef<HTMLButtonElement>(null);

  const quickPrompts: QuickPrompt[] = [
    { emoji: '💰', text: 'Bitcoin Price', query: 'Bitcoin price prediction and analysis' },
    { emoji: '📈', text: 'Market Trends', query: 'Cryptocurrency market trends this week' },
    { emoji: '🖼️', text: 'NFT News', query: 'Latest NFT market news and trends' },
    { emoji: '🏦', text: 'DeFi Updates', query: 'DeFi protocols performance and updates' },
    { emoji: '🔮', text: 'Altcoin Predictions', query: 'Promising altcoins price predictions' },
    { emoji: '📊', text: 'Trading Strategies', query: 'Effective cryptocurrency trading strategies' },
    { emoji: '🧠', text: 'Market Sentiment', query: 'Current cryptocurrency market sentiment analysis and investor mood' },
    { emoji: '🔑', text: 'Web3 Trends', query: 'Latest Web3 technology trends and developments' },
    { emoji: '⛓️', text: 'Layer 2 Solutions', query: 'Layer 2 scaling solutions for Ethereum and performance' },
    { emoji: '🔒', text: 'Security News', query: 'Recent cryptocurrency security incidents and best practices' },
    { emoji: '🏛️', text: 'Regulation Updates', query: 'Latest cryptocurrency regulation news and compliance requirements' },
    { emoji: '🤖', text: 'AI & Crypto', query: 'Intersection of artificial intelligence and cryptocurrency technologies' },
    { emoji: '🌐', text: 'Metaverse Projects', query: 'Top metaverse cryptocurrency projects and developments' },
    { emoji: '💎', text: 'Staking Opportunities', query: 'Best cryptocurrency staking opportunities and yields' },
    // Twitter-specific prompts
    { emoji: '🐦', text: 'Crypto Twitter', query: 'Cryptocurrency trending discussions on Twitter' },
    { emoji: '🔥', text: 'Viral Crypto Tweets', query: 'Viral cryptocurrency tweets' },
    { emoji: '👨‍💼', text: 'Crypto Influencers', query: 'Cryptocurrency influencers opinions' },
    { emoji: '📰', text: 'Breaking Crypto News', query: 'Breaking cryptocurrency news' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowHistory(false);
    }
  };

  const handleQuickPrompt = (promptQuery: string) => {
    setQuery(promptQuery);
    onSearch(promptQuery);
    setShowHistory(false);
  };

  const handleHistoryClick = (historyItem: string) => {
    setQuery(historyItem);
    onSearch(historyItem);
    setShowHistory(false);
  };

  // Toggle history dropdown
  const toggleHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowHistory(!showHistory);
  };

  // Close history dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        historyRef.current && 
        !historyRef.current.contains(event.target as Node) && 
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) &&
        historyButtonRef.current &&
        !historyButtonRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative flex items-center">
          {/* Search history button - moved to the left outside the input */}
          {searchHistory.length > 0 && (
            <button
              ref={historyButtonRef}
              type="button"
              onClick={toggleHistory}
              className={`mr-2 p-2.5 ${showHistory ? 'bg-blue-500/40' : 'bg-blue-500/20'} hover:bg-blue-500/30 rounded-full text-blue-300 hover:text-blue-200 transition-all duration-300 flex-shrink-0 relative`}
              title="Search history"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {searchHistory.length}
              </span>
            </button>
          )}
          
          {/* Search input */}
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask CoinPlexity about crypto markets, coins, or trading..."
              className="w-full px-5 py-4 rounded-xl border border-blue-400/30 bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-blue-200 shadow-lg"
              disabled={isLoading}
            />
            
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-lg transition-all duration-300 ${
                isLoading || !query.trim() 
                  ? 'bg-blue-500/50 text-blue-200 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:shadow-lg hover:from-blue-600 hover:to-cyan-500'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {'Analyzing...'}
                </div>
              ) : (
                'Search'
              )}
            </button>
          </div>
          
          {/* Search history dropdown */}
          {showHistory && searchHistory.length > 0 && (
            <div 
              ref={historyRef}
              className="absolute z-20 top-full left-0 w-full bg-[#1E293B]/90 backdrop-blur-md rounded-xl border border-blue-400/30 shadow-xl overflow-hidden"
              style={{ marginTop: '10px' }}
            >
              <div className="flex justify-between items-center px-4 py-3 border-b border-blue-400/20 bg-gradient-to-r from-blue-900/30 to-indigo-900/30">
                <h3 className="text-sm font-medium text-blue-300 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recent Searches
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearHistory();
                    setShowHistory(false);
                  }}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear History
                </button>
              </div>
              <ul className="max-h-60 overflow-y-auto py-1">
                {searchHistory.map((item, index) => (
                  <li 
                    key={index}
                    onClick={() => handleHistoryClick(item)}
                    className="px-4 py-2.5 hover:bg-white/10 cursor-pointer flex items-center text-blue-100 transition-colors duration-150"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 truncate">{item}</div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHistoryClick(item);
                      }}
                      className="ml-2 p-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </form>

      <div className="flex flex-wrap gap-2">
        {quickPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handleQuickPrompt(prompt.query)}
            disabled={isLoading}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm border disabled:opacity-50 disabled:cursor-not-allowed
              ${prompt.text.includes('Twitter') || prompt.query.includes('twitter') 
                ? 'bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 text-blue-100 border-blue-400/30' 
                : 'bg-white/10 hover:bg-white/20 text-blue-100 border-white/10'}`}
          >
            <span className="mr-2">{prompt.emoji}</span>
            {prompt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
  