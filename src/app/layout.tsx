import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import ChatWidget from '@/components/landing/chat-widget';

export const metadata: Metadata = {
  title: 'Postflow AI - Your AI Assistant for Trading, Betting, and Poker',
  description: 'Leverage cutting-edge AI for smarter trading, betting, and poker strategies. Boost your success with Postflow AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <ChatWidget />
        <Toaster />
      </body>
    </html>
  );
}
