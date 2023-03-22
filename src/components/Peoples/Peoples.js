import gravatarUrl from "gravatar-url";
import moment from "moment/moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetConversationsQuery } from "../../redux/features/conversation/conversationApi";
import { getParticipants } from "../../utils/getParticipants";

const Peoples = () => {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  console.log(email, " => Line No: 12");
  const { data, isLoading, isError, error } = useGetConversationsQuery(email);
  let content;
  if (isLoading && !isError) {
    content = <li className={` text-center`}>Loading...</li>;
  }
  if (!isLoading && isError) {
    content = <li className={` text-center`}>{error.message}</li>;
  }
  if (!isLoading && !isError && data.length === 0) {
    content = <li className={` text-center`}>No Conversation found.</li>;
  }
  if (!isLoading && !isError && data.length > 0) {
    content = data.map((conversation) => {
      const { id, message, timestamp, users } = conversation || {};
      const { email: participantEmail, name } = getParticipants(users, email);
      return (
        <li key={id}>
          <Link
            to={`/inbox/${id}`}
            className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
          >
            <img
              className="object-cover w-10 h-10 rounded-full"
              src={gravatarUrl(participantEmail)}
              alt="username"
            />
            <div className="w-full pb-2 hidden md:block">
              <div className="flex justify-between">
                <span className="block ml-2 font-semibold text-gray-600">
                  {name}
                </span>
                <span className="block ml-2 text-sm text-gray-600">
                  {moment(timestamp).fromNow()}
                </span>
              </div>
              <span className="block ml-2 text-sm text-gray-600">
                {message}
              </span>
            </div>
          </Link>
        </li>
      );
    });
  }
  console.log(data, email, " => Line No: 56");
  return (
    <>
      {" "}
      <ul className="overflow-auto">{content}</ul>
    </>
  );
};

export default Peoples;
