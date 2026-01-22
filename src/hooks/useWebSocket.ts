import { useState, useEffect, useRef, useCallback } from "react";

export const useWebSocket = (url: string) => {
  const [connected, setConnected] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const connect = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket Connected");
      setConnected(true);
      setError(null);
      window.dispatchEvent(
        new CustomEvent("ws-status", {
          detail: { type: "connected", message: "Connected to server" },
        }),
      );
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };

    socket.onclose = () => {
      console.log("WebSocket Disconnected");
      setConnected(false);
      window.dispatchEvent(
        new CustomEvent("ws-status", {
          detail: {
            type: "disconnected",
            message: "Disconnected from server. Attempting to reconnect...",
          },
        }),
      );
      // Basic reconnection logic
      reconnectTimeoutRef.current = window.setTimeout(() => {
        console.log("Attempting to reconnect...");
        connect();
      }, 3000);
    };

    socket.onerror = (event) => {
      console.error("WebSocket Error:", event);
      setError("Connection error");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "start":
          setIsStreaming(true);
          break;
        case "chunk":
          window.dispatchEvent(
            new CustomEvent("ws-chunk", { detail: data.content }),
          );
          break;
        case "end":
          setIsStreaming(false);
          window.dispatchEvent(new CustomEvent("ws-end"));
          break;
        case "error":
          setError(data.message);
          setIsStreaming(false);
          window.dispatchEvent(
            new CustomEvent("ws-error", { detail: data.message }),
          );
          break;
      }
    };
  }, [url]);

  useEffect(() => {
    connect();
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connect]);

  const sendMessage = (text: string, history: any[]) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ text, history }));
      setIsStreaming(true);
    } else {
      setError("WebSocket is not connected");
    }
  };

  return { connected, isStreaming, error, sendMessage };
};
