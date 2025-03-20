# FunSheets - AI-Powered Educational Worksheet Generator

FunSheets is a modern web application that generates customized educational worksheets using AI technology. It creates engaging, age-appropriate worksheets aligned with US curriculum standards.

## Features

### Version 0.1.2 (Current Release)
- **Enhanced Worksheet Generation**
  - Structured 20-question format with:
    - 8 multiple-choice questions
    - 6 short-answer questions
    - 4 problem-solving questions
    - 2 creative thinking questions
  - Subject-specific enhancements (especially for ELA)
  - Progressive difficulty levels
  - Real-world applications based on student interests

### Version 0.1.1
- **User Profile Management**
  - Student profile creation with:
    - Name, age, and gender
    - Subject preferences
    - Personal interests
  - Supabase integration for data persistence
  - Profile-based worksheet customization

### Version 0.1.0 (Initial Release)
- **Core Features**
  - Next.js 15.2.3 with TypeScript
  - Modern UI with Tailwind CSS
  - Mobile-responsive design
  - OpenAI GPT-4 Turbo integration
  - Word document generation

## Technical Stack

- **Frontend Framework**: Next.js 15.2.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **AI Integration**: OpenAI GPT-4 Turbo
- **Development Tools**:
  - Turbopack for faster builds
  - ESLint for code quality
  - TypeScript for type safety

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd funsheets
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
funsheets/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── components/      # React components
│   │   └── sql/            # Database schema
│   └── lib/                 # Utility functions and configurations
├── public/                  # Static assets
└── package.json            # Project dependencies
```

## Database Schema

The application uses Supabase with the following tables:
- `profiles`: Stores user profile information
- `prompts`: Stores generated worksheet prompts
- `documents`: Manages generated worksheets

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for GPT-4 Turbo API
- Supabase for backend services
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
