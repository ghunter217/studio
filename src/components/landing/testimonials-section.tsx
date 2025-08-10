import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: 'Sarah J.',
    role: 'Day Trader',
    avatar: 'https://placehold.co/40x40.png',
    testimonial: 'Lumina has completely transformed my trading strategy. The AI is incredibly smart, and I\'ve seen a 40% increase in my profits in just two months!'
  },
  {
    name: 'Mark C.',
    role: 'Crypto Enthusiast',
    avatar: 'https://placehold.co/40x40.png',
    testimonial: 'I was skeptical about automated trading bots, but Lumina proved me wrong. It\'s easy to use, secure, and the results speak for themselves. Highly recommended.'
  },
  {
    name: 'Emily R.',
    role: 'Hedge Fund Analyst',
    avatar: 'https://placehold.co/40x40.png',
    testimonial: 'The predictive analytics are on par with some of the institutional tools I use. It\'s an impressive piece of technology for the retail investor.'
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Trusted by Traders Worldwide</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hear what our users have to say about their success with Lumina.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <CardContent className="p-0 flex flex-col h-full">
                <p className="text-muted-foreground italic flex-grow">"{testimonial.testimonial}"</p>
                <div className="flex items-center mt-6 pt-4 border-t">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
