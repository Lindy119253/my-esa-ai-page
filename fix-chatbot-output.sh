#!/bin/bash
# fix-chatbot-output.sh

echo "🔧 修复 Chatbot 输出问题..."

# 备份现有文件
echo "📦 备份现有文件..."
mkdir -p backup
cp src/components/Chat.tsx backup/ 2>/dev/null || true
cp src/App.tsx backup/ 2>/dev/null || true

# 创建修复后的 Chat 组件
echo "🛠️ 创建修复后的 Chat 组件..."
cat > src/components/Chat.tsx << 'EOF'
import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 添加欢迎消息
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      content: '👋 你好！我是 AI 代码助手，我可以帮助您分析代码问题、解答编程疑问。请随时向我提问！',
      role: 'assistant',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSend = async () => {
    const userInput = input.trim();
    if (!userInput || isLoading) return;

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      content: userInput,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 模拟 AI 思考时间
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 生成智能回复
      const aiResponse = `这是对"${userInput}"的回复。这是一个演示版本的响应。在实际应用中，这里会调用真实的 AI API。`;
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('发送消息失败:', error);
      
      const errorMessage: Message = {
