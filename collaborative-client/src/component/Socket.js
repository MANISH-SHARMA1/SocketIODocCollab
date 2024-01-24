import React, { useEffect, useState } from "react";
import io from "socket.io-client";

function Socket({ styleProp }) {
  console.log("fontChange: ", styleProp);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [collabId, setCollabId] = useState("");
  const [style, setStyle] = useState({});

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    console.log(newSocket);

    newSocket.on("connect_error", (error) => {
      console.error("Connection error", error);
    });

    newSocket.on("connect", () => {
      newSocket.emit("enter");

      newSocket.on("totalUser", (totalClient) => {
        setUsers([...users, totalClient]);
      });
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  console.log("socket", socket);

  useEffect(() => {
    socket.on("receiveCommitMessage", (message, style) => {
      setMessages((messages) => [...messages, message]);
      setStyle(style);
    });
  }, [socket]);

  const collaborate = () => {
    const validUser = users.some(() => collabId);
    if (collabId && socket && validUser) {
      socket.emit("collaborate", collabId);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (socket) {
      socket.emit("commit message", {
        collabId: collabId,
        message: text,
        style: styleProp,
      });
    }
  }

  return (
    <div>
      <div className="messages">
        {/* MESSAGE TO BE WRITTEN */}
        <form className="document" onSubmit={handleSubmit}>
          <textarea
          className="textArea"
          id="focus"
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></textarea>
          <button type="submit">Commit Change</button>
        </form>

        {/* DOCUMENT CHANGE SHOW HERE */}
        <div className="document textArea">
          {messages.map((message) => (
            <p
              style={{
                fontFamily: style.fontFamily,
                fontSize: `${style.fontSize}`,
                fontStyle: style.fontStyle,
                fontWeight: style.fontWeight,
              }}
              key={message}
            >
              {message}
            </p>
          ))}
        </div>
      </div>

      {/* SHOW ALL ID'S TO THAT USER CAN CONNECT OR COLLABORATE */}
      <div className="users">
        <select  id="user focus" onChange={(e) => setCollabId(e.target.value)} value={collabId}>
          {users?.map((userId, index) => (
            <option key={index}>{userId}</option>
          ))}
        </select>
        <button id="user" onClick={collaborate}>Collaborate</button>
      </div>
    </div>
  );
}

export default Socket;
