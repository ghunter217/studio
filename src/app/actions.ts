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


const ContactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
});

export type ContactFormState = {
  message: string;
  issues?: string[];
  isSuccess: boolean;
}

export async function handleContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // This is a hack to reset the state from the client.
  if (!formData.get('name')) {
    return {
        message: '',
        isSuccess: false,
    }
  }

  const validatedFields = ContactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    const issues = validatedFields.error.issues.map((issue) => issue.message);
    return {
      message: 'Validation failed.',
      issues,
      isSuccess: false,
    };
  }

  // Simulate sending the message
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Contact form submitted:', validatedFields.data);

  return {
    message: 'Success!',
    isSuccess: true,
  };
}
