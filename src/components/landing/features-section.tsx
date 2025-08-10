import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrainCircuit, Bot, AreaChart, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <BrainCircuit className="w-10 h-10 text-primary" />,
    title: 'AI-Powered Content',
    description: 'Our advanced AI analyzes trending topics to generate highly engaging social media posts, giving you an edge.'
  },
  {
    icon: <Bot className="w-10 h-10 text-primary" />,
    title: 'Fully Automated Posting',
    description: 'Set your schedule and let Postflow AI handle the rest. 24/7 automated posting means you never miss an opportunity.'
  },
  {
    icon: <AreaChart className="w-10 h-10 text-primary" />,
    title: 'Performance Analytics',
    description: 'Monitor your posts with our intuitive dashboard, featuring real-time performance data and insights.'
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    title: 'Secure & Reliable',
    description: 'Your security is our top priority. We use industry-leading encryption and security protocols to protect your accounts.'
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-secondary">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Postflow AI?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover the powerful features that make Postflow AI the ultimate social media tool.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
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
