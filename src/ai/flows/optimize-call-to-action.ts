'use server';
/**
 * @fileOverview Optimizes a call to action using AI.
 *
 * - optimizeCallToAction - A function that optimizes a call to action.
 */

import {ai} from '@/ai/genkit';
import { OptimizeCallToActionInputSchema, OptimizeCallToActionOutputSchema, OptimizeCallToActionInput, OptimizeCallToActionOutput } from '@/ai/schemas/optimize-call-to-action';


export async function optimizeCallToAction(
  input: OptimizeCallToActionInput
): Promise<OptimizeCallToActionOutput> {
  return optimizeCallToActionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeCallToActionPrompt',
  input: {schema: OptimizeCallToActionInputSchema},
  output: {schema: OptimizeCallToActionOutputSchema},
  prompt: `You are an expert copywriter specializing in conversion rate optimization.

You will be provided with a call to action, and your goal is to improve it to drive more conversions.

Provide a brief explanation of your reasoning, and then provide the improved call to action.

Call to action: {{{callToAction}}}`,
});

const optimizeCallToActionFlow = ai.defineFlow(
  {
    name: 'optimizeCallToActionFlow',
    inputSchema: OptimizeCallToActionInputSchema,
    outputSchema: OptimizeCallToActionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
