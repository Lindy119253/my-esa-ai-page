import React from 'react';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
  isCurrentUser?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isCurrentUser = false 
}) => {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] rounded-lg p-3 ${
        isCurrentUser 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-800 text-gray-200'
      }`}>
        <div className="whitespace-pre-wrap break-words">
          {message.content}
        </div>
        <div className={`text-xs mt-1 ${
          isCurrentUser ? 'text-blue-200' : 'text-gray-400'
        }`}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};
