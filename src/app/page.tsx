import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to FunSheets!</h1>
        <p className="text-xl text-white/90">Your new Next.js application is running successfully.</p>
      </div>
    </div>
  );
}
