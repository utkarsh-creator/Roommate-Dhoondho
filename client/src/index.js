import "./index.css";
import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import ResendVerificationMail from "./Pages/ResendVerificationMail/ResendVerificationMail";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import ResetPassword from "./Pages/ResetPassword/Reset";
import UpdatePassword from "./Pages/UpdatePassword/UpdatePassword";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Selections from "./Pages/Selections/Selections";
import { ListingContextProvider } from "./Context/listing-context";
import NeedRoom from "./Pages/NeedRoom/NeedRoom";
import Chat from "./Pages/Chat/Chat";
import ChatMobile from "./Components/ChatMobile/ChatMobile";
import store from "./store/ReduxStore";
import { Provider } from "react-redux";
import Terms from "./Pages/Terms/Terms";
const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/updatePassword",
    element: <UpdatePassword />,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
  },
  {
    path: "/resendVerificationMail",
    element: <ResendVerificationMail />,
  },
  {
    path: "/verifyEmail",
    element: <VerifyEmail />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/selections",
    element: <Selections />,
  },
  {
    path: "/need",
    element: <NeedRoom />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/chatMobile",
    element: <ChatMobile />,
  },
  {
    path: "/TermsAndConditions",
    element: <Terms />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <Fragment>
        <ListingContextProvider>
          <RouterProvider router={router} />
        </ListingContextProvider>
        <ToastContainer />
      </Fragment>
    </Provider>
  </>
);

reportWebVitals();
