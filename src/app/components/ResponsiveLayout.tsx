'use client';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  return (
    <div className="w-full min-h-screen bg-[#1a1a1a]">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-chalk">
            FunSheets
          </h1>
          <p className="text-[#a8d1ff] text-lg">
            Your Digital Learning Companion
          </p>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
} 