import React from "react";
import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../../redux/features/message/messageApi";
import Chats from "./Chats";
import Participant from "./Participant";
import SendMessage from "./SendMessage";

const Chat = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetMessagesQuery(id);
  let content;
  if (isLoading && !isError) {
    content = <h3>Loading...</h3>;
  }
  if (!isLoading && isError) {
    content = <h3>{error}</h3>;
  }
  if (!isLoading && !isError && data.length === 0) {
    content = <h3>No Message Found.</h3>;
  }
  if (!isLoading && !isError && data.length > 0) {
    content = <Chats data={data} />;
  }
  return (
    <>
      <div className="w-full grid conversation-row-grid">
        {data?.length > 0 && <Participant chat={data[0]} />}
        <div className="relative w-full p-6 overflow-y-auto">{content}</div>
        {data?.length > 0 && <SendMessage info={data[0]} />}
      </div>
    </>
  );
};

export default Chat;
