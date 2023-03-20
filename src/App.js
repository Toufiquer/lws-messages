import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Inbox from "./pages/Inbox/Inbox";
import LogIn from "./pages/LogIn/LogIn";
import Registration from "./pages/Registration/Registration";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>
    </div>
  );
}

export default App;
