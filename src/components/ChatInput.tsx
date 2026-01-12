import React, { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSend, 
  disabled = false,
  placeholder = "输入消息..." 
}) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex space-x-2">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 
                   text-white placeholder-gray-400 focus:outline-none focus:border-blue-500
                   resize-none min-h-[40px] max-h-[120px]"
        rows={1}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 
                   text-white px-4 py-2 rounded-lg transition-colors
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        发送
      </button>
    </div>
  );
};
