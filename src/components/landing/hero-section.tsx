import { Button } from '@/components/ui/button';
import Image from 'next/image';
import SignUpModal from './signup-modal';

const HeroSection = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
            Harness the Power of AI for Smart Trading
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Our advanced AI bot automates your crypto and stock trading with precision, 24/7 monitoring, and intelligent risk management, so you can achieve consistent returns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <SignUpModal>
              <Button size="lg">Start Your Free Trial</Button>
            </SignUpModal>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            No credit card required.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=600&h=400&auto=format&fit=crop"
            alt="AI trading bot dashboard"
            width={600}
            height={400}
            className="rounded-xl shadow-2xl hover:shadow-primary/50 transition-shadow duration-300 transform hover:-translate-y-2"
            data-ai-hint="crypto trading"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
