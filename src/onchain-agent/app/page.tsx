'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Keep for any actual external/other page links if needed in future
// Assuming these components and types exist in your project structure:
import SearchInterface from '@/components/SearchInterface';
import Dashboard from '@/components/Dashboard';
import Bookmarks from '@/components/Bookmarks';
import { SearchResult } from '@/types/search';

// Placeholder definitions for missing components/types for illustration
// In your actual project, remove these if SearchInterface, Dashboard, Bookmarks, SearchResult are correctly imported.
// const SearchInterface = ({ onBookmark, bookmarkedArticles }: { onBookmark: (article: SearchResult) => void, bookmarkedArticles: SearchResult[] }) => <div>Search Interface Placeholder <button onClick={() => onBookmark({id: '1', title: 'Test Article', url: '#', summary: 'Summary'})}>Bookmark Test</button></div>;
// const Dashboard = () => <div>Dashboard Placeholder</div>;
// const Bookmarks = ({ bookmarkedArticles, removeBookmark }: { bookmarkedArticles: SearchResult[], removeBookmark: (id: string) => void }) => <div>Bookmarks Placeholder ({bookmarkedArticles.length}) <button onClick={() => bookmarkedArticles.length > 0 && removeBookmark(bookmarkedArticles[0].id)}>Remove First</button></div>;
// interface SearchResult { id: string; title: string; url: string; summary: string; publishedAt?: string; source?: string; }


const landingPageFeatures = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'AI-Powered Research',
    description: 'Get instant insights and analysis powered by advanced AI technology.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    title: 'Real-Time Market Data',
    description: 'Stay updated with live market trends and price movements.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: 'Portfolio Tracking',
    description: 'Monitor your investments and track performance in real-time.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: 'Social Sentiment',
    description: 'Analyze social media trends and community sentiment.',
  },
];

