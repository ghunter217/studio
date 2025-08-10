import { Button } from '@/components/ui/button';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
            The Future of Social Media is Here
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Postflow AI leverages cutting-edge AI to generate engaging social media posts for you. Boost your online presence with our intelligent, automated tool.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg">Start Your Free Trial</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=600&h=400&auto=format&fit=crop"
            alt="AI social media post generator dashboard"
            width={600}
            height={400}
            className="rounded-xl shadow-2xl"
            data-ai-hint="crypto trading"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
