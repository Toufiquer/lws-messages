import { useSelector } from "react-redux";
import { useGetConversationsQuery } from "../redux/features/conversation/conversationApi";

export const useCheckExpire = () => {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  const { isSuccess } = useGetConversationsQuery(email);
  return isSuccess;
};
