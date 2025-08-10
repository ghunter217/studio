'use server';

import { optimizeCallToAction } from '@/ai/flows/optimize-call-to-action';
import { getCryptoPrice } from '@/ai/flows/get-crypto-price';
import { OptimizeCallToActionInput, OptimizeCallToActionOutput } from '@/ai/schemas/optimize-call-to-action';
import { CryptoPriceInput, CryptoPriceOutput } from '@/ai/schemas/get-crypto-price';
import { z } from 'zod';

const CtaSchema = z.object({
  cta: z.string().min(10, { message: "Please enter a call to action with at least 10 characters." }).max(200, { message: "Call to action must be 200 characters or less." }),
});

export type FormState = {
  message: string;
  issues?: string[];
  data?: OptimizeCallToActionOutput;
  isSuccess: boolean;
}

export async function handleOptimizeCta(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const cta = formData.get('cta');

  const validatedFields = CtaSchema.safeParse({ cta });

  if (!validatedFields.success) {
    const issues = validatedFields.error.issues.map((issue) => issue.message);
    return {
      message: 'Validation failed.',
      issues,
      isSuccess: false,
    };
  }

  try {
    const input: OptimizeCallToActionInput = {
      callToAction: validatedFields.data.cta,
    };
    
    const result = await optimizeCallToAction(input);

    return {
      message: 'Success!',
      data: result,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: 'An error occurred while optimizing the CTA. Please try again.',
      isSuccess: false,
    };
  }
}

export async function handleGetCryptoPrice(ticker: string): Promise<CryptoPriceOutput | { error: string }> {
  try {
    const result = await getCryptoPrice({ ticker });
    return result;
  } catch (error: any) {
    return {
      error: error.message || 'An error occurred while fetching the price.',
    };
  }
}
