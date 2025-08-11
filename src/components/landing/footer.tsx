import { Bot, Twitter, Linkedin, Github, ShieldCheck, BadgeCheck, Mail, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="border-t bg-secondary">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 flex flex-col items-start mb-8 lg:mb-0">
            <div className="flex items-center mb-4">
              <Bot className="h-8 w-8 mr-2 text-primary" />
              <span className="text-xl font-bold">Postflow AI</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Leverage cutting-edge AI for smarter trading, betting, and poker strategies. Boost your success with Postflow AI.
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold mb-3">Product</h4>
                  <ul className="space-y-2">
                    <li><a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                    <li><a href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">How It Works</a></li>
                    <li><a href="#testimonials" className="text-sm text-muted-foreground hover:text-primary transition-colors">Testimonials</a></li>
                    <li><a href="#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Company</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
                    <li><a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Legal</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
                  </ul>
                </div>
            </div>
            <div className="md:col-span-4">
              <h4 className="font-semibold mb-3">Stay Updated</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Subscribe to our newsletter to get the latest updates and offers.
              </p>
              <form className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input type="email" placeholder="Enter your email" className="pl-10 w-full" />
                </div>
                <Button type="submit">
                  <Send className="w-4 h-4 mr-2" />
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Postflow AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BadgeCheck className="w-5 h-5 text-green-500" />
              <span>Verified Secure</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span>Assets Insured by Lloyd's of London</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
