'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const testimonials = [
  {
    name: 'Sarah J.',
    role: 'Social Media Manager',
    avatar: 'https://placehold.co/40x40.png',
    testimonial:
      "Postflow AI has completely transformed my content strategy. The AI is incredibly smart, and I've seen a 40% increase in my engagement in just two months!",
  },
  {
    name: 'Mark C.',
    role: 'Startup Founder',
    avatar: 'https://placehold.co/40x40.png',
    testimonial:
      "I was skeptical about AI content tools, but Postflow AI proved me wrong. It's easy to use, and the results speak for themselves. Highly recommended.",
  },
  {
    name: 'Emily R.',
    role: 'Marketing Analyst',
    avatar: 'https://placehold.co/40x40.png',
    testimonial:
      "The post analytics are on par with some of the institutional tools I use. It's an impressive piece of technology for any business.",
  },
  {
    name: 'Alex T.',
    role: 'Digital Agency Owner',
    avatar: 'https://placehold.co/40x40.png',
    testimonial:
      'This tool is a lifesaver. It automates the most time-consuming parts of my job, allowing me to focus on strategy and client relationships.',
  },
  {
    name: 'Jessica L.',
    role: 'E-commerce Specialist',
    avatar: 'https://placehold.co/40x40.png',
    testimonial:
      'We saw a significant uptick in our social media-driven sales after implementing Postflow AI. The content it creates is spot-on for our brand voice.',
  },
  {
    name: 'David P.',
    role: 'Content Creator',
    avatar: 'https://placehold.co/40x40.png',
    testimonial:
      "As a one-person team, Postflow AI is like having a creative partner. It helps me beat writer's block and consistently publish high-quality content.",
  },
  {
    name: 'Linda H.',
    role: 'Small Business Owner',
    avatar: 'https://placehold.co/40x40.png',
    testimonial:
      "I don't have a huge marketing budget, so Postflow AI has been a game-changer for my business. It gives me a professional social media presence without the high cost.",
  },
  {
    name: 'Kevin G.',
    role: 'Tech Blogger',
    avatar: 'https://placehold.co/40x40.png',
    testimonial:
      'The ability to analyze trends and generate relevant content is what sets Postflow AI apart. It keeps my feed fresh and my audience engaged.',
  },
  {
    name: 'Laura K.',
    role: 'Freelance Writer',
    avatar: 'https://placehold.co/40x40.png',
    testimonial:
      'I use Postflow AI to brainstorm ideas and draft initial posts for my clients. It has significantly sped up my workflow and improved my output quality.',
  },
  {
    name: 'Michael B.',
    role: 'Real Estate Agent',
    avatar: 'https://placehold.co/40x40.png',
    testimonial:
      'The platform is incredibly user-friendly. I was able to get up and running in minutes and saw an immediate improvement in my social media reach.',
  },
];

const TestimonialsSection = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Trusted by Marketers Worldwide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hear what our users have to say about their success with Postflow AI.
          </p>
        </div>
        <div className="relative">
        <Carousel
            plugins={[plugin.current]}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1 h-full">
                    <Card className="p-6 h-full">
                      <CardContent className="p-0 flex flex-col h-full">
                        <p className="text-muted-foreground italic flex-grow">
                          "{testimonial.testimonial}"
                        </p>
                        <div className="flex items-center mt-6 pt-4 border-t">
                          <Avatar>
                            <AvatarImage
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              data-ai-hint="person portrait"
                            />
                            <AvatarFallback>
                              {testimonial.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
