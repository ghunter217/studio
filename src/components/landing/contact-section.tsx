import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
    return (
        <section id="contact" className="py-20 md:py-32">
            <div className="container max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Have a question or want to work with us? We'd love to hear from you.
                    </p>
                </div>
                <form className="max-w-xl mx-auto space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input type="text" placeholder="Name" className="text-base" />
                        <Input type="email" placeholder="Email" className="text-base" />
                    </div>
                    <Textarea placeholder="Your message..." rows={5} className="text-base" />
                    <div className="text-center">
                        <Button type="submit" size="lg">Send Message</Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactSection;
