import React from "react";
import Chat from "../../components/Chat/Chat";

import Nav from "../../components/Nav/Nav";
import Peoples from "../../components/Peoples/Peoples";
import Modal from "../../components/Modal/Modal";
const Conversation = () => {
  return (
    <>
      {" "}
      <div>
        <Nav />
        <div className="max-w-7xl mx-auto -mt-1">
          <div className="min-w-full border rounded flex lg:grid lg:grid-cols-3">
            <div className="w-[100px] border-r border-t-0 border-gray-300 lg:col-span-1 md:w-full">
              <Modal />
              <Peoples />
            </div>
            <div className="w-full lg:col-span-2 lg:block">
              <Chat></Chat>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversation;
