import {z} from 'genkit';

export const OptimizeCallToActionInputSchema = z.object({
  callToAction: z.string().describe('The call to action to optimize.'),
});
export type OptimizeCallToActionInput = z.infer<typeof OptimizeCallToActionInputSchema>;

export const OptimizeCallToActionOutputSchema = z.object({
  optimizedCallToAction: z.string().describe('The optimized call to action.'),
  reasoning: z.string().describe('The reasoning behind the optimization.'),
});
export type OptimizeCallToActionOutput = z.infer<typeof OptimizeCallToActionOutputSchema>;
