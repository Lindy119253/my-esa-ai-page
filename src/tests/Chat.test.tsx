import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Chat } from '../components/Chat';

// 模拟 useChat hook
vi.mock('../hooks/useChat', () => ({
  useChat: () => ({
    messages: [],
    sendMessage: vi.fn(),
    isLoading: false,
    clearMessages: vi.fn(),
  }),
}));

describe('Chat Component', () => {
  it('渲染空状态正确', () => {
    render(<Chat />);
    expect(screen.getByText('🤖 AI 代码助手')).toBeInTheDocument();
    expect(screen.getByText('如何实现一个 React 组件？')).toBeInTheDocument();
  });

  it('显示输入框和发送按钮', () => {
    render(<Chat />);
    expect(screen.getByPlaceholderText('输入您的问题...')).toBeInTheDocument();
    expect(screen.getByText('发送')).toBeInTheDocument();
  });

  it('发送按钮初始状态为可用', () => {
    render(<Chat />);
    const sendButton = screen.getByText('发送');
    expect(sendButton).not.toBeDisabled();
  });
});
