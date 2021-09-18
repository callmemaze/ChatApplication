import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Messages/Message";

import "./style/Message.css";

const Messages = ({ messages, userName }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} userName={userName} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
