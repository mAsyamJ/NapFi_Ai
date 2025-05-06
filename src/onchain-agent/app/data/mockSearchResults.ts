
import { SearchResponse } from '@/types/search';

// Create a comprehensive set of mock search results
export const mockSearchResults: SearchResponse = {
  requestId: 'mock-request-id',
  autoDate: new Date().toISOString(),
  resolvedSearchType: 'keyword',
  results: [
    {
      id: 'bitcoin-price-analysis',
      title: 'Bitcoin Price Analysis: BTC Reaches New All-Time High',
      url: 'https://example.com/bitcoin-price-analysis',
      publishedDate: new Date().toISOString(),
      author: 'Crypto Analyst',
      score: 0.95,
      image: 'https://example.com/bitcoin-image.jpg',
      favicon: 'https://example.com/favicon.ico',
      text: 'Bitcoin has reached a new all-time high today, surpassing previous records. Analysts attribute this surge to increased institutional adoption and growing mainstream acceptance of cryptocurrencies.',
      highlights: [
        'Bitcoin has reached a new all-time high today',
        'Increased institutional adoption is driving the price',
        'Analysts predict further growth in the coming months'
      ],
      highlightScores: [0.9, 0.85, 0.8],
      summary: 'Bitcoin has reached a new all-time high, driven by institutional adoption and mainstream acceptance.',
      tldr: 'TLDR: Bitcoin has reached a new all-time high today, surpassing previous records. This surge is attributed to increased institutional adoption and growing mainstream acceptance.\n\nAI Analysis: The current price movement suggests strong bullish momentum. Investors should watch for potential consolidation phases which could present buying opportunities, but remain cautious of volatility.'
    },
    {
      id: 'ethereum-upgrade',
      title: 'Ethereum 2.0 Upgrade: What You Need to Know',
      url: 'https://example.com/ethereum-upgrade',
      publishedDate: new Date().toISOString(),
      author: 'Blockchain Expert',
      score: 0.92,
      image: 'https://example.com/ethereum-image.jpg',
      favicon: 'https://example.com/favicon.ico',
      text: 'The Ethereum 2.0 upgrade represents a significant milestone in the blockchain\'s evolution. This upgrade aims to improve scalability, security, and sustainability of the Ethereum network.',
      highlights: [
        'Ethereum 2.0 aims to improve scalability and security',
        'The upgrade will transition from proof-of-work to proof-of-stake',
        'Staking rewards are attracting more investors'
      ],
      highlightScores: [0.88, 0.86, 0.84],
      summary: 'Ethereum 2.0 upgrade focuses on improving scalability, security, and sustainability through a transition to proof-of-stake.',
      tldr: 'TLDR: The Ethereum 2.0 upgrade represents a significant milestone focusing on scalability, security, and sustainability through proof-of-stake consensus.\n\nAI Analysis: This upgrade could potentially increase Ethereum\'s transaction throughput and reduce fees, making it more competitive against newer blockchains. Investors should consider the long-term implications for both ETH value and the broader DeFi ecosystem built on Ethereum.'
    },
    {
      id: 'defi-market-growth',
      title: 'DeFi Market Reaches $100 Billion in Total Value Locked',
      url: 'https://example.com/defi-market-growth',
      publishedDate: new Date().toISOString(),
      author: 'DeFi Researcher',
      score: 0.89,
      image: 'https://example.com/defi-image.jpg',
      favicon: 'https://example.com/favicon.ico',
      text: 'The decentralized finance (DeFi) market has reached a significant milestone with $100 billion in total value locked across various protocols. This growth demonstrates the increasing adoption of DeFi solutions.',
      highlights: [
        'DeFi market reaches $100 billion in total value locked',
        'Growth is driven by new protocols and increased user adoption',
        'Regulatory concerns remain a challenge for the sector'
      ],
      highlightScores: [0.87, 0.85, 0.83],
      summary: 'The DeFi market has reached $100 billion in total value locked, showing significant growth despite regulatory challenges.',
      tldr: 'TLDR: The DeFi market has reached $100 billion in total value locked (TVL) across various protocols, marking a significant milestone in the sector\'s growth.\n\nAI Analysis: This growth indicates strong market confidence in decentralized financial services. However, investors should be aware of regulatory uncertainties and smart contract risks that could impact specific protocols. Diversification across multiple DeFi projects may be a prudent strategy.'
    },
    {
      id: 'nft-sales-surge',
      title: 'NFT Sales Surge: Digital Art Marketplace Trends',
      url: 'https://example.com/nft-sales-surge',
      publishedDate: new Date().toISOString(),
      author: 'Digital Art Analyst',
      score: 0.87,
      image: 'https://example.com/nft-image.jpg',
      favicon: 'https://example.com/favicon.ico',
      text: 'NFT sales have surged in the past month, with several digital artworks selling for millions of dollars. This trend highlights the growing interest in digital ownership and blockchain-based collectibles.',
      highlights: [
        'NFT sales have surged with several multi-million dollar transactions',
        'New marketplaces are emerging to cater to different niches',
        'Artists are increasingly adopting NFTs as a new revenue stream'
      ],
      highlightScores: [0.86, 0.84, 0.82],
      summary: 'NFT sales are surging with multi-million dollar transactions, creating new opportunities for artists and collectors.',
      tldr: 'TLDR: NFT sales have surged significantly with several digital artworks selling for millions, indicating growing interest in digital ownership and blockchain-based collectibles.\n\nAI Analysis: While the NFT market shows strong growth, it also exhibits high volatility and potential bubble characteristics. Investors should focus on projects with strong communities and utility beyond speculation, as these may have better long-term sustainability.'
    },
    {
      id: 'crypto-regulation',
      title: 'Crypto Regulation: New Frameworks Being Developed Globally',
      url: 'https://example.com/crypto-regulation',
      publishedDate: new Date().toISOString(),
      author: 'Regulatory Expert',
      score: 0.85,
      image: 'https://example.com/regulation-image.jpg',
      favicon: 'https://example.com/favicon.ico',
      text: 'Governments around the world are developing new regulatory frameworks for cryptocurrencies. These regulations aim to provide clarity for businesses while protecting consumers and preventing illicit activities.',
      highlights: [
        'New regulatory frameworks are being developed globally',
        'Regulations aim to balance innovation with consumer protection',
        'Industry leaders are engaging with regulators to shape policies'
      ],
      highlightScores: [0.84, 0.82, 0.80],
      summary: 'Governments are developing new crypto regulations to provide clarity for businesses while protecting consumers.',
      tldr: 'TLDR: Governments worldwide are developing new regulatory frameworks for cryptocurrencies that aim to balance innovation with consumer protection and prevention of illicit activities.\n\nAI Analysis: Regulatory clarity could actually benefit the crypto market in the long term by encouraging institutional participation and mainstream adoption. However, short-term market volatility may occur as new regulations are announced. Investors should monitor regulatory developments in key markets like the US, EU, and Asia.'
    },
    {
      id: 'bitcoin-etf-approval',
      title: 'Bitcoin ETF Approval: What It Means for Institutional Adoption',
      url: 'https://example.com/bitcoin-etf-approval',
      publishedDate: new Date().toISOString(),
      author: 'Financial Analyst',
      score: 0.91,
      image: 'https://example.com/bitcoin-etf-image.jpg',
      favicon: 'https://example.com/favicon.ico',
      text: 'The approval of Bitcoin ETFs marks a significant milestone for cryptocurrency adoption among institutional investors. This development provides a regulated investment vehicle for traditional financial institutions to gain exposure to Bitcoin.',
      highlights: [
        'Bitcoin ETF approval opens doors for institutional investors',
        'Regulated investment vehicles reduce barriers to entry',
        'Potential for increased market liquidity and stability'
      ],
      highlightScores: [0.92, 0.90, 0.88],
      summary: 'Bitcoin ETF approval provides a regulated investment vehicle for institutional investors, potentially increasing adoption and market stability.',
      tldr: 'TLDR: The approval of Bitcoin ETFs represents a major milestone for institutional adoption, providing a regulated investment vehicle for traditional financial institutions.\n\nAI Analysis: This development could lead to significant capital inflows into the Bitcoin market, potentially driving price appreciation and reducing volatility over time. However, investors should be aware that institutional involvement may also lead to different market dynamics than those historically observed in the cryptocurrency space.'
    },
    {
      id: 'crypto-mining-sustainability',
      title: 'Cryptocurrency Mining Shifts Toward Renewable Energy Sources',
      url: 'https://example.com/crypto-mining-sustainability',
      publishedDate: new Date().toISOString(),
      author: 'Environmental Researcher',
      score: 0.83,
      image: 'https://example.com/mining-image.jpg',
      favicon: 'https://example.com/favicon.ico',
      text: 'Cryptocurrency mining operations are increasingly adopting renewable energy sources to address environmental concerns. Solar, wind, and hydroelectric power are becoming popular alternatives to traditional fossil fuel-based electricity for mining facilities.',
      highlights: [
        'Mining operations shifting to renewable energy sources',
        'Environmental concerns driving sustainability initiatives',
        'Potential for carbon-neutral cryptocurrency mining'
      ],
      highlightScores: [0.85, 0.83, 0.81],
      summary: 'Cryptocurrency mining is becoming more environmentally friendly with the adoption of renewable energy sources like solar, wind, and hydroelectric power.',
      tldr: 'TLDR: Cryptocurrency mining operations are increasingly adopting renewable energy sources like solar, wind, and hydroelectric power to address environmental concerns.\n\nAI Analysis: This shift toward sustainability could help address one of the major criticisms of cryptocurrencies, potentially improving public perception and regulatory outlook. Investors may want to consider the environmental practices of mining companies and protocols when making investment decisions, as sustainability may become a competitive advantage in the industry.'
    },
    {
      id: 'defi-security-challenges',
      title: 'DeFi Security Challenges: Protecting Against Smart Contract Vulnerabilities',
      url: 'https://example.com/defi-security-challenges',
      publishedDate: new Date().toISOString(),
      author: 'Security Researcher',
      score: 0.88,
      image: 'https://example.com/defi-security-image.jpg',
      favicon: 'https://example.com/favicon.ico',
      text: 'As the DeFi ecosystem grows, security challenges related to smart contract vulnerabilities have become increasingly important. Auditing firms and security protocols are developing new methods to identify and mitigate these risks.',
      highlights: [
        'Smart contract vulnerabilities pose significant risks to DeFi protocols',
        'Auditing firms developing advanced security analysis techniques',
        'Insurance solutions emerging to protect against hacks and exploits'
      ],
      highlightScores: [0.89, 0.87, 0.85],
      summary: 'DeFi security challenges are being addressed through advanced auditing techniques and insurance solutions to protect against smart contract vulnerabilities.',
      tldr: 'TLDR: As DeFi grows, security challenges related to smart contract vulnerabilities have become a critical focus, with auditing firms and security protocols developing new risk mitigation methods.\n\nAI Analysis: Investors in DeFi protocols should prioritize security considerations, looking for projects with thorough audits, bug bounty programs, and gradual deployment strategies. The emergence of DeFi insurance products also provides a potential way to hedge against smart contract risks, though these solutions are still evolving.'
    },
    {
      id: 'crypto-adoption-emerging-markets',
      title: 'Cryptocurrency Adoption Surges in Emerging Markets',
      url: 'https://example.com/crypto-adoption-emerging-markets',
      publishedDate: new Date().toISOString(),
      author: 'Global Economics Reporter',
      score: 0.86,
      image: 'https://example.com/emerging-markets-image.jpg',
      favicon: 'https://example.com/favicon.ico',
      text: 'Emerging markets are seeing rapid adoption of cryptocurrencies as alternatives to local currencies with high inflation or limited banking access. Countries in Latin America, Africa, and Southeast Asia are leading this trend.',
      highlights: [
        'Cryptocurrency adoption growing rapidly in emerging markets',
        'High inflation and limited banking access driving adoption',
        'Remittance use cases particularly strong in developing economies'
      ],
      highlightScores: [0.88, 0.86, 0.84],
      summary: 'Emerging markets are experiencing rapid cryptocurrency adoption due to high inflation, limited banking access, and remittance needs.',
      tldr: 'TLDR: Emerging markets in Latin America, Africa, and Southeast Asia are seeing rapid cryptocurrency adoption as alternatives to local currencies with high inflation or limited banking infrastructure.\n\nAI Analysis: This trend highlights the practical utility of cryptocurrencies beyond speculation, particularly in regions with economic instability or underdeveloped financial systems. Investors may want to monitor adoption metrics in these markets as indicators of real-world utility and potential long-term value drivers for cryptocurrencies.'
    },
    {
      id: 'layer2-scaling-solutions',
      title: 'Layer 2 Scaling Solutions: The Future of Ethereum Transactions',
      url: 'https://example.com/layer2-scaling-solutions',
      publishedDate: new Date().toISOString(),
      author: 'Blockchain Developer',
      score: 0.90,
      image: 'https://example.com/layer2-image.jpg',
      favicon: 'https://example.com/favicon.ico',
      text: 'Layer 2 scaling solutions are revolutionizing Ethereum transactions by offering lower fees and higher throughput while maintaining security. Rollups, sidechains, and state channels are among the most promising approaches.',
      highlights: [
        'Layer 2 solutions significantly reduce transaction fees',
        'Rollup technology emerging as the dominant scaling approach',
        'Major DeFi protocols migrating to Layer 2 networks'
      ],
      highlightScores: [0.92, 0.90, 0.88],
      summary: 'Layer 2 scaling solutions are making Ethereum more accessible with lower fees and higher throughput, with rollups emerging as the dominant approach.',
      tldr: 'TLDR: Layer 2 scaling solutions like rollups, sidechains, and state channels are revolutionizing Ethereum by offering lower fees and higher transaction throughput while maintaining security.\n\nAI Analysis: The growth of Layer 2 ecosystems represents a significant evolution for Ethereum, potentially addressing its main limitations of high fees and limited scalability. Investors should pay attention to adoption metrics for different Layer 2 solutions, as the winners in this space could capture significant value in the Ethereum ecosystem.'
    }
  ],
  searchType: 'keyword',
  costDollars: { total: 0.005, breakDown: [] }
};
      