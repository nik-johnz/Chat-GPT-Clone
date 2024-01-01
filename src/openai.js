import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: 'sk-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',
  dangerouslyAllowBrowser: true
});

export async function sendMsgToOpenAI(message) {
  try {
    const res = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });
    console.log('Response from OpenAI:', res.data);
    return res.data.choices[0].text;
  } catch (error) {
    console.error('Error from OpenAI:', error);
    return 'An error occurred while processing your request.(API Key Limit Reached)';
  }
}