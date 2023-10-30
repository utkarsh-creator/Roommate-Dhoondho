import React from "react";
import "./Footer.css";

const Footer = () => {

  return (
    <footer className="footer">
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
                <a href="https://www.instagram.com/mfc_vit/">
                  <img
                    src="./image/instalogo.png"
                    alt=""
                    style={{ width: "100%", height: "100%" }}
                  ></img>
                </a>
              </div>
              {/* <div className="contactimg">
                <img
                  src="./image/twitterlogo.png"
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                ></img>
              </div> */}
              <div className="contactimg">
                <a href="https://www.linkedin.com/company/mfcvit/mycompany/">
                <img
                  src="./image/linkedinlogo.png"
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                ></img>
                </a>
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
              <li className="footer__list-item">
                <a href="" className="footer__list-link">
                  Roommate Dhoondho
                </a>
              </li>
              <li className="footer__list-item">
                <a href="" className="footer__list-link">
                  Mozilla Firefox Club VIT
                </a>
              </li>
            </ul>
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
