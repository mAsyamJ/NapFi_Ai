
'use client';

import { type FilterState } from '@/components/SearchInterface';

interface SearchFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function SearchFilters({ filters, onFilterChange }: SearchFiltersProps) {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'market analysis', label: 'Market Analysis' },
    { value: 'trading', label: 'Trading' },
    { value: 'news', label: 'News' },
    { value: 'technical analysis', label: 'Technical Analysis' },
    { value: 'defi', label: 'DeFi' },
    { value: 'nft', label: 'NFTs' },
  ];

  const timeframes = [
    { value: 'all', label: 'All Time' },
    { value: 'day', label: 'Last 24 Hours' },
    { value: 'week', label: 'Past Week' },
    { value: 'month', label: 'Past Month' },
  ];

  const sourceTypes = [
    { value: 'all', label: 'All Sources' },
    { value: 'web', label: 'Web Articles' },
    { value: 'twitter', label: 'Twitter/X' },
    { value: 'reddit', label: 'Reddit' },
    { value: 'social', label: 'All Social Media' },
    { value: 'academic', label: 'Academic/Whitepapers' },
  ];

  return (
    <div className="flex flex-wrap gap-4 p-5 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-lg">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-blue-200 mb-2">
          {'Category'}
        </label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          className="w-full px-4 py-3 bg-white/10 border border-blue-400/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value} className="bg-gray-800 text-white">
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-blue-200 mb-2">
          {'Time Frame'}
        </label>
        <select
          value={filters.timeframe}
          onChange={(e) => onFilterChange({ ...filters, timeframe: e.target.value })}
          className="w-full px-4 py-3 bg-white/10 border border-blue-400/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
        >
          {timeframes.map((timeframe) => (
            <option key={timeframe.value} value={timeframe.value} className="bg-gray-800 text-white">
              {timeframe.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-blue-200 mb-2">
          {'Source Type'}
        </label>
        <select
          value={filters.sourceType}
          onChange={(e) => onFilterChange({ ...filters, sourceType: e.target.value })}
          className="w-full px-4 py-3 bg-white/10 border border-blue-400/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
        >
          {sourceTypes.map((sourceType) => (
            <option key={sourceType.value} value={sourceType.value} className="bg-gray-800 text-white">
              {sourceType.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
   