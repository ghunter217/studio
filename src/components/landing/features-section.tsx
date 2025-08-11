import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrainCircuit, Bot, AreaChart, ShieldCheck, Dice5, Spade } from 'lucide-react';

const features = [
  {
    icon: <BrainCircuit className="w-10 h-10 text-primary" />,
    title: 'AI-Powered Insights',
    description: 'Our advanced AI analyzes data to provide you with a competitive edge in trading, betting, and poker.'
  },
  {
    icon: <Bot className="w-10 h-10 text-primary" />,
    title: 'Fully Automated',
    description: 'Set your strategy and let Postflow AI handle the rest. 24/7 automation means you never miss an opportunity.'
  },
  {
    icon: <AreaChart className="w-10 h-10 text-primary" />,
    title: 'Stock & Crypto Trading',
    description: 'Execute trades with high precision for both stocks and cryptocurrencies, maximizing your portfolio potential.'
  },
  {
    icon: <Dice5 className="w-10 h-10 text-primary" />,
    title: 'Online Betting',
    description: 'Get AI-driven predictions and automated betting strategies for various online betting markets.'
  },
  {
    icon: <Spade className="w-10 h-10 text-primary" />,
    title: 'Poker Assistant',
    description: 'Improve your poker game with an AI assistant that analyzes hands and suggests optimal plays.'
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    title: 'Secure & Reliable',
    description: 'Your security is our top priority. We use industry-leading encryption and security protocols to protect your assets.'
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-background animate-in fade-in-50 duration-1000">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Key Features</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore the core features that power our intelligent automation platform.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 bg-secondary border-secondary shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <CardHeader className="p-0 mb-4">
                {feature.icon}
              </CardHeader>
              <CardTitle className="mb-2">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
