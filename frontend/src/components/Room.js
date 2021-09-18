import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";
import Bar from "./Bar";
import Messages from "./Messages";
import Input from "./Input";
import "./style/Chat.css";
let socket;

const Room = ({ location }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [user, setUser] = useState("");
  const [users, setUsers] = useState("");
  const [room, setRoom] = useState("");
  const BASEURL = "localhost:5000";
  useEffect(() => {
    const { userName, room } = queryString.parse(location.search);
    socket = io(BASEURL);
    setUser(userName);
    setRoom(room);
    socket.emit("join", { userName, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [BASEURL, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", (users) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  console.log(message, messages);
  return (
    <div className="outerContainer">
      <div className="container">
        <Bar room={room} />
        <Messages messages={messages} userName={user} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Room;
