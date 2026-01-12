import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // 注意：不需要 .tsx 扩展名
import './index.css';

// 获取根元素
const rootElement = document.getElementById('root');

// 处理根元素不存在的情况
if (!rootElement) {
  // 创建新的根元素
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
  console.error('Root element not found, created a new one');
}

// 创建根节点
const root = ReactDOM.createRoot(rootElement || document.getElementById('root')!);

// 渲染应用
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 热模块替换（开发环境）
if (import.meta.hot) {
  import.meta.hot.accept();
}

import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-800">
          <h2 className="text-xl font-bold">应用崩溃</h2>
          <p>抱歉，发生了意外错误。请刷新页面重试。</p>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      {/* 应用内容 */}
    </ErrorBoundary>
  );
}

export default App;

// 在 main.tsx 中添加
import reportWebVitals from './reportWebVitals';

// 在文件末尾添加
if (process.env.NODE_ENV === 'production') {
  reportWebVitals(console.log);
}

