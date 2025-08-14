import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({apiKey: 'AIzaSyBkMZCJddX9r6okt0Jm_6XD_B3zpHKVPzA'})],
});
