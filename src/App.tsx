import React from 'react';
import Chat from './components/Chat';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="bg-gray-900 text-white p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">AI 代码助手</h1>
        <p className="text-sm text-gray-400">智能代码分析和编程助手</p>
      </header>
      <main className="flex-1 h-full">
        <Chat />
      </main>
    </div>
  );
}

export default App;
