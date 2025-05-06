
'use client';

import { useState } from 'react';
import { CryptoData } from '../../types/dashboard';

interface CoinSelectorProps {
  coins: CryptoData[];
  onSelect: (coinId: string) => void;
}

export default function CoinSelector({ coins, onSelect }: CoinSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCoins = searchTerm
    ? coins.filter(coin => 
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : coins;

  return (
    <div>
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search coins..."
          className="w-full pl-12 py-3 bg-[#0F172A]/80 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-inner"
        />
      </div>
      
      <div className="max-h-60 overflow-y-auto rounded-lg border border-gray-700/30 bg-[#0F172A]/50 backdrop-blur-md">
        {filteredCoins.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            {'No coins found'}
          </div>
        ) : (
          <ul className="divide-y divide-gray-700/30">
            {filteredCoins.map((coin) => (
              <li 
                key={coin.id}
                onClick={() => onSelect(coin.id)}
                className="p-3 hover:bg-white/5 cursor-pointer transition-colors duration-150"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-[#0F172A] rounded-full p-1 border border-gray-700/30 flex items-center justify-center">
                    <img className="h-8 w-8 rounded-full" src={coin.image} alt={coin.name} />
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-white">{coin.name}</div>
                    <div className="text-sm text-gray-400">{coin.symbol.toUpperCase()}</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="font-medium text-white font-mono">${coin.currentPrice.toLocaleString()}</div>
                    <div className={`text-sm ${coin.priceChangePercentage24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {coin.priceChangePercentage24h >= 0 ? '+' : ''}{coin.priceChangePercentage24h.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
   