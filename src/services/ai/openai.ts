// 模拟 OpenAI 服务 - 实际使用时替换为真实的 API 调用
class OpenAIService {
  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async chatCompletion(messages: Array<{role: string; content: string}>) {
    // 模拟 API 调用延迟
    await this.delay(1000 + Math.random() * 1000);

    const lastMessage = messages[messages.length - 1];
    const userContent = lastMessage.content.toLowerCase();

    // 模拟不同的响应
    if (userContent.includes('hello') || userContent.includes('你好')) {
      return '你好！我是 AI 代码助手，我可以帮助您解决编程问题、分析代码和提供技术建议。';
    }
    
    if (userContent.includes('react') || userContent.includes('组件')) {
      return `关于 React 组件，这里是一个基本示例：

\`\`\`jsx
import React, { useState } from 'react';

function ExampleComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>点击次数: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        点击我
      </button>
    </div>
  );
}

export default ExampleComponent;
\`\`\`

这是一个简单的计数器组件，展示了 React Hooks 的基本用法。`;
    }

    if (userContent.includes('javascript') || userContent.includes('js')) {
      return `JavaScript 是一种强大的编程语言。对于您的问题，这里有一些通用建议：

1. **使用现代 ES6+ 语法** - 箭头函数、解构、模板字符串等
2. **错误处理** - 使用 try/catch 处理异步错误
3. **代码可读性** - 使用有意义的变量名和函数名
4. **性能优化** - 避免不必要的重渲染和内存泄漏

需要更具体的帮助吗？请提供更多细节。`;
    }

    // 默认响应
    return `感谢您的提问！关于"${lastMessage.content}"，我可以提供以下帮助：

- 代码分析和解释
- 错误调试建议
- 性能优化方案
- 最佳实践指导
- 技术方案设计

请提供更具体的问题或代码片段，我会给出详细的解答。`;
  }
}

export const openAIService = new OpenAIService();
