'use client';

import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Bot className="h-6 w-6 mr-2 text-primary" />
          <span className="font-bold">Postflow AI</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="#features" className="text-foreground/60 transition-colors hover:text-foreground/80">
            Features
          </Link>
          <Link href="#how-it-works" className="text-foreground/60 transition-colors hover:text-foreground/80">
            How It Works
          </Link>
          <Link href="#contact" className="text-foreground/60 transition-colors hover:text-foreground/80">
            Contact
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
