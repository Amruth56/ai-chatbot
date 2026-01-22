import React, {useEffect, useState, useRef} from 'react'

const useWebScoket = (onMessage: (data: string) => void) => {
    const ws = useRef<WebSocket| null>(null);
    const[connected, setConnected] = useState(false);

    useEffect(() => {

        ws.current = new WebSocket(import.meta.env.VITE_WS_URL);

        ws.current.onopen = () => setConnected(true);
        ws.current.onclose = () => setConnected(false);

        ws.current.onmessage = (event) => {
            onMessage(event.data);
        };
        return () => ws.current?.close();
    }, [])

    const send = (message: string) => {
        if(ws.current?.readyState === WebSocket.OPEN){
            ws.current.send(message);
        }
    };

    return {send, connected};



}

export default useWebScoket