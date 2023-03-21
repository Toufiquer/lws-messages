import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuthChecked } from "./hooks/useAuthChecked";
import Conversation from "./pages/Conversation/Conversation";
import Home from "./pages/Home/Home";
import Inbox from "./pages/Inbox/Inbox";
import LogIn from "./pages/LogIn/LogIn";
import Registration from "./pages/Registration/Registration";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PublicRoute from "./PublicRoute/PublicRoute";

function App() {
  const isAuthCheck = useAuthChecked();
  return isAuthCheck ? (
    <h2>Authorization Checking ...</h2>
  ) : (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/logIn"
          element={
            <PublicRoute>
              <LogIn />
            </PublicRoute>
          }
        />
        <Route
          path="/registration"
          element={
            <PublicRoute>
              <Registration />
            </PublicRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <PrivateRoute>
              <Inbox />
            </PrivateRoute>
          }
        />
        <Route
          path="/inbox/:id"
          element={
            <PrivateRoute>
              <Conversation />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
