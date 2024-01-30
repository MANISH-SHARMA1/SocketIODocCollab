import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Socket.css";

const socket = io("http://localhost:5000");

function Socket({ styleProp }) {
  const [messages, setMessages] = useState("No message yet.");
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [collabId, setCollabId] = useState("");
  const [style, setStyle] = useState({});

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      socket.emit("enter");

      socket.on("totalUser", (totalClient) => {
        setUsers(...users, totalClient);
      });
      console.log(users);
    });

  }, []);

  useEffect(() => {
    socket.on("receiveCommitMessage", (message) => {
      console.log("message: ", message.message, "style: ", message.style);
      setMessages(message.message);
      setStyle(message.style);
      console.log("messages: ", messages);
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
            style={{
              fontFamily: styleProp.fontFamily,
              fontSize: styleProp.fontSize,
              fontStyle: styleProp.fontStyle,
              fontWeight: styleProp.fontWeight,
            }}
          ></textarea>
          <button type="submit">Commit Change</button>
        </form>

        {/* DOCUMENT CHANGE SHOW HERE */}
        <div className="document textArea">
          <p
            style={{
              fontFamily: style.fontFamily,
              fontSize: style.fontSize,
              fontStyle: style.fontStyle,
              fontWeight: style.fontWeight,
            }}
          >
            {messages}
          </p>
        </div>
      </div>

      {/* SHOW ALL ID'S TO THAT USER CAN CONNECT OR COLLABORATE */}
      <div className="users">
        <select
          id=" focus"
          onChange={(e) => setCollabId(e.target.value)}
          value={collabId}
        >
          {users?.map((userId, index) => (
            <option id="user" value={userId} key={index}>
              {userId}
            </option>
          ))}
        </select>
        <button id="user" onClick={collaborate}>
          Collaborate
        </button>
      </div>
    </div>
  );
}

export default Socket;
