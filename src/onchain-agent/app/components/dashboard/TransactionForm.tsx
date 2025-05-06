
'use client';

import { useState } from 'react';
import { CryptoData, PortfolioItem } from '../../types/dashboard';
import CoinSelector from './CoinSelector';

interface TransactionFormProps {
  coins: CryptoData[];
  onSubmit: (transaction: PortfolioItem) => void;
}

export default function TransactionForm({ coins, onSubmit }: TransactionFormProps) {
  const [selectedCoinId, setSelectedCoinId] = useState<string>('');
  const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCoinId || !quantity || !price || !date) {
      return;
    }
    
    const newTransaction: PortfolioItem = {
      id: Date.now().toString(),
      coinId: selectedCoinId,
      type: transactionType,
      quantity: parseFloat(quantity),
      priceAtPurchase: parseFloat(price),
      date: new Date(date).toISOString(),
      notes: notes,
    };
    
    onSubmit(newTransaction);
    
    // Reset form
    setSelectedCoinId('');
    setTransactionType('buy');
    setQuantity('');
    setPrice('');
    setDate(new Date().toISOString().split('T')[0]);
    setNotes('');
  };

  const handleCoinSelect = (coinId: string) => {
    setSelectedCoinId(coinId);
    
    // Auto-fill current price
    const selectedCoin = coins.find(coin => coin.id === coinId);
    if (selectedCoin) {
      setPrice(selectedCoin.currentPrice.toString());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          {'Select Coin'}
        </label>
        {selectedCoinId ? (
          <div className="flex items-center mb-2 p-3 bg-[#1E293B]/50 backdrop-blur-md rounded-lg border border-gray-700/30">
            {(() => {
              const coin = coins.find(c => c.id === selectedCoinId);
              return (
                <>
                  <div className="flex-shrink-0 h-10 w-10 bg-[#0F172A] rounded-full p-1 border border-gray-700/30 flex items-center justify-center">
                    <img src={coin?.image} alt={coin?.name} className="h-8 w-8 rounded-full" />
                  </div>
                  <div className="ml-3">
                    <span className="font-medium text-white">{coin?.name}</span>
                    <span className="text-gray-400 ml-2">({coin?.symbol.toUpperCase()})</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setSelectedCoinId('')}
                    className="ml-auto text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    {'Change'}
                  </button>
                </>
              );
            })()}
          </div>
        ) : (
          <CoinSelector coins={coins} onSelect={handleCoinSelect} />
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
            </svg>
            {'Transaction Type'}
          </label>
          <div className="flex">
            <button
              type="button"
              onClick={() => setTransactionType('buy')}
              className={`flex-1 py-3 text-sm font-medium rounded-l-lg transition-all duration-300 ${
                transactionType === 'buy'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                  : 'bg-[#1E293B]/50 text-gray-300 hover:bg-[#1E293B]/70 border border-gray-700/30'
              }`}
            >
              <div className="flex items-center justify-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                {'Buy'}
              </div>
            </button>
            <button
              type="button"
              onClick={() => setTransactionType('sell')}
              className={`flex-1 py-3 text-sm font-medium rounded-r-lg transition-all duration-300 ${
                transactionType === 'sell'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                  : 'bg-[#1E293B]/50 text-gray-300 hover:bg-[#1E293B]/70 border border-gray-700/30'
              }`}
            >
              <div className="flex items-center justify-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                </svg>
                {'Sell'}
              </div>
            </button>
          </div>
        </div>
        
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            {'Date'}
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 bg-[#0F172A]/80 border border-gray-700/50 rounded-lg text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
            </svg>
            {'Quantity'}
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0.00"
            step="any"
            min="0"
            className="w-full px-4 py-3 bg-[#0F172A]/80 border border-gray-700/50 rounded-lg text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            required
          />
        </div>
        
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {'Price per Coin (USD)'}
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            step="any"
            min="0"
            className="w-full px-4 py-3 bg-[#0F172A]/80 border border-gray-700/50 rounded-lg text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          {'Notes (Optional)'}
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="w-full px-4 py-3 bg-[#0F172A]/80 border border-gray-700/50 rounded-lg text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!selectedCoinId || !quantity || !price || !date}
          className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
            !selectedCoinId || !quantity || !price || !date
              ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:from-blue-600 hover:to-indigo-700'
          }`}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {'Add Transaction'}
        </button>
      </div>
    </form>
  );
}
    