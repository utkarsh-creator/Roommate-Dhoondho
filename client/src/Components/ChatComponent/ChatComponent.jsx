import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import Button from "@mui/material/Button";
import "./ChatComponent.css";

const ChatComponent = () => {
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const profileData = JSON.parse(localStorage.getItem("profile"));
  const location = useLocation();
  const navigate = useNavigate();
  const [isChatLoaded, setIsChatLoaded] = useState(false);
  const [scriptAppended, setScriptAppended] = useState(false);

  const loadChatScript = () => {
    const script = document.createElement("script");
    script.src = "https://tlk.io/embed.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
    setScriptAppended(true);

    return () => {
      if (scriptAppended) {
        document.body.removeChild(script);
      }
    };
  };

  useEffect(() => {
    if (location.pathname === "/chat" && profileData?.user?.username) {
      setIsChatLoaded(true);
      const cleanup = loadChatScript();
      return cleanup;
    } else {
      setIsUsernameAvailable(false);
      setIsChatLoaded(false);
    }
  }, [location.pathname, profileData, scriptAppended]);

  const handleRefresh = () => {
    setIsChatLoaded(false);
    setTimeout(() => {
      setIsChatLoaded(true);
      setScriptAppended(false);
      window.location.reload();
    }, 0);
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      {isUsernameAvailable && isChatLoaded ? (
        <div className="chat-container">
          <div id="tlkio" className="chat-container-embed" data-channel="mfc" data-theme="theme--day" data-nickname={profileData?.user?.username} style={{ width: "100%", height: "100%" }}>
            <div className="chat-container-embed">
                <Alert severity="info">Please be polite and respectful in chatroom. Thank you!</Alert>
                <br/>
                <Button variant="contained" className="refresh-button" onClick={handleRefresh}>
                Enter Chat
                </Button>
            </div>
          </div>
        </div>
      ) : (
        <Snackbar open={!isUsernameAvailable} autoHideDuration={6000}>
          <Alert severity="error">There is a problem. Please check your username.</Alert>
        </Snackbar>
      )}
      <div>
        <Footer />
      </div>
    </>
  );
};

export default ChatComponent;
