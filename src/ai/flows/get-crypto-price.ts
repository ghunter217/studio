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
        description: 'Get the current price and recent price history of a cryptocurrency in USD.',
        inputSchema: z.object({
            ticker: z.string().describe('The ticker symbol of the cryptocurrency (e.g., BTC, ETH). This should be the coingecko id (e.g. bitcoin, ethereum).'),
        }),
        outputSchema: z.object({
            price: z.number().describe('The current price of the cryptocurrency in USD.'),
            chartData: z.array(z.object({
                date: z.string().describe('The date of the data point.'),
                value: z.number().describe('The price of the cryptocurrency at that date.'),
            })).describe('The historical price data for the last 7 days.')
        }),
    },
    async (input) => {
        const id = input.ticker.toLowerCase();
        const apiKey = process.env.COINGECKO_API_KEY;
        const useProApi = apiKey && apiKey !== 'your_coingecko_api_key_here';
        
        const baseUrl = useProApi ? 'https://pro-api.coingecko.com/api/v3' : 'https://api.coingecko.com/api/v3';
        const apiKeyParam = useProApi ? `x_cg_pro_api_key=${apiKey}` : '';

        const priceUrl = `${baseUrl}/simple/price?ids=${id}&vs_currencies=usd&${apiKeyParam}`;
        const chartUrl = `${baseUrl}/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily&${apiKeyParam}`;

        const [priceResponse, chartResponse] = await Promise.all([
            fetch(priceUrl),
            fetch(chartUrl)
        ]);
        
        const priceData: any = await priceResponse.json();
        const chartData: any = await chartResponse.json();

        if (priceData[id] && priceData[id].usd && chartData.prices) {
            return {
                price: priceData[id].usd,
                chartData: chartData.prices.map((p: [number, number]) => ({
                    date: new Date(p[0]).toISOString().split('T')[0],
                    value: parseFloat(p[1].toFixed(2)),
                })),
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
    prompt: `You are a cryptocurrency price checker. Use the getCryptoPrice tool to get the current price and recent history for the given ticker. The ticker should be a coingecko ID.`,
});

const getCryptoPriceFlow = ai.defineFlow(
    {
        name: 'getCryptoPriceFlow',
        inputSchema: CryptoPriceInputSchema,
        outputSchema: CryptoPriceOutputSchema,
    },
    async (input) => {
        const llmResponse = await prompt(input);
        const toolResponse = llmResponse.toolRequest?.tool.output as CryptoPriceOutput | undefined;

        if (toolResponse?.price && toolResponse.chartData) {
            return toolResponse;
        }

        const outputData = llmResponse.output;
        if(outputData?.price && outputData?.chartData) {
            return outputData;
        }
        
        throw new Error(`Could not determine price for ${input.ticker}`);
    }
);
