import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useEditConversationMutation } from "../../redux/features/conversation/conversationApi";
import { useGetUserQuery } from "../../redux/features/user/userApi";

const SendMessage = ({ info }) => {
  const [editConversation, {}] = useEditConversationMutation();
  const [writeMessage, setWriteMessage] = useState("");
  const {
    user: { email: myEmail },
  } = useSelector((state) => state.auth) || {};
  const handleSubmit = (e) => {
    e.preventDefault();
    const myInfo = myEmail === info.sender.email ? info.sender : info.receiver;
    const participantInfo =
      myEmail !== info.sender.email ? info.sender : info.receiver;
    const data = {
      participants: `${participantInfo.email}-${myEmail}`,
      users: [myInfo, participantInfo],
      message: writeMessage,
      timestamp: new Date().getTime(),
    };
    // edit conversation
    editConversation({
      id: info?.conversationId,
      data: { ...data },
      sender: myEmail,
    });
    setWriteMessage("");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
          {" "}
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Message"
            className="block w-full py-2 pl-4 mx-3 bg-gray-100 focus:ring focus:ring-violet-500 rounded-full outline-none focus:text-gray-700"
            name="message"
            required
            value={writeMessage}
            onChange={(e) => setWriteMessage(e.target.value)}
          />
          <button type="submit">
            <svg
              className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </form>
    </>
  );
};

export default SendMessage;
