import React, { useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Message } from '../types/chat';
import { useChat } from '../hooks/useChat';

export const Chat: React.FC = () => {
  const { messages, sendMessage, isLoading } = useChat();

  const handleSendMessage = (content: string) => {
    if (content.trim()) {
      sendMessage(content);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* 聊天消息区域 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-8">
            <h2 className="text-2xl font-bold mb-4">🤖 AI 代码助手</h2>
            <p>我可以帮助您分析代码、解答编程问题</p>
            <div className="mt-4 space-y-2 text-sm">
              <p>💡 尝试提问：</p>
              <p>"如何实现一个 React 组件？"</p>
              <p>"解释这个 JavaScript 函数的作用"</p>
              <p>"帮我优化这段代码"</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage 
              key={message.id} 
              message={message}
              isCurrentUser={message.role === 'user'}
            />
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-lg p-3 max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 输入区域 */}
      <div className="border-t border-gray-700 p-4">
        <ChatInput 
          onSend={handleSendMessage}
          disabled={isLoading}
          placeholder="输入您的问题..."
        />
      </div>
    </div>
  );
};

export default Chat;
