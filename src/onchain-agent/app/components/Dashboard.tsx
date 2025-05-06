
'use client';

import { useState, useEffect } from 'react';
import Watchlist from './dashboard/Watchlist';
import Portfolio from './dashboard/Portfolio';
import { CryptoData, PortfolioItem } from '../types/dashboard';
import { mockCryptoData } from '../data/mockData';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<'watchlist' | 'portfolio'>('watchlist');
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [cryptoData, setCryptoData] = useState<CryptoData[]>(mockCryptoData);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('NapFi-watchlist');
    const savedPortfolio = localStorage.getItem('NapFi-portfolio');
    
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
    
    if (savedPortfolio) {
      setPortfolio(JSON.parse(savedPortfolio));
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('coinplexity-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('coinplexity-portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  // Add coin to watchlist
  const addToWatchlist = (coinId: string) => {
    if (!watchlist.includes(coinId)) {
      setWatchlist([...watchlist, coinId]);
    }
  };

  // Remove coin from watchlist
  const removeFromWatchlist = (coinId: string) => {
    setWatchlist(watchlist.filter(id => id !== coinId));
  };

  // Add transaction to portfolio
  const addTransaction = (transaction: PortfolioItem) => {
    setPortfolio([...portfolio, transaction]);
  };

  // Remove transaction from portfolio
  const removeTransaction = (transactionId: string) => {
    setPortfolio(portfolio.filter(item => item.id !== transactionId));
  };

  // Get watchlist data
  const watchlistData = cryptoData.filter(coin => watchlist.includes(coin.id));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200">
          {'Personal Dashboard'}
        </h2>
        <div className="inline-flex rounded-xl overflow-hidden backdrop-blur-lg bg-white/10 p-1 shadow-lg" role="group">
          <button
            type="button"
            onClick={() => setActiveSection('watchlist')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
              activeSection === 'watchlist'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md'
                : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            {'Watchlist'}
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('portfolio')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
              activeSection === 'portfolio'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md'
                : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            {'Portfolio'}
          </button>
        </div>
      </div>

      {activeSection === 'watchlist' ? (
        <Watchlist 
          watchlistData={watchlistData} 
          allCryptoData={cryptoData}
          removeFromWatchlist={removeFromWatchlist}
          addToWatchlist={addToWatchlist}
        />
      ) : (
        <Portfolio 
          portfolio={portfolio} 
          cryptoData={cryptoData}
          addTransaction={addTransaction}
          removeTransaction={removeTransaction}
        />
      )}
    </div>
  );
}
     