'use client';

import { useState, useEffect } from 'react';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-500 to-purple-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Responsive Design Demo
          </h1>
          <p className="text-white/90">
            Current view: {isMobile ? 'Mobile' : 'Desktop'}
          </p>
        </header>

        {/* Main Content */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Cards */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 transform transition-all duration-300 hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Feature 1</h2>
            <p className="text-gray-600">
              This is a responsive card that adapts to different screen sizes.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 transform transition-all duration-300 hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Feature 2</h2>
            <p className="text-gray-600">
              On mobile, cards stack vertically. On desktop, they display in a grid.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 transform transition-all duration-300 hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Feature 3</h2>
            <p className="text-gray-600">
              The layout automatically adjusts based on screen width.
            </p>
          </div>
        </main>

        {/* Responsive Navigation */}
        <nav className="mt-8">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="px-6 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors">
              Home
            </button>
            <button className="px-6 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors">
              About
            </button>
            <button className="px-6 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors">
              Contact
            </button>
          </div>
        </nav>

        {/* Dynamic Content Area */}
        <div className="mt-8">
          {children}
        </div>
      </div>
    </div>
  );
} 