
'use client';

import { useState } from 'react';
import { CryptoData, PortfolioItem } from '../../types/dashboard';
import PortfolioSummary from './PortfolioSummary';
import TransactionForm from './TransactionForm';

interface PortfolioProps {
  portfolio: PortfolioItem[];
  cryptoData: CryptoData[];
  addTransaction: (transaction: PortfolioItem) => void;
  removeTransaction: (transactionId: string) => void;
}

export default function Portfolio({ 
  portfolio, 
  cryptoData,
  addTransaction,
  removeTransaction
}: PortfolioProps) {
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [activeTab, setActiveTab] = useState<'holdings' | 'transactions'>('holdings');

  // Calculate current value of each holding
  const portfolioWithCurrentValues = portfolio.map(item => {
    const coin = cryptoData.find(c => c.id === item.coinId);
    const currentPrice = coin ? coin.currentPrice : 0;
    const currentValue = item.quantity * currentPrice;
    const costBasis = item.quantity * item.priceAtPurchase;
    const profitLoss = currentValue - costBasis;
    const profitLossPercentage = costBasis > 0 ? (profitLoss / costBasis) * 100 : 0;
    
    return {
      ...item,
      currentPrice,
      currentValue,
      profitLoss,
      profitLossPercentage
    };
  });

  // Group transactions by coin
  const portfolioByCoins = portfolioWithCurrentValues.reduce((acc, item) => {
    const coin = cryptoData.find(c => c.id === item.coinId);
    if (!coin) return acc;
    
    const coinName = coin.name;
    const coinSymbol = coin.symbol.toUpperCase();
    
    if (!acc[item.coinId]) {
      acc[item.coinId] = {
        coinId: item.coinId,
        name: coinName,
        symbol: coinSymbol,
        image: coin.image,
        totalQuantity: 0,
        totalValue: 0,
        totalCost: 0,
        transactions: []
      };
    }
    
    acc[item.coinId].totalQuantity += item.quantity;
    acc[item.coinId].totalValue += item.currentValue;
    acc[item.coinId].totalCost += (item.quantity * item.priceAtPurchase);
    acc[item.coinId].transactions.push(item);
    
    return acc;
  }, {} as Record<string, any>);

  const portfolioSummary = Object.values(portfolioByCoins);

  // Calculate total portfolio value
  const totalPortfolioValue = portfolioWithCurrentValues.reduce(
    (sum, item) => sum + item.currentValue, 
    0
  );

  // Calculate total cost basis
  const totalCostBasis = portfolioWithCurrentValues.reduce(
    (sum, item) => sum + (item.quantity * item.priceAtPurchase), 
    0
  );

  // Calculate total profit/loss
  const totalProfitLoss = totalPortfolioValue - totalCostBasis;
  const totalProfitLossPercentage = totalCostBasis > 0 
    ? (totalProfitLoss / totalCostBasis) * 100 
    : 0;

  const handleAddTransaction = (transaction: PortfolioItem) => {
    addTransaction(transaction);
    setIsAddingTransaction(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {'Your Portfolio'}
        </h3>
        <button
          onClick={() => setIsAddingTransaction(!isAddingTransaction)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
            isAddingTransaction 
              ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70'
              : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:from-blue-600 hover:to-indigo-700'
          }`}
        >
          {isAddingTransaction ? (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              {'Cancel'}
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              {'Add Transaction'}
            </>
          )}
        </button>
      </div>

      {isAddingTransaction && (
        <div className="mb-6 p-5 bg-[#1E293B]/50 backdrop-blur-md rounded-xl border border-gray-700/30 shadow-lg">
          <TransactionForm 
            coins={cryptoData}
            onSubmit={handleAddTransaction}
          />
        </div>
      )}

      {portfolio.length > 0 && (
        <PortfolioSummary 
          totalValue={totalPortfolioValue}
          totalCost={totalCostBasis}
          totalProfit={totalProfitLoss}
          profitPercentage={totalProfitLossPercentage}
        />
      )}

      {portfolio.length === 0 ? (
        <div className="text-center py-12 bg-[#1E293B]/20 backdrop-blur-md rounded-xl border border-gray-700/30">
          <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="text-gray-400">{'Your portfolio is empty. Add transactions to track your investments.'}</p>
          <button
            onClick={() => setIsAddingTransaction(true)}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
          >
            {'Add Your First Transaction'}
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <div className="inline-flex rounded-xl overflow-hidden backdrop-blur-lg bg-[#1E293B]/40 p-1 shadow-lg border border-gray-700/30 mb-4" role="group">
            <button
              type="button"
              onClick={() => setActiveTab('holdings')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeTab === 'holdings'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {'Holdings'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('transactions')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeTab === 'transactions'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {'Transactions'}
            </button>
          </div>

          {activeTab === 'holdings' && (
            <div className="overflow-x-auto rounded-xl border border-gray-700/30 bg-[#1E293B]/20 backdrop-blur-md">
              <table className="min-w-full divide-y divide-gray-700/30">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {'Asset'}
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {'Holdings'}
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {'Avg. Buy Price'}
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {'Current Price'}
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {'Profit/Loss'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/30">
                  {portfolioSummary.map((holding) => {
                    const coin = cryptoData.find(c => c.id === holding.coinId);
                    const currentPrice = coin ? coin.currentPrice : 0;
                    const avgBuyPrice = holding.totalCost / holding.totalQuantity;
                    const profitLoss = holding.totalValue - holding.totalCost;
                    const profitLossPercentage = holding.totalCost > 0 
                      ? (profitLoss / holding.totalCost) * 100 
                      : 0;

                    return (
                      <tr key={holding.coinId} className="hover:bg-white/5 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-[#0F172A] rounded-full p-1 border border-gray-700/30 flex items-center justify-center">
                              <img className="h-8 w-8 rounded-full" src={holding.image} alt={holding.name} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{holding.name}</div>
                              <div className="text-sm text-gray-400">{holding.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white font-mono">{holding.totalQuantity.toLocaleString()} {holding.symbol}</div>
                          <div className="text-sm text-gray-400 font-mono">${holding.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white font-mono">${avgBuyPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white font-mono">${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-mono ${profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            ${profitLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                          <div className={`text-sm ${profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {profitLoss >= 0 ? '+' : ''}{profitLossPercentage.toFixed(2)}%
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="overflow-x-auto rounded-xl border border-gray-700/30 bg-[#1E293B]/20 backdrop-blur-md">
              <table className="min-w-full divide-y divide-gray-700/30">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {'Date'}
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {'Asset'}
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {'Type'}
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {'Price'}
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {'Quantity'}
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {'Total'}
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {'Actions'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/30">
                  {portfolio.map((transaction) => {
                    const coin = cryptoData.find(c => c.id === transaction.coinId);
                    const total = transaction.quantity * transaction.priceAtPurchase;
                    
                    return (
                      <tr key={transaction.id} className="hover:bg-white/5 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-[#0F172A] rounded-full p-1 border border-gray-700/30 flex items-center justify-center">
                              <img className="h-6 w-6 rounded-full" src={coin?.image} alt={coin?.name} />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-white">{coin?.symbol.toUpperCase()}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-lg ${
                            transaction.type === 'buy' 
                              ? 'bg-green-900/30 text-green-400 border border-green-700/30' 
                              : 'bg-red-900/30 text-red-400 border border-red-700/30'
                          }`}>
                            {transaction.type.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                          ${transaction.priceAtPurchase.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                          {transaction.quantity.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                          ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button
                            onClick={() => removeTransaction(transaction.id)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-300 flex items-center ml-auto"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                            {'Delete'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
   
