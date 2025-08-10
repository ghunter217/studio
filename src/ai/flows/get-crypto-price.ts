'use server';
/**
 * @fileOverview A flow for getting the price of a cryptocurrency.
 *
 * - getCryptoPrice - A function that gets the price of a cryptocurrency.
 * - CryptoPriceInputSchema - The input type for the getCryptoPrice function.
 * - CryptoPriceOutputSchema - The return type for the getCryptoPrice function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import fetch from 'node-fetch';
import { CryptoPriceInputSchema, CryptoPriceOutputSchema, CryptoPriceInput, CryptoPriceOutput } from '@/ai/schemas/get-crypto-price';

const getCryptoPriceTool = ai.defineTool(
    {
        name: 'getCryptoPrice',
        description: 'Get the current price of a cryptocurrency in USD.',
        inputSchema: z.object({
            ticker: z.string().describe('The ticker symbol of the cryptocurrency (e.g., BTC, ETH).'),
        }),
        outputSchema: z.object({
            price: z.number().describe('The current price of the cryptocurrency in USD.'),
        }),
    },
    async (input) => {
        const a = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${input.ticker.toLowerCase()}&vs_currencies=usd`);
        const data: any = await a.json();

        if (data[input.ticker.toLowerCase()] && data[input.ticker.toLowerCase()].usd) {
            return {
                price: data[input.ticker.toLowerCase()].usd,
            };
        }
        
        throw new Error(`Could not find price for ${input.ticker}`);
    }
);

export async function getCryptoPrice(input: CryptoPriceInput): Promise<CryptoPriceOutput> {
    return getCryptoPriceFlow(input);
}

const prompt = ai.definePrompt({
    name: 'getCryptoPricePrompt',
    input: { schema: CryptoPriceInputSchema },
    output: { schema: CryptoPriceOutputSchema },
    tools: [getCryptoPriceTool],
    prompt: `You are a cryptocurrency price checker. Use the getCryptoPrice tool to get the current price for the given ticker.`,
});

const getCryptoPriceFlow = ai.defineFlow(
    {
        name: 'getCryptoPriceFlow',
        inputSchema: CryptoPriceInputSchema,
        outputSchema: CryptoPriceOutputSchema,
    },
    async (input) => {
        const llmResponse = await prompt(input);
        const price = llmResponse.toolRequest?.tool.input.price;

        return {
            price: price as number,
        };
    }
);
