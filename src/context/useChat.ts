import { useContext } from "react";
import { ChatContext } from "./ChatContextInstance";

export const useChat = () => {
  const checkChatContext = useContext(ChatContext);
  if (!checkChatContext)
    throw new Error("useChat must be used inside ChatProvider");
  return checkChatContext;
};
