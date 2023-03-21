import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import lwsLogoDark from "../../assets/lws-logo-dark.svg";
import { userLoggedOut } from "../../redux/features/auth/authSlice";
const Nav = () => {
  const dispatch = useDispatch();
  const handleSighOut = () => {
    dispatch(userLoggedOut());
    localStorage.setItem("auth", "");
  };
  return (
    <>
      <nav className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between h-16 items-center">
            <Link to="/">
              {" "}
              <img className="h-10" src={lwsLogoDark} alt="Logo" />
            </Link>
            <ul>
              <li className="text-white">
                <Link onClick={handleSighOut} to="/">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