export default function CombinedPage() {
  // State for switching between Landing and App views
  const [showAppView, setShowAppView] = useState(false);

  // State from AppPage
  const [activeTab, setActiveTab] = useState<'search' | 'dashboard' | 'bookmarks'>('search');
  const [bookmarkedArticles, setBookmarkedArticles] = useState<SearchResult[]>([]);

  // State from LandingPage
  const [activeFeature, setActiveFeature] = useState(0);

  // Effects from AppPage (for bookmarks)
  useEffect(() => {
    if (showAppView) { // Only load/save bookmarks if in app view, or load always if preferred
      const savedBookmarks = localStorage.getItem('coinplexity-bookmarks');
      if (savedBookmarks) {
        try {
          setBookmarkedArticles(JSON.parse(savedBookmarks));
        } catch (error) {
          console.error('Failed to parse bookmarks:', error);
        }
      }
    }
  }, [showAppView]); // Reload bookmarks if app view is entered

  useEffect(() => {
    if (showAppView || bookmarkedArticles.length > 0) { // Save if in app view or if there are bookmarks (e.g. bookmarked from a non-app context if that was possible)
        localStorage.setItem('coinplexity-bookmarks', JSON.stringify(bookmarkedArticles));
    }
  }, [bookmarkedArticles, showAppView]);

  // Handlers from AppPage
  const handleBookmark = (article: SearchResult) => {
    setBookmarkedArticles(prev => {
      const isBookmarked = prev.some(a => a.id === article.id);
      if (isBookmarked) {
        return prev.filter(a => a.id !== article.id);
      } else {
        return [...prev, article];
      }
    });
  };

  const removeBookmark = (articleId: string) => {
    setBookmarkedArticles(prev => prev.filter(article => article.id !== articleId));
  };

  // Navigation handler to switch to App View
  const navigateToApp = (targetTab: 'search' | 'dashboard') => {
    setShowAppView(true);
    setActiveTab(targetTab);
  };


  if (!showAppView) {
    // Render Landing Page Content
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pb-32">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200">
                {'AI-Powered Crypto Research & Analysis'}
              </h1>
              <p className="text-xl sm:text-2xl text-blue-200 mb-12 max-w-3xl mx-auto">
                {'Get instant insights on cryptocurrency markets, trends, and analysis with advanced AI technology.'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                <button
                  onClick={() => navigateToApp('search')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                >
                  {'Start Researching'}
                </button>
                <button
                  onClick={() => navigateToApp('dashboard')}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  {'View Dashboard'}
                </button>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {landingPageFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl backdrop-blur-md border border-white/20 transition-all duration-300 cursor-pointer ${
                    activeFeature === index
                      ? 'bg-white/15 shadow-lg shadow-blue-500/10'
                      : 'bg-white/10 hover:bg-white/15'
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-blue-200">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="relative py-24 bg-[#0F172A]/50"> {/* Using similar bg to app page for transition */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                {'Why Choose CoinPlexity?'}
              </h2>
              <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                {'Advanced tools and insights to help you make informed decisions in the cryptocurrency market.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Time Saving */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{'Save Time'}</h3>
                <p className="text-blue-200">{'Get instant analysis and insights without spending hours on research. Our AI technology processes vast amounts of data in seconds.'}</p>
              </div>
              {/* Comprehensive Analysis */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{'Comprehensive Analysis'}</h3>
                <p className="text-blue-200">{'Get a complete view of the market with technical analysis, social sentiment, and news coverage all in one place.'}</p>
              </div>
              {/* Portfolio Management */}
               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{'Portfolio Management'}</h3>
                <p className="text-blue-200">{'Track your investments, monitor performance, and get personalized insights for your portfolio.'}</p>
              </div>
              {/* Bookmark System */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-orange-500 to-red-400 flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{'Save & Organize'}</h3>
                <p className="text-blue-200">{'Bookmark important articles and research for quick reference. Build your personal knowledge base.'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative py-24">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              {'Ready to Elevate Your Crypto Research?'}
            </h2>
            <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto">
              {'Join CoinPlexity today and get access to powerful AI-driven insights and analysis tools.'}
            </p>
            <button
              onClick={() => navigateToApp('search')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            >
              {'Get Started Now'}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    );
  } else {
    // Render App Page Content
    return (
      <div className="min-h-screen bg-[#0F172A] text-white"> {/* Base background for app view */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200">
              {'CoinPlexity'}
            </h1>
            <div className="inline-flex rounded-xl overflow-hidden backdrop-blur-lg bg-white/10 p-1 shadow-lg" role="group">
              <button
                type="button"
                onClick={() => setActiveTab('search')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeTab === 'search'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg'
                    : 'text-blue-100 hover:bg-white/10'
                }`}
              >
                {'Search'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeTab === 'dashboard'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg'
                    : 'text-blue-100 hover:bg-white/10'
                }`}
              >
                {'Dashboard'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('bookmarks')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center ${
                  activeTab === 'bookmarks'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg'
                    : 'text-blue-100 hover:bg-white/10'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                {'Bookmarks'}
                {bookmarkedArticles.length > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-blue-500/30">
                    {bookmarkedArticles.length}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Optional: Button to go back to Landing View */}
          {/* <button onClick={() => setShowAppView(false)} className="my-4 px-4 py-2 bg-gray-500 text-white rounded">Back to Landing</button> */}


          {/* Content */}
          <div className="relative">
            {/* Background decorations for App View (subtler than landing page) */}
            <div className="absolute -left-4 top-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl -z-10"></div>
            <div className="absolute right-0 bottom-1/3 w-32 h-32 bg-purple-500/10 rounded-full blur-xl -z-10"></div>

            {/* Active tab content */}
            {activeTab === 'search' && (
              <SearchInterface 
                onBookmark={handleBookmark}
                bookmarkedArticles={bookmarkedArticles}
              />
            )}
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'bookmarks' && (
              <Bookmarks 
                bookmarkedArticles={bookmarkedArticles}
                removeBookmark={removeBookmark}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}