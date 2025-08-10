import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrainCircuit, Bot, AreaChart, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <BrainCircuit className="w-10 h-10 text-primary" />,
    title: 'AI-Powered Trading',
    description: 'Our advanced AI analyzes market data to execute trades with high precision, giving you a competitive edge.'
  },
  {
    icon: <Bot className="w-10 h-10 text-primary" />,
    title: 'Fully Automated Trading',
    description: 'Set your strategy and let Postflow AI handle the rest. 24/7 automated trading means you never miss an opportunity.'
  },
  {
    icon: <AreaChart className="w-10 h-10 text-primary" />,
    title: 'Performance Analytics',
    description: 'Monitor your portfolio with our intuitive dashboard, featuring real-time performance data and insights.'
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
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Postflow AI?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover the powerful features that make Postflow AI the ultimate automated trading tool.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 bg-secondary border-secondary hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
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
