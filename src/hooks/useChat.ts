// src/hooks/useChat.ts
import { useState } from 'react';
import { openAIService } from '../services/ai/openai';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userContent: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: userContent,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const result = await openAIService.chatCompletion([
        { role: 'user', content: userContent }
      ]);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: result,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('发送消息失败:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { messages, sendMessage, isLoading };
};
