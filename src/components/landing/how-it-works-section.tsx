import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Rocket, Target, PenTool, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: <Rocket className="w-10 h-10 text-primary" />,
    title: '1. Connect Your Exchange',
    description: 'Securely connect your cryptocurrency exchange accounts. We support all major platforms.',
  },
  {
    icon: <Target className="w-10 h-10 text-primary" />,
    title: '2. Define Your Strategy',
    description: 'Tell our AI about your risk tolerance and investment goals for tailored trading strategies.',
  },
  {
    icon: <PenTool className="w-10 h-10 text-primary" />,
    title: '3. Activate The Bot',
    description: 'Review the AI-generated strategy, make tweaks if needed, and activate your trading bot.',
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-primary" />,
    title: '4. Track Performance',
    description: 'Monitor your portfolio growth with our built-in analytics to refine your strategy.',
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 animate-in fade-in-50 duration-1000">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Get Started in Minutes</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our streamlined process makes it easy to automate your trading.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 bg-secondary border-secondary">
              <CardHeader className="p-0 mb-4">
                {step.icon}
              </CardHeader>
              <CardTitle className="mb-2 text-xl">{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
