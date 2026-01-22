import React, { useEffect, useState, useRef } from "react";

const useWebScoket = (onMessage: (data: string) => void) => {
  const ws = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const url = import.meta.env.VITE_WS_URL;
    if (!url) return;

    const connect = () => {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        console.log("WebSocket Connected");
        setConnected(true);
        setRetryCount(0);
      };

      ws.current.onclose = () => {
        console.log("WebSocket Disconnected");
        setConnected(false);
        // Simple reconnection logic
        setTimeout(() => {
          setRetryCount((prev) => prev + 1);
        }, 3000);
      };

      ws.current.onerror = (err) => {
        console.error("WebSocket Error:", err);
        ws.current?.close();
      };

      ws.current.onmessage = (event) => {
        onMessage(event.data);
      };
    };

    connect();

    return () => {
      if (ws.current) {
        ws.current.onclose = null; // Prevent retry on manual close
        ws.current.close();
      }
    };
  }, [onMessage, retryCount]);

  const send = (message: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    } else {
      console.warn("WebSocket not open. State:", ws.current?.readyState);
    }
  };

  return { send, connected };
};

export default useWebScoket;
