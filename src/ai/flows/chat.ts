'use server';
/**
 * @fileOverview A simple chat flow.
 *
 * - chat - A function that handles the chat process.
 */

import {ai} from '@/ai/genkit';
import { ChatInputSchema, ChatOutputSchema, ChatInput, ChatOutput } from '@/ai/schemas/chat';

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: ChatOutputSchema},
  prompt: `You are Postflow AI's friendly and helpful assistant. 
Your goal is to answer questions about Postflow AI and convince users to try the product.

Keep your responses concise and to the point.

Here is the conversation history:
{{#each history}}
- {{role}}: {{content}}
{{/each}}
`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const llmResponse = await prompt(input);
    return {
        response: llmResponse.output!.response
    };
  }
);
