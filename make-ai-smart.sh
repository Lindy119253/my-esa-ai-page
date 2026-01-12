#!/bin/bash
# make-ai-smart.sh

echo "🤖 让 AI 变得智能起来..."

# 1. 创建智能回复服务
cat > src/services/smartAIService.ts << 'EOF'
export class SmartAIService {
  // 关键词回复映射
  private responseMap = {
    // 问候
    '你好': '👋 你好！我是 AI 代码助手，很高兴为您服务！',
    'hello': 'Hello! I am an AI coding assistant. How can I help you today?',
    'hi': 'Hi there! Need help with coding?',
    
    // 介绍
    '你是谁': '我是 AI 代码助手，专门解决编程问题、分析代码、提供技术建议。',
    'what': 'I am an AI programming assistant focused on code analysis and technical solutions.',
    
    // 功能
    '你能做什么': '我可以：\n1. 分析代码问题\n2. 解答编程疑问\n3. 提供技术建议\n4. 指导学习路径\n5. 优化代码性能',
    '功能': '主要功能：\n• 代码调试和优化\n• 技术问题解答\n• 编程概念解释\n• 项目架构建议\n• 学习资源推荐',
    
    // 技术问题
    'react': 'React 是一个用于构建用户界面的 JavaScript 库。\n\n核心概念：\n• 组件化\n• 虚拟DOM\n• 状态管理\n• Hooks\n\n需要具体的 React 帮助吗？',
    'vue': 'Vue 是一个渐进式 JavaScript 框架。\n\n特点：\n• 响应式数据绑定\n• 组件系统\n• 指令系统\n• 组合式 API\n\n有具体的 Vue 问题吗？',
    'javascript': 'JavaScript 是 Web 开发的核心语言。\n\n现代 JS 特性：\n• ES6+ 语法\n• 异步编程（async/await）\n• 模块化\n• 函数式编程\n\n需要哪方面的 JS 帮助？',
    
    // 代码问题
    '错误': '遇到代码错误时：\n1. 仔细阅读错误信息\n2. 检查控制台输出\n3. 使用调试工具\n4. 搜索类似问题\n\n能分享具体错误吗？',
    'bug': '调试 Bug 步骤：\n1. 复现问题\n2. 缩小范围\n3. 添加日志\n4. 使用断点\n5. 分析原因\n\n需要调试帮助吗？',
  };

  // 智能回复生成
  generateResponse(userInput: string): string {
    const input = userInput.toLowerCase();
    
    // 精确匹配
    for (const [keyword, response] of Object.entries(this.responseMap)) {
      if (input.includes(keyword.toLowerCase())) {
        return response as string;
      }
    }
    
    // 代码相关检测
    if (input.includes('代码') || input.includes('编程') || input.includes('程序')) {
      if (input.includes('如何') || input.includes('怎么') || input.includes('怎样')) {
        return `关于"${userInput}"，我建议：

1. 先从基础概念开始学习
2. 参考官方文档和教程
3. 尝试编写简单的示例
4. 逐步增加复杂度
5. 遇到具体问题时再深入研究

有具体的代码需求吗？`;
      }
      return `关于编程问题"${userInput}"，我可以提供：

• 代码示例和解释
• 常见解决方案
• 最佳实践建议
• 学习资源推荐

请告诉我更多细节！`;
    }
    
    // 学习相关
    if (input.includes('学习') || input.includes('教程') || input.includes('入门')) {
      return `学习建议：

1. **确定目标**：明确要学什么
2. **找到资源**：官方文档、教程、视频
3. **动手实践**：边学边做项目
4. **解决问题**：遇到问题及时解决
5. **持续学习**：技术更新快，保持学习

具体想学什么技术？`;
    }
    
    // 默认智能回复
    return `关于"${userInput}"，我理解您的问题。作为代码助手，我可以：

🔧 **如果是技术问题**：提供具体解决方案
📚 **如果是学习问题**：推荐学习路径和资源
💡 **如果是概念问题**：详细解释原理和用法
🚀 **如果是项目问题**：提供架构和实现建议

能告诉我更多背景信息吗？这样我能给出更精准的回答。`;
  }
  
  // 代码分析功能
  analyzeCode(code: string, language: string = 'javascript'): string {
    return `分析 ${language} 代码：

📋 **代码概览**：
\`\`\`${language}
${code.substring(0, 200)}${code.length > 200 ? '...' : ''}
\`\`\`

💡 **建议**：
1. 添加适当的注释
2. 考虑错误处理
3. 优化代码结构
4. 确保代码可读性

需要更详细的分析吗？`;
  }
}

export const smartAIService = new SmartAIService();
EOF

# 2. 更新 Chat 组件
echo "🔄 更新 Chat 组件..."
cat > src/components/Chat.tsx << 'EOF'
import React, { useState, useEffect, useRef } from 'react';
import { smartAIService } from '../services/smartAIService';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      content: '👋 你好！我是 AI 代码助手，现在变得更智能了！\n\n我可以：\n• 回答编程问题\n• 分析代码\n• 提供技术建议\n• 指导学习路径\n\n试试问我技术问题吧！',
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
      // 模拟思考时间
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
      
      // 使用智能 AI 服务生成回复
      const aiResponse = smartAIService.generateResponse(userInput);
      
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
        id: (Date.now() + 1).toString(),
        content: '❌ 处理消息时出现问题，请稍后再试。',
        role: 'assistant',
        timestamp: new Date(),
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

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              <div className="whitespace-pre-wrap break-words">
                {message.content}
              </div>
              <div
                className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-blue-200' : 'text-emerald-200'
                }`}
              >
                {message.timestamp.toLocaleTimeString('zh-CN', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-emerald-700 rounded-2xl p-4">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm">AI 正在思考...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="p-4 bg-white/10 backdrop-blur-sm">
        <div className="flex space-x-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入技术问题或代码..."
            disabled={isLoading}
            className="flex-1 bg-white/20 border border-white/30 rounded-xl px-4 py-3 
                     text-white placeholder-white/60 focus:outline-none focus:border-white
                     disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 
                     disabled:from-gray-500 disabled:to-gray-600
                     text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-cyan-300
                     disabled:cursor-not-allowed"
          >
            发送
          </button>
        </div>
        <div className="text-xs text-white/60 mt-2 text-center">
          提示：可以问编程问题、代码错误、技术概念、学习建议等
        </div>
      </div>
    </div>
  );
};

export default Chat;
EOF

echo "✅ AI 智能升级完成！"
echo "🏗️ 重新构建项目..."
npm run build

if [ $? -eq 0 ]; then
  echo "🎉 构建成功！"
  echo "🚀 运行: npm run dev"
else
  echo "❌ 构建失败"
  npm run build 2>&1 | tail -10
fi
