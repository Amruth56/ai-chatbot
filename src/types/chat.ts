export type Message = {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: number;
}

export type ChatContextType = {
  messages: Message[];
  sendMessage: (text: string) => void;
  clearChat: () => void;
  isStreaming: boolean;
  connected: boolean;
};
