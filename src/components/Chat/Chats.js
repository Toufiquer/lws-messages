import React from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

const Chats = ({ data }) => {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  const content = data.map((i) => {
    const textJustify =
      email === i.sender.email ? "justify-end" : "justify-start";
    console.log(email === i.sender.email, email, i.sender, " => Line No: 12");
    return <Message key={i.id} message={i.message} justifyText={textJustify} />;
  });
  return (
    <>
      <ul className="space-y-2">{content}</ul>
    </>
  );
};

export default Chats;
