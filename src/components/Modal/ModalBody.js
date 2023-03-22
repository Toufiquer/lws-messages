import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  conversationApi,
  useAddConversationMutation,
  useEditConversationMutation,
  useGetConversationQuery,
} from "../../redux/features/conversation/conversationApi";
import { useGetUserQuery } from "../../redux/features/user/userApi";
import { isValidEmail } from "../../utils/isValidEmail";

const ModalBody = ({ handleModal }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [req, setReq] = useState(true);
  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { email: myEmail } = loggedInUser || {};
  const dispatch = useDispatch();
  const [conversation, setConversation] = useState(undefined);
  const {
    data: participant,
    isLoading,
    isError,
    error,
  } = useGetUserQuery(email, {
    skip: req,
  });
  const [addConversation, {}] = useAddConversationMutation();
  const [editConversation, {}] = useEditConversationMutation();
  useEffect(() => {
    if (participant?.length > 0 && participant[0].email !== myEmail) {
      // check conversation exist
      dispatch(
        conversationApi.endpoints.getConversation.initiate({
          email: myEmail,
          participantEmail: email,
        })
      )
        .unwrap()
        .then((data) => {
          setConversation(data);
        })
        .catch((err) => console.log(err));
    }
  }, [participant, dispatch, myEmail, email]);

  const debounceHandler = (fn, delay) => {
    let timeOutId;
    return (...args) => {
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  const doSearch = (value) => {
    const email = value.target.value;
    const isValid = isValidEmail(email);
    if (isValid) {
      setEmail(email);
      setReq(false);
    }
  };
  const handleSearch = debounceHandler(doSearch, 500);
  const handleSubmit = (e) => {
    const data = {
      participants: `${email}-${myEmail}`,
      users: [loggedInUser, participant[0]],
      message: message,
      timestamp: new Date().getTime(),
    };
    e.preventDefault();
    if (conversation.length === 0) {
      // add conversation
      addConversation({
        sender: myEmail,
        data: { ...data },
      });
    } else {
      // edit conversation
      editConversation({
        id: participant[0].id,
        data: { ...data },
        sender: myEmail,
      });
    }
    // handleModal();
  };
  return (
    <>
      <div
        className={`z-50 h-screen w-full flex items-center justify-center bg-slate-300 fixed top-0 left-0`}
      >
        <form className={` w-[600px]`} onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
              // value={email}
              onChange={handleSearch}
            />
          </div>

          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button
            type="submit"
            disabled={
              conversation === undefined ||
              (participant?.length > 0 && participant[0].email === myEmail)
            }
            className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Send Message
          </button>
          <button
            onClick={() => handleModal()}
            className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2"
          >
            Close
          </button>
          {participant?.length === 0 && <h2>Email doesn't exist.</h2>}
          {participant?.length > 0 && participant[0].email === myEmail && (
            <h2>con't send email to your self</h2>
          )}
        </form>
      </div>
    </>
  );
};

export default ModalBody;
