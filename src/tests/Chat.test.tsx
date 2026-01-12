import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Chat } from '../components/chat/Chat';
import { describe, it, expect, vi } from 'vitest';

// Mock the useChat hook
vi.mock('../hooks/useChat', () => ({
  useChat: () => ({
    messages: [],
    sendMessage: vi.fn(),
    isLoading: false,
  }),
}));

describe('Chat Component', () => {
  it('renders empty state correctly', () => {
    render(<Chat />);
    expect(screen.getByText('AI 代码助手')).toBeInTheDocument();
  });

  it('sends message when input is submitted', async () => {
    const mockSendMessage = vi.fn();
    vi.mocked(useChat).mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      isLoading: false,
    });

    render(<Chat />);
    
    const input = screen.getByPlaceholderText('输入消息...');
    const button = screen.getByText('发送');
    
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalledWith('Hello');
    });
  });
});
