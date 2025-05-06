
export interface SearchResult {
    id: string;
    title: string;
    url: string;
    publishedDate?: string;
    author?: string;
    score: number;
    image?: string;
    favicon?: string;
    text?: string;
    highlights?: string[];
    highlightScores?: number[];
    summary?: string;
    tldr?: string;
    sourceType?: 'web' | 'twitter' | 'reddit' | 'social' | 'academic';
    subpages?: SearchResult[];
    extras?: {
      links: string[];
    };
  }
  
  export interface SearchResponse {
    requestId: string;
    autopromptString?: string;
    autoDate: string;
    resolvedSearchType: string;
    results: SearchResult[];
    searchType: string;
    costDollars: {
      total: number;
      breakDown: Array<{
        search: number;
        contents: number;
        breakdown: {
          keywordSearch: number;
          neuralSearch: number;
          contentText: number;
          contentHighlight: number;
          contentSummary: number;
        };
      }>;
    };
  }
    