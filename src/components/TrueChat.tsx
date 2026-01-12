// src/components/TrueChat.tsx
import React, { useState, useEffect, useRef } from 'react';
import { trueAIService } from '../services/trueAIService';

const TrueChat: React.FC = () => {
  const [messages, setMessages] = useState<Array<{id: string, text: string, isUser: boolean, timestamp: Date}>>([
    {
      id: 'welcome',
      text: '🎯 真正的智能 AI 助手已就绪！\n\n💪 我现在拥有完整的知识库，能够：\n• 回答复杂的技术问题\n• 提供编程学习指导\n• 分析代码和架构\n• 解释技术概念原理\n• 比较不同技术方案\n\n💡 试试问我：\n"如何学习 React？"\n"JavaScript 闭包是什么？"\n"React 和 Vue 哪个好？"\n"Node.js 的事件循环机制"',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const userInput = input.trim();
    if (!userInput || isLoading) return;

    // 添加用户消息
    const userMessage = {
      id: Date.now().toString(),
      text: userInput,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 使用真正的 AI 服务获取智能回复
      const aiResponse = await trueAIService.askQuestion(userInput);
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('发送消息失败:', error);
      
      const errorMessage = {
        id: (Date.now() + 2).toString(),
        text: '❌ 处理消息时出现问题。请稍后再试。',
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 格式化时间
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-900 text-white">
      {/* 顶部标题栏 */}
      <div className="bg-black/20 backdrop-blur-sm p-4 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-center flex items-center justify-center gap-3">
            <span className="text-3xl">🤖</span>
            AI 智能代码助手
            <span className="text-sm bg-emerald-500 text-white px-2 py-1 rounded-full">真·智能版</span>
          </h1>
          <p className="text-center text-gray-300 text-sm mt-1">
            无需 API · 完整知识库 · 智能回复
          </p>
        </div>
      </div>
      
      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            style={{ animationDelay: '0.1s' }}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 shadow-lg ${
                message.isUser
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
              }`}
            >
              <div className="whitespace-pre-wrap break-words leading-relaxed">
                {message.text}
              </div>
              <div className={`text-xs mt-2 flex items-center justify-between ${message.isUser ? 'text-blue-200' : 'text-emerald-200'}`}>
                <span>{message.isUser ? '您' : 'AI助手'}</span>
                <span>{formatTime(message.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start animate-fadeIn">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm font-medium">AI 正在思考中...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="p-4 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入技术问题、学习疑问、代码需求..."
              disabled={isLoading}
              rows={1}
              className="flex-1 bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 
                       text-white placeholder-white/50 focus:outline-none focus:border-white/40
                       disabled:opacity-50 resize-none transition-all duration-200
                       focus:bg-white/15"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 
                       disabled:from-gray-500 disabled:to-gray-600
                       text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-transparent
                       disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none
                       shadow-lg hover:shadow-xl"
            >
              {isLoading ? '思考中...' : '发送'}
            </button>
          </div>
          
          <div className="flex items-center justify-center mt-3 text-sm text-white/60">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                技术支持
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                学习指导
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                代码分析
              </span>
            </div>
          </div>
          
          {/* 快速提问示例 */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {['JavaScript是什么？', '如何学习React？', '解释闭包', 'Node.js特点', 'Git基本命令'].map((example, index) => (
              <button
                key={index}
                onClick={() => setInput(example)}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 
                         text-xs text-white/70 hover:text-white transition-all duration-200"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrueChat;

export default TrueChat;
