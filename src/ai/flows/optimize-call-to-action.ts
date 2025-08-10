'use server';
/**
 * @fileOverview Optimizes a call to action using AI.
 *
 * - optimizeCallToAction - A function that optimizes a call to action.
 * - OptimizeCallToActionInput - The input type for the optimizeCallToAction function.
 * - OptimizeCallToActionOutput - The return type for the optimizeCallToAction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeCallToActionInputSchema = z.object({
  callToAction: z.string().describe('The call to action to optimize.'),
});
export type OptimizeCallToActionInput = z.infer<typeof OptimizeCallToActionInputSchema>;

const OptimizeCallToActionOutputSchema = z.object({
  optimizedCallToAction: z.string().describe('The optimized call to action.'),
  reasoning: z.string().describe('The reasoning behind the optimization.'),
});
export type OptimizeCallToActionOutput = z.infer<typeof OptimizeCallToActionOutputSchema>;

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
