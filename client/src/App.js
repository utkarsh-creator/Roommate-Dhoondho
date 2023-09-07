import React from "react";
import "./App.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import ChangePassword from "./Pages/ChangePassword/Change";
import ResetPassword from "./Pages/ResetPassword/Reset";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Selections from "./Pages/Selections/Selections";
import NeedRoom from "./Pages/NeedRoom/NeedRoom";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="signIn" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../signIn" />}
        />
        <Route
          path="/signIn"
          element={user ? <Navigate to="../home" /> : <SignIn />}
        />
        <Route
          path="/signUp"
          element={user ? <Navigate to="../home" /> : <SignUp />}
        />
        <Route
          path="/changePassword"
          element={user ? <ChangePassword /> : <ChangePassword />}
        />
        <Route
          path="/resetPassword"
          element={user ? <Navigate to="../home" /> : <ResetPassword />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <SignIn />}
        />
        <Route
          path="/selections"
          element={user ? <Selections /> : <SignIn />}
        />
        <Route
          path="/need"
          element={user ? <NeedRoom /> : <SignIn />}
        />
       
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>404 Error!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;