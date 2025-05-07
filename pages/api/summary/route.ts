
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { title, content, sourceType } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Generate a summary based on the content type
    let summary = '';
    
    if (sourceType === 'twitter') {
      summary = `TLDR: This tweet discusses ${title.includes('Bitcoin') ? 'Bitcoin price movements' : 'cryptocurrency developments'} with potential market implications.\n\nAI Analysis: Social media sentiment can provide early signals of market movements, but should be verified with technical analysis. Consider this information as just one data point in your broader research.`;
    } else if (sourceType === 'reddit') {
      summary = `TLDR: This Reddit post covers ${title.includes('ETH') || title.includes('Ethereum') ? 'Ethereum ecosystem developments' : 'cryptocurrency market analysis'} with community insights.\n\nAI Analysis: Community discussions often highlight emerging trends before mainstream coverage. However, be aware of potential bias and verify claims with additional sources before making investment decisions.`;
    } else {
      // Default for news articles
      summary = `TLDR: This article examines ${title.includes('price') ? 'price movements and market trends' : 'important developments in the cryptocurrency space'} with implications for investors.\n\nAI Analysis: The information suggests ${title.includes('bull') ? 'potential upward momentum' : title.includes('bear') ? 'possible downward pressure' : 'evolving market conditions'} in the near term. Consider diversification and risk management strategies appropriate to your investment goals.`;
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Summary generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
}
   