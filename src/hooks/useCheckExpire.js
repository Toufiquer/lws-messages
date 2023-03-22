import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../redux/features/auth/authSlice";
import { useGetConversationsQuery } from "../redux/features/conversation/conversationApi";

export const useCheckExpire = () => {
  const [req, setReq] = useState(true);
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  const { isSuccess } = useGetConversationsQuery(email, { skip: req });
  const dispatch = useDispatch();
  useEffect(() => {
    if (email) {
      // return false;
      setReq(false);
    } else {
    }
  }, [email]);
  useEffect(() => {
    if (!isSuccess && email) {
      dispatch(userLoggedOut());
    }
    return isSuccess;
  }, [isSuccess, email, dispatch]);
};
