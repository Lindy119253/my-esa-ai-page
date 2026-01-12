// src/components/VisibleChat.tsx
import React, { useState, useEffect } from 'react';

const VisibleChat: React.FC = () => {
  const [messages, setMessages] = useState<Array<{id: string, text: string, isUser: boolean}>>([]);
  const [input, setInput] = useState('');
  
  // 初始化消息
  useEffect(() => {
    setMessages([
      { id: '1', text: '👋 你好！我是 AI 助手，很高兴为您服务。', isUser: false },
    ]);
  }, []);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // 添加用户消息
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: input,
      isUser: true
    }]);
    
    // 清空输入
    const userInput = input;
    setInput('');
    
    // 模拟 AI 回复
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: `这是对"${userInput}"的回复。AI 正在工作！`,
        isUser: false
      }]);
    }, 500);
  };
  
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* 标题栏 */}
      <div style={{
        padding: '20px',
        background: 'rgba(0,0,0,0.2)',
        color: 'white',
        textAlign: 'center',
        borderBottom: '2px solid white'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>🤖 AI 聊天助手</h1>
        <p style={{ margin: '5px 0 0 0', opacity: 0.8 }}>测试版本 - 消息总数: {messages.length}</p>
      </div>
      
      {/* 消息区域 */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              alignSelf: msg.isUser ? 'flex-end' : 'flex-start',
              maxWidth: '70%',
              padding: '12px 16px',
              borderRadius: '18px',
              background: msg.isUser ? '#007bff' : '#28a745',
              color: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              wordWrap: 'break-word'
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              {msg.isUser ? '您' : 'AI助手'}
            </div>
            <div>{msg.text}</div>
          </div>
        ))}
        
        {messages.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: 'rgba(255,255,255,0.7)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>💬</div>
            <h2>开始对话</h2>
            <p>输入消息开始与 AI 对话</p>
          </div>
        )}
      </div>
      
      {/* 输入区域 */}
      <div style={{
        padding: '20px',
        background: 'rgba(255,255,255,0.1)',
        borderTop: '1px solid rgba(255,255,255,0.2)',
        display: 'flex',
        gap: '10px'
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="输入消息..."
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '24px',
            border: '2px solid rgba(255,255,255,0.3)',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            fontSize: '16px',
            outline: 'none'
          }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          style={{
            padding: '12px 24px',
            borderRadius: '24px',
            border: 'none',
            background: input.trim() ? '#007bff' : '#6c757d',
            color: 'white',
            fontSize: '16px',
            cursor: input.trim() ? 'pointer' : 'not-allowed',
            fontWeight: 'bold'
          }}
        >
          发送
        </button>
      </div>
    </div>
  );
};

export default VisibleChat;
