import OpenAI from 'openai';

// Debug: Check if API key is available
if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  console.error('OpenAI API key is not set in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Enable browser usage
});

export async function generateWorksheet(prompt: string): Promise<string> {
  try {
    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    console.log('Making OpenAI API request with prompt:', prompt.substring(0, 100) + '...');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional educational worksheet creator. Generate worksheets in a format suitable for a Word document, with proper formatting and structure."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('Error generating worksheet:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw new Error('Failed to generate worksheet');
  }
} 