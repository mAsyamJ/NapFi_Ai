
'use client';

interface PortfolioSummaryProps {
  totalValue: number;
  totalCost: number;
  totalProfit: number;
  profitPercentage: number;
}

export default function PortfolioSummary({ 
  totalValue, 
  totalCost, 
  totalProfit, 
  profitPercentage 
}: PortfolioSummaryProps) {
  return (
    <div className="relative mb-8">
      <div className="absolute -left-4 top-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
      <div className="absolute right-0 bottom-1/3 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#1E293B]/40 backdrop-blur-md p-5 rounded-xl border border-gray-700/30 shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
          <h4 className="text-sm font-medium text-gray-400 mb-1 flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
            {'Total Value'}
          </h4>
          <p className="text-2xl font-bold text-white font-mono">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        
        <div className="bg-[#1E293B]/40 backdrop-blur-md p-5 rounded-xl border border-gray-700/30 shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
          <h4 className="text-sm font-medium text-gray-400 mb-1 flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {'Total Cost'}
          </h4>
          <p className="text-2xl font-bold text-white font-mono">${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        
        <div className="bg-[#1E293B]/40 backdrop-blur-md p-5 rounded-xl border border-gray-700/30 shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
          <h4 className="text-sm font-medium text-gray-400 mb-1 flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            {'Total Profit/Loss'}
          </h4>
          <p className={`text-2xl font-bold font-mono ${totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            ${totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        
        <div className="bg-[#1E293B]/40 backdrop-blur-md p-5 rounded-xl border border-gray-700/30 shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
          <h4 className="text-sm font-medium text-gray-400 mb-1 flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            {'ROI'}
          </h4>
          <p className={`text-2xl font-bold ${profitPercentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {profitPercentage >= 0 ? '+' : ''}{profitPercentage.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}