import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io();

    // Listen for "chat message" events
    socket.on("chat message", (msg) => {
      setChatLog((prevLog) => [...prevLog, msg]);
    });

    setSocket(socket);

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && message) {
      // Emit the "chat message" event to the server
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>WebSocket Chat</h1>
      <div>
        <ul>
          {chatLog.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
