import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn, userLoggedOut } from "../redux/features/auth/authSlice";
import { useCheckExpire } from "./useCheckExpire";

export const useAuthChecked = () => {
  const [isChecking, setIsChecking] = useState(true);
  const dispatch = useDispatch();
  // const isExpire = useCheckExpire();
  // if (!isExpire) {
  //   dispatch(userLoggedOut());
  //   localStorage.setItem("auth", "");
  // }
  useEffect(() => {
    const localAuth = localStorage.getItem("auth");
    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken && auth?.user) {
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
            user: { ...auth.user },
          })
        );
      }
    }
    setIsChecking(false);
  }, [dispatch]);
  return isChecking;
};
