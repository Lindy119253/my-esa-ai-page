// src/services/ai/openai.ts
import OpenAI from 'openai';

class OpenAIService {
  private openai: OpenAI | null = null;

  constructor() {
    this.initialize();
  }

  private initialize() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      this.openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true,
      });
    }
  }

  async chatCompletion(messages: Array<{role: string; content: string}>) {
    if (!this.openai) {
      throw new Error('OpenAI服务未初始化');
    }

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 1000,
      });

      return completion.choices[0]?.message?.content || '抱歉，我没有得到响应';
    } catch (error) {
      console.error('OpenAI API调用失败:', error);
      throw error;
    }
  }
}

export const openAIService = new OpenAIService();
