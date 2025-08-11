'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { handleOptimizeCta, FormState } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Rocket } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const initialState: FormState = {
  message: '',
  isSuccess: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Optimizing...' : <><Rocket className="mr-2 h-4 w-4" /> Optimize Now</>}
    </Button>
  );
}

const CtaOptimizer = () => {
  const [state, formAction] = useActionState(handleOptimizeCta, initialState);
  const { pending } = useFormStatus();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && !state.isSuccess) {
      toast({
        title: state.message,
        description: state.issues?.join('\n'),
        variant: 'destructive',
      });
    }
    if (state.isSuccess) {
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <div>
      <form action={formAction} ref={formRef} className="space-y-4">
        <Textarea
          name="cta"
          placeholder="e.g., 'Sign up for our newsletter' or 'Buy now and get 50% off!'"
          rows={3}
          required
          className="text-base"
        />
        <SubmitButton />
      </form>
      
      {pending && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-24" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </CardContent>
            </Card>
        </div>
      )}

      {state.isSuccess && state.data && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in-50 duration-500">
          <Card className="border-primary shadow-lg">
            <CardHeader className="flex flex-row items-center gap-2">
              <Rocket className="w-5 h-5 text-primary" />
              <CardTitle>Optimized CTA</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{state.data.optimizedCallToAction}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Lightbulb className="w-5 h-5 text-accent" />
              <CardTitle>Reasoning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{state.data.reasoning}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CtaOptimizer;
