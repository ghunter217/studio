'use client';

import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Bot className="h-6 w-6 mr-2 text-primary" />
          <span className="font-bold">Lumina</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
