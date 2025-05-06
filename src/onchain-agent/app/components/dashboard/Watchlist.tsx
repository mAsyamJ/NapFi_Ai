
'use client';

import { useState } from 'react';
import { CryptoData } from '../../types/dashboard';
import CoinSelector from './CoinSelector';

interface WatchlistProps {
  watchlistData: CryptoData[];
  allCryptoData: CryptoData[];
  removeFromWatchlist: (coinId: string) => void;
  addToWatchlist: (coinId: string) => void;
}

export default function Watchlist({ 
  watchlistData, 
  allCryptoData,
  removeFromWatchlist,
  addToWatchlist
}: WatchlistProps) {
  const [isAddingCoin, setIsAddingCoin] = useState(false);

  const handleAddCoin = (coinId: string) => {
    addToWatchlist(coinId);
    setIsAddingCoin(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-blue-200">{'Your Watchlist'}</h3>
        <button
          onClick={() => setIsAddingCoin(!isAddingCoin)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            isAddingCoin 
              ? 'bg-blue-500/50 text-white' 
              : 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:shadow-lg'
          }`}
        >
          {isAddingCoin ? 'Cancel' : '+ Add Coin'}
        </button>
      </div>

      {isAddingCoin && (
        <div className="mb-6 p-5 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-lg">
          <CoinSelector 
            coins={allCryptoData.filter(coin => !watchlistData.some(w => w.id === coin.id))}
            onSelect={handleAddCoin}
          />
        </div>
      )}

      {watchlistData.length === 0 ? (
        <div className="text-center py-12 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/50 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <p className="text-blue-200">{'Your watchlist is empty. Add coins to track them here.'}</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-lg">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                  {'Coin'}
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                  {'Price'}
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                  {'24h %'}
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                  {'Market Cap'}
                </th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-blue-300 uppercase tracking-wider">
                  {'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {watchlistData.map((coin) => (
                <tr key={coin.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-white/10 rounded-full p-1">
                        <img className="h-full w-full rounded-full" src={coin.image} alt={coin.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{coin.name}</div>
                        <div className="text-sm text-blue-300">{coin.symbol.toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white font-medium">${coin.currentPrice.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      coin.priceChangePercentage24h >= 0 
                        ? 'bg-green-900/30 text-green-300 border border-green-500/30' 
                        : 'bg-red-900/30 text-red-300 border border-red-500/30'
                    }`}>
                      {coin.priceChangePercentage24h >= 0 ? '+' : ''}{coin.priceChangePercentage24h.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-200">
                    ${coin.marketCap.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => removeFromWatchlist(coin.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      {'Remove'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
      