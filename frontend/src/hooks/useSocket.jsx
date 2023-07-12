import { useEffect, useState } from "react";

function useSocket({ url, onMessage }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket(url);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [url]);

  useEffect(() => {
    if (!socket) return;

    socket.onopen = function (event) {
      console.log("WebSocket connected");
    };

    socket.onmessage = function (event) {
      console.log("Received message:", event.data);
      if (onMessage) {
        onMessage(event.data);
      }
    };

    socket.onclose = function (event) {
      console.log("WebSocket closed");
    };

    return () => {
      socket.close();
    };
  }, [socket, onMessage]);

  return <React.Fragment />;
}

export default useSocket;
