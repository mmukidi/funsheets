import ResponsiveLayout from './components/ResponsiveLayout';

export default function Home() {
  return (
    <ResponsiveLayout>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to FunSheets!</h2>
        <p className="text-gray-600 mb-4">
          This is a dynamic content area that will adapt to different screen sizes.
          The layout above demonstrates responsive design principles:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Cards stack vertically on mobile and display in a grid on desktop</li>
          <li>Navigation buttons stack on mobile and align horizontally on desktop</li>
          <li>Text sizes adjust automatically for better readability</li>
          <li>Spacing and padding adapt to screen size</li>
        </ul>
      </div>
    </ResponsiveLayout>
  );
}
