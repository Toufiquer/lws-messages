import React from "react";

const Message = ({ message, justifyText }) => {
  return (
    <>
      <li className={`flex ${justifyText}`}>
        <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
          <span className="block">{message}</span>
        </div>
      </li>
    </>
  );
};

export default Message;
