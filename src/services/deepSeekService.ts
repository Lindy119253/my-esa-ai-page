// src/services/deepSeekService.ts
class DeepSeekService {
  async chatCompletion(message: string): Promise<string> {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer YOUR_DEEPSEEK_API_KEY",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "你是一个有帮助的助手" },
          { role: "user", content: message }
        ],
        max_tokens: 2000
      })
    });
    
    const data = await response.json();
    return data.choices[0]?.message?.content || "无回复";
  }
}
