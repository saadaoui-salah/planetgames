import { useEffect, useRef, useState } from "react";

const useWebSocket = (url: string, options?: { onMessage?: (data: any) => void; onMessages?: (data: any) => void;}) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = new WebSocket(url);
    socketRef.current = socket;

    // Connection established
    socket.onopen = () => {
      setIsConnected(true);
      console.log("WebSocket connection established.");
    };

    // Message received
    socket.onmessage = (event) => {
      let data = JSON.parse(event.data)
      if (data?.data && options?.onMessage ) {
        options.onMessage(data.data);
      } else if (data?.messages && options?.onMessages) {
        options.onMessages(data.messages);
      }
    };
    // Handle errors
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Connection closed
    socket.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket connection closed.");
    };

    return () => {
      // Cleanup on component unmount
      socket.close();
    };
  }, []);

  const sendMessage = (message: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return { isConnected, sendMessage };
};

export default useWebSocket;