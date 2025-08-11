import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  const faqs = [
    {
      question: "What is Postflow AI?",
      answer: "Postflow AI is an intelligent, automated bot that uses artificial intelligence to help you with stock trading, online betting, and poker games. It analyzes data and executes strategies to help you maximize your success."
    },
    {
      question: "Is Postflow AI secure?",
      answer: "Yes, security is our top priority. We use industry-leading encryption and security protocols to protect your data and assets. You can connect your accounts securely via API keys, which limit our access to only what is necessary to perform trades or place bets."
    },
    {
      question: "What platforms do you support?",
      answer: "We support all major cryptocurrency exchanges, stock trading platforms, and popular online betting and poker sites. Our team is constantly working to integrate with more platforms."
    },
    {
      question: "Do I need experience to use Postflow AI?",
      answer: "No, Postflow AI is designed for both beginners and experienced users. Our AI can generate strategies based on your goals and risk tolerance, and our interface is user-friendly. For advanced users, we offer a range of customization options."
    },
    {
      question: "How does the free trial work?",
      answer: "Our free trial gives you full access to all Postflow AI features for 14 days. No credit card is required to sign up. This allows you to test the platform and see the results for yourself before committing to a paid plan."
    },
     {
      question: "Can I customize the bot's strategy?",
      answer: "Absolutely. While our AI can suggest strategies, you have full control to customize them or build your own from scratch. You can set your own parameters for risk, assets to trade, and specific conditions for actions."
    }
  ];
  
  const FaqSection = () => {
    return (
      <section id="faq" className="py-20 md:py-32 animate-in fade-in-50 duration-1000">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Find answers to common questions about Postflow AI.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    );
  };
  
  export default FaqSection;
  