import { z } from 'genkit';

export const CryptoPriceInputSchema = z.object({
    ticker: z.string().describe('The ticker symbol of the cryptocurrency.'),
});
export type CryptoPriceInput = z.infer<typeof CryptoPriceInputSchema>;

export const CryptoPriceOutputSchema = z.object({
    price: z.number().describe('The current price of the cryptocurrency in USD.'),
});
export type CryptoPriceOutput = z.infer<typeof CryptoPriceOutputSchema>;
