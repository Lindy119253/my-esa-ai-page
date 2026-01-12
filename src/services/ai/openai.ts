import OpenAI from 'openai';

class OpenAIService {
  private openai: OpenAI | null = null;

  constructor() {
    this.initialize();
  }

  private initialize() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (apiKey) {
      this.openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true, // 仅开发环境使用
      });
    }
  }

  async chatCompletion(messages: Array<{role: string; content: string}>) {
    if (!this.openai) {
      throw new Error('OpenAI服务未初始化，请检查API密钥配置');
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

  // 代码分析专用方法
  async analyzeCode(code: string, language: string, context?: string) {
    const prompt = `请分析以下${language}代码：
\`\`\`${language}
${code}
\`\`\`

${context ? `上下文：${context}` : ''}

请提供：
1. 代码功能说明
2. 潜在问题
3. 优化建议`;

    return this.chatCompletion([{ role: 'user', content: prompt }]);
  }
}

export const openAIService = new OpenAIService();
