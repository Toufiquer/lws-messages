import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../redux/features/auth/authSlice";

export const useAuthChecked = () => {
  const [isChecking, setIsChecking] = useState(true);
  const dispatch = useDispatch();
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
