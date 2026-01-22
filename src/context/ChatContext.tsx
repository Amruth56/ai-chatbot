import {useState, useContext, createContext} from "react";
import type { ChatContextType, Message } from "../types/chat"
import { v4 as uuid} from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
import useWebScoket from "../hooks/useWebScoket";



const ChatContext = createContext<ChatContextType | null>(null);
 
export const ChatProvider = ({children} : {children: React.ReactNode}) => {
    const [messages, setMessages] = useLocalStorage<Message[]>("chat", []);
    const [isStreaming, setisStreaming] = useState(false);


    const {send, connected} = useWebScoket((chunk) => {
        setisStreaming(true);

        setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.role === "assistant") {
                const updatedLast = { 
                    ...last, 
                    content: last.content + chunk 
                };
                return [...prev.slice(0, -1), updatedLast];
            }
            return [
                ...prev,
                {
                    id: uuid(),
                    role: "assistant",
                    content: chunk,
                    timestamp: Date.now()
                }
            ];
        });


        if(chunk == "[DONE]"){
            setisStreaming(false);
        }
    });

    const sendMessage = (text: string) => {
        const userMsg: Message = {
            id: uuid(),
            role:"user",
            content: text,
            timestamp: Date.now()
        };
        setMessages((prev) => [...prev, userMsg]);
        send(text);
    }

    const clearChat = () => {
        setMessages([]);
    }

    return(
        <ChatContext.Provider value={{messages, sendMessage, clearChat, isStreaming, connected}}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const checkChatContext = useContext(ChatContext);
    if(!checkChatContext) throw new Error("useChat must be used inside ChatProvider");
    return checkChatContext;
}