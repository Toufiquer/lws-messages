import gravatarUrl from "gravatar-url";
import React from "react";
import { useSelector } from "react-redux";

const Participant = ({ chat }) => {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  const participantEmail =
    email !== chat.sender.email ? chat.sender.email : chat.receiver.email;
  const participantName =
    email !== chat.sender.email ? chat.sender.name : chat.receiver.name;

  return (
    <>
      <div className="relative flex items-center p-3 border-b border-gray-300">
        <img
          className="object-cover w-10 h-10 rounded-full"
          src={gravatarUrl(participantEmail)}
          alt="username"
        />
        <span className="block ml-2 font-bold text-gray-600">
          {participantName}
        </span>
        <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
      </div>
    </>
  );
};

export default Participant;
