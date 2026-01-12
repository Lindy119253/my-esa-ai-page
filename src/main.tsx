import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // 确保没有 .tsx 扩展名
import './index.css';

// 获取根元素
const rootElement = document.getElementById('root');

// 确保根元素存在
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

// 可选：添加热模块替换
if (import.meta.hot) {
  import.meta.hot.accept();
}
