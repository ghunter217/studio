'use client';

import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import Link from 'next/link';
import SignUpModal from './signup-modal';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-6 flex h-14 items-center">
        <div className="flex items-center mr-auto">
          <Link href="#" className="flex items-center">
            <Bot className="h-6 w-6 mr-2 text-primary" />
            <span className="font-bold">Postflow AI</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-2 text-sm font-medium ml-auto">
          <SignUpModal>
            <Button>Get Started</Button>
          </SignUpModal>
          <Button variant="ghost" asChild>
            <Link href="#features">
              Features
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#how-it-works">
              How It Works
            </Link>
          </Button>
           <Button variant="ghost" asChild>
            <Link href="#testimonials">
              Testimonials
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#faq">
              FAQ
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#contact">
              Contact
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
