import React from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

const Chats = ({ data }) => {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  const content = data
    .slice()
    .sort((a, b) => {
      if (a.timestamp < b.timestamp) {
        return -1;
      } else if (a.timestamp > b.timestamp) {
        return 1;
      } else {
        return 0;
      }
    })
    .map((i) => {
      const textJustify =
        email === i.sender.email ? "justify-end" : "justify-start";
      return (
        <Message
          key={i.timestamp}
          message={i.message}
          justifyText={textJustify}
        />
      );
    });
  return (
    <>
      <ul className="space-y-2">{content}</ul>
    </>
  );
};

export default Chats;
