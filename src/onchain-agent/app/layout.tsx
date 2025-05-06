import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css"; // Assuming globals.css might contain base styles or Tailwind setup

const inter = Inter({ subsets: ['latin'] });

/**
 * Metadata for the page
 * Using CoinPlexity metadata as it seems to be the primary theme.
 */
export const metadata: Metadata = {
  title: 'CoinPlexity - AI-Powered Crypto Research & Analysis',
  description: 'Get instant insights on cryptocurrency markets, trends, and analysis with AI-powered research',
};

/**
 * Root layout for the page
 *
 * @param {object} props - The props for the root layout
 * @param {React.ReactNode} props.children - The children for the root layout
 * @returns {React.ReactNode} The root layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark bg-[#0F172A] text-white flex flex-col min-h-screen`}>
        {/* Header (Fixed Height) - From AgentKit structure */}
        <header className="py-6 flex items-center justify-between relative flex-none">
          <img
            src="https://images.ctfassets.net/q5ulk4bp65r7/3TBS4oVkD1ghowTqVQJlqj/2dfd4ea3b623a7c0d8deb2ff445dee9e/Consumer_Wordmark.svg"
            alt="Coinbase"
            className="h-8 ml-4"
          />

          <span className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold text-blue-600 dark:text-blue-400">
            AgentKit {/* Retaining "AgentKit" text from the second snippet */}
          </span>
        </header>

        {/* Main Content (Dynamic, Grows) - Children are placed here */}
        <main className="flex-grow flex items-center justify-center px-4">
          {children}
        </main>

        {/* Footer (Fixed Height) - From AgentKit structure */}
        <footer className="py-4 text-center text-gray-500 dark:text-gray-400 flex-none">
          <img
            src="https://images.ctfassets.net/q5ulk4bp65r7/3TBS4oVkD1ghowTqVQJlqj/2dfd4ea3b623a7c0d8deb2ff445dee9e/Consumer_Wordmark.svg"
            alt="Coinbase"
            className="h-6 mx-auto mb-2"
          />
          <div className="mt-2">
            <a
              href="https://github.com/coinbase/agentkit"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-blue-600 dark:text-blue-400"
            >
              GitHub
            </a>{" "}
            |{" "}
            <a
              href="https://docs.cdp.coinbase.com/agentkit/docs/welcome"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-blue-600 dark:text-blue-400"
            >
              Documentation
            </a>{" "}
            |{" "}
            <a
              href="https://discord.gg/CDP"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-blue-600 dark:text-blue-400"
            >
              Discord
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Powered by{" "}
            <a
              href="https://docs.cdp.coinbase.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              CDP
            </a>
          </p>
          <p className="text-xs text-gray-400 mt-2">© {new Date().getFullYear()} Coinbase, Inc.</p>
        </footer>
        
        {/* Animated background elements from CoinPlexity */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-[40%] right-[10%] w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[15%] left-[15%] w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl"></div>
          
          {/* Grid pattern overlay from CoinPlexity */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>
      </body>
    </html>
  );
}