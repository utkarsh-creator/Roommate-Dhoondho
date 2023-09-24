import React from "react";
import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [chatVisible, setChatVisible] = useState(false);
  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };
  return (
   <footer className="footer">
      <button id="chatToggle" onClick={toggleChat}>
        {chatVisible ? "Minimize Chat" : "Open Chat"}
      </button>
      <div id="chatPopup" style={{ display: chatVisible ? "block" : "none" }}>
        {chatVisible && (
          <div>
            <button id="minimizeChat" onClick={toggleChat}>
              Minimize Chat
            </button>
            <div
              id="tlkio"
              data-channel="mfc"
              data-theme="theme--day"
              style={{ width: "400px", height: "400px" }}
            ></div>
            <script
              async
              src="http://tlk.io/embed.js"
              type="text/javascript"
            ></script>
          </div>
        )}
      </div>
    
      <div className="footer__container">
        <div className="footer__top">
          <div>
            <h6 className="footer__title">Need Help</h6>
            <ul className="footer__list">
              <li className="footer__list-item">
                <a href="" className="footer__list-link">
                  Contact Us
                </a>
              </li>
              <li className="footer__list-item">
                <a href="" className="footer__list-link">
                  FAQ's
                </a>
              </li>
            </ul>
            <div className="contactimages">
              <div className="contactimg">
                <img
                  src="./image/fblogo.png"
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                ></img>
              </div>
              <div className="contactimg">
                <img
                  src="./image/instalogo.png"
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                ></img>
              </div>
              <div className="contactimg">
                <img
                  src="./image/twitterlogo.png"
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                ></img>
              </div>
              <div className="contactimg">
                <img
                  src="./image/linkedinlogo.png"
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                ></img>
              </div>
            </div>
          </div>
          <div>
            <h6 className="footer__title">More Info</h6>
            <ul className="footer__list">
              <li className="footer__list-item">
                <a href="" className="footer__list-link">
                  Term and Conditions
                </a>
              </li>
              <li className="footer__list-item">
                <a href="" className="footer__list-link">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="footer__title">About Us</h6>
            <ul className="footer__list">
              <li className="footer__list-item"></li>
              <li className="footer__list-item"></li>
            </ul>
          </div>
        </div>

        <hr className="footer__divider" />
        <div className="footer__bottom">
          <span className="copyright">Mozilla Firefox Club, VIT</span>
        </div>
        <hr className="footer__divider" />
      </div>
    </footer>
  );
};

export default Footer;
