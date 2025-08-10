'use server';

import { chat } from '@/ai/flows/chat';
import { ChatInput } from '@/ai/schemas/chat';

export async function handleChat(history: ChatInput['history']) {
  try {
    const result = await chat({ history });
    return { success: true, message: result.response };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Sorry, I am having trouble connecting. Please try again later.' };
  }
}
