#!/bin/bash
# fix-node18-build.sh

echo "🔧 Node.js 18.20.8 专用修复脚本..."

# 检查 Node.js 版本
NODE_VERSION=$(node --version)
echo "当前 Node.js 版本: $NODE_VERSION"

if [[ ! "$NODE_VERSION" =~ v18\. ]]; then
    echo "❌ 此脚本专为 Node.js 18 设计"
    echo "💡 建议使用 nvm 切换版本: nvm use 18"
    exit 1
fi

echo "✅ Node.js 版本兼容"

# 清理环境
echo "🧹 清理环境..."
rm -rf node_modules dist package-lock.json

# 创建 package.json
cat > package.json << 'EOF'
{
  "name": "react-chatbot-template",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "@types/react": "18.2.43",
    "@types/react-dom": "18.2.17",
    "@vitejs/plugin-react": "4.2.1",
    "typescript": "5.2.2",
    "vite": "5.0.8"
  }
}
EOF

# 创建 vite.config.js
cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: false
  }
})
EOF

# 创建 tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
EOF

# 创建目录结构
mkdir -p src

# 创建 index.html
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Chatbot</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# 创建 main.tsx
cat > src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

# 创建 App.tsx
cat > src/App.tsx << 'EOF'
import React, { useState } from 'react'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // 模拟 AI 回复
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `这是对"${input}"的模拟回复。在真实环境中，这里会调用 AI API。`,
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#1a1a1a',
      color: 'white'
    }}>
      <header style={{ 
        padding: '1rem', 
        borderBottom: '1px solid #333',
        backgroundColor: '#2a2a2a'
      }}>
        <h1 style={{ margin: 0 }}>🤖 AI 代码助手</h1>
        <p style={{ margin: 0, opacity: 0.7 }}>Node.js 18.20.8 环境</p>
      </header>

      <div style={{ 
        flex: 1, 
        padding: '1rem', 
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {messages.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            opacity: 0.7,
            marginTop: '2rem'
          }}>
            <h2>欢迎使用 AI 代码助手</h2>
            <p>开始对话来获取代码帮助</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              style={{
                alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '70%'
              }}
            >
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '1rem',
                  backgroundColor: message.role === 'user' ? '#2563eb' : '#374151',
                  color: 'white'
                }}
              >
                {message.content}
                <div style={{ 
                  fontSize: '0.75rem', 
                  opacity: 0.7,
                  marginTop: '0.25rem'
                }}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div style={{ alignSelf: 'flex-start' }}>
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: '1rem',
              backgroundColor: '#374151'
            }}>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <div style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  borderRadius: '50%',
                  backgroundColor: '#9ca3af',
                  animation: 'bounce 1.4s infinite'
                }}></div>
                <div style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  borderRadius: '50%',
                  backgroundColor: '#9ca3af',
                  animation: 'bounce 1.4s infinite 0.2s'
                }}></div>
                <div style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  borderRadius: '50%',
                  backgroundColor: '#9ca3af',
                  animation: 'bounce 1.4s infinite 0.4s'
                }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ 
        padding: '1rem', 
        borderTop: '1px solid #333',
        display: 'flex',
        gap: '0.5rem'
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="输入您的问题..."
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid #4b5563',
            backgroundColor: '#374151',
            color: 'white',
            outline: 'none'
          }}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            backgroundColor: isLoading ? '#6b7280' : '#2563eb',
            color: 'white',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          发送
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

export default App
EOF

# 创建基础样式
cat > src/index.css << 'EOF'
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #1a1a1a;
  color: white;
}

#root {
  height: 100vh;
}
EOF

echo "📦 安装依赖..."
npm install

echo "🏗️ 测试构建..."
npm run build

if [ $? -eq 0 ]; then
    echo "🎉 构建成功！"
    echo "📁 构建输出:"
    ls -la dist/
    echo "🚀 启动开发服务器: npm run dev"
else
    echo "❌ 构建失败，显示错误:"
    npm run build 2>&1 | tail -20
fi
