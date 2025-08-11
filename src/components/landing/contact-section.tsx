'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { handleContactForm, type ContactFormState } from '@/app/actions';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { CheckCircle, Loader2 } from 'lucide-react';

const initialState: ContactFormState = {
    message: '',
    isSuccess: false,
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="lg" disabled={pending}>
            {pending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
            {pending ? 'Sending...' : 'Send Message'}
        </Button>
    )
}

const ContactSection = () => {
    const [state, formAction] = useActionState(handleContactForm, initialState);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (state.message && !state.isSuccess) {
            toast({
                title: 'Something went wrong',
                description: state.issues?.join('\n') || state.message,
                variant: 'destructive',
            });
        }
        if (state.isSuccess) {
            formRef.current?.reset();
            setIsDialogOpen(true);
        }
    }, [state, toast]);
    
    useEffect(() => {
        // Reset the form action state when the dialog is closed
        if (!isDialogOpen && state.isSuccess) {
           // A bit of a hack to reset the action state, as there's no built-in reset function.
           // We can dispatch with null form data which will fail validation and reset the success state.
           formAction(new FormData());
        }
    }, [isDialogOpen, state.isSuccess, formAction]);


    return (
        <section id="contact" className="py-20 md:py-32 animate-in fade-in-50 duration-1000">
            <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Have a question or want to work with us? We'd love to hear from you.
                    </p>
                </div>
                <form ref={formRef} action={formAction} className="max-w-xl mx-auto space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input name="name" type="text" placeholder="Name" className="text-base" required />
                        <Input name="email" type="email" placeholder="Email" className="text-base" required />
                    </div>
                    <Textarea name="message" placeholder="Your message..." rows={5} className="text-base" required />
                    <div className="text-center">
                        <SubmitButton />
                    </div>
                </form>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-lg bg-secondary border-primary shadow-2xl rounded-xl text-center">
                    <DialogHeader>
                        <div className="flex justify-center mb-4">
                            <CheckCircle className="w-20 h-20 text-green-500 animate-in fade-in-25 zoom-in-50 duration-500" />
                        </div>
                        <DialogTitle className="text-3xl font-bold text-center text-primary">
                            Message Sent!
                        </DialogTitle>
                        <DialogDescription className="text-center text-muted-foreground mt-2 text-lg">
                            Thank you for reaching out. We've received your message and will get back to you shortly.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-center mt-4">
                        <DialogClose asChild>
                            <Button type="button" size="lg" variant="outline">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default ContactSection;
