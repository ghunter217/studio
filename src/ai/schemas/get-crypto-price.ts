import { z } from 'zod';

export const CryptoPriceInputSchema = z.object({
    ticker: z.string().describe('The ticker symbol of the cryptocurrency (e.g. bitcoin, ethereum).'),
});
export type CryptoPriceInput = z.infer<typeof CryptoPriceInputSchema>;

export const CryptoPriceOutputSchema = z.object({
    price: z.number().describe('The current price of the cryptocurrency in USD.'),
    chartData: z.array(z.object({
        date: z.string().describe('The date for the data point.'),
        value: z.number().describe('The price for that day.')
    })).describe('The historical price data for the last 7 days.')
});
export type CryptoPriceOutput = z.infer<typeof CryptoPriceOutputSchema>;
