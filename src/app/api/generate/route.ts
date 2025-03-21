import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    // Debug: Log the API key (first few characters only)
    const apiKey = process.env.ANTHROPIC_API_KEY;
    console.log('API Key available:', !!apiKey);
    console.log('API Key format:', apiKey ? `${apiKey.substring(0, 8)}...` : 'not set');
    console.log('API Key length:', apiKey ? apiKey.length : 0);
    console.log('API Key starts with sk-ant-:', apiKey ? apiKey.startsWith('sk-ant-') : false);

    if (!apiKey) {
      throw new Error('Anthropic API key is not configured');
    }

    // Verify API key format
    if (!apiKey.startsWith('sk-ant-')) {
      throw new Error('Invalid API key format. Key should start with "sk-ant-"');
    }

    // Initialize Anthropic client with explicit headers
    const anthropic = new Anthropic({
      apiKey: apiKey.trim(),
      defaultHeaders: {
        'x-api-key': apiKey.trim(),
        'anthropic-version': '2023-06-01'
      }
    });

    console.log('Making Claude API request with prompt:', prompt.substring(0, 100) + '...');
    
    const message = await anthropic.messages.create({
      model: 'claude-3-7-sonnet-20250219',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    const content = message.content[0];
    if ('text' in content) {
      return NextResponse.json({ content: content.text });
    }
    return NextResponse.json({ content: '' });
  } catch (error) {
    console.error('Error generating worksheet:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate worksheet' },
      { status: 500 }
    );
  }
} 