import { createContext, useContext, useState, useEffect } from "react";
import type { Message, ChatContextType } from "../types/chat";
import { v4 as uuid } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
import { useWebSocket } from "../hooks/useWebSocket";

const ChatContext = createContext<ChatContextType | null>(null);

const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:8080";

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = useLocalStorage<Message[]>("chat", []);
    const { connected, isStreaming, sendMessage: wsSendMessage } = useWebSocket(WS_URL);
    const [currentAssistantId, setCurrentAssistantId] = useState<string | null>(null);

    useEffect(() => {
        const handleChunk = (e: any) => {
            const content = e.detail;
            setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last && last.role === 'assistant' && last.id === currentAssistantId) {
                    return [...prev.slice(0, -1), { ...last, content: last.content + content }];
                } else {
                    // This handles the first chunk
                    const assistantId = currentAssistantId || uuid();
                    if (!currentAssistantId) setCurrentAssistantId(assistantId);
                    return [...prev, { id: assistantId, role: 'assistant', content, timestamp: Date.now() }];
                }
            });
        };

        const handleEnd = () => {
            setCurrentAssistantId(null);
        };

        window.addEventListener('ws-chunk', handleChunk);
        window.addEventListener('ws-end', handleEnd);

        return () => {
            window.removeEventListener('ws-chunk', handleChunk);
            window.removeEventListener('ws-end', handleEnd);
        };
    }, [currentAssistantId, setMessages]);

    const sendMessage = async (text: string) => {
        const userMsg: Message = {
            id: uuid(),
            role: "user",
            content: text,
            timestamp: Date.now()
        };
        
        setMessages((prev) => [...prev, userMsg]);
        
        const assistantId = uuid();
        setCurrentAssistantId(assistantId);

        // Map messages for context
        const history = messages.map(m => ({ role: m.role, content: m.content }));
        wsSendMessage(text, history);
    };

    const clearChat = () => {
        setMessages([]);
    };

    return (
        <ChatContext.Provider value={{ messages, sendMessage, clearChat, isStreaming, connected }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};