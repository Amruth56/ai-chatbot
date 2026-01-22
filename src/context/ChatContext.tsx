import { createContext, useContext, useState } from "react";
import type { Message, ChatContextType } from "../types/chat";
import { v4 as uuid } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = useLocalStorage<Message[]>("chat", []);
    const [isStreaming, setisStreaming] = useState(false);
    const [connected] = useState(true); // Always true for direct API calls

    const sendMessage = async (text: string) => {
        const userMsg: Message = {
            id: uuid(),
            role: "user",
            content: text,
            timestamp: Date.now()
        };
        
        setMessages((prev) => [...prev, userMsg]);
        setisStreaming(true);

        const apiKey = import.meta.env.VITE_OPEN_ROUTER_API_KEY;
        if (!apiKey) {
            throw new Error("VITE_OPEN_ROUTER_API_KEY is missing in your .env file. Please add it and restart the server.");
        }

        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:5173",
                    "X-Title": "AI Chatbot"
                },
                body: JSON.stringify({
                    model: "tngtech/deepseek-r1t2-chimera:free",
                    messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
                    stream: true
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || "API request failed");
            }
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantMessageContent = "";
            const assistantId = uuid();
            let messageAdded = false;

            while (true) {
                const { done, value } = await reader!.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split("\n");

                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        const data = line.slice(6);
                        if (data === "[DONE]") continue;
                        try {
                            const json = JSON.parse(data);
                            const content = json.choices[0]?.delta?.content || "";
                            
                            if (content) {
                                assistantMessageContent += content;
                                
                                if (!messageAdded) {
                                    setMessages((prev) => [
                                        ...prev,
                                        { id: assistantId, role: "assistant", content: assistantMessageContent, timestamp: Date.now() }
                                    ]);
                                    messageAdded = true;
                                } else {
                                    setMessages((prev) => {
                                        const last = prev[prev.length - 1];
                                        if (last && last.id === assistantId) {
                                            return [
                                                ...prev.slice(0, -1),
                                                { ...last, content: assistantMessageContent }
                                            ];
                                        }
                                        return prev;
                                    });
                                }
                            }
                        } catch (e) {
                            console.error("Error parsing JSON chunk", e);
                        }
                    }
                }
            }
        } catch (error: any) {
            console.error("Chat Error:", error);
            const errorMsg: Message = {
                id: uuid(),
                role: "assistant",
                content: error.message || "Error: Could not connect to the AI. Please check your API key and connection.",
                timestamp: Date.now()
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setisStreaming(false);
        }
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