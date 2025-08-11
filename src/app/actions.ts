'use server';

import { getCryptoPriceData } from '@/services/coingecko';
import type { CryptoPriceOutput } from '@/services/coingecko';
import { z } from 'zod';

export async function handleGetCryptoPrice(ticker: string): Promise<CryptoPriceOutput | { error: string }> {
  try {
    const result = await getCryptoPriceData(ticker);
    return result;
  } catch (error: any) {
    console.error(`Error fetching price for ${ticker}:`, error);
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
