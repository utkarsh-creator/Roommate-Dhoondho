import React from "react";
import "./Footer.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div>
            <h6 className="footer__title">Contact Us</h6>
            <ul className="footer__list">
              <li className="footer__list-item">
                <a href="mailto:roommate.dhoondho@gmail.com subject=test&body=this+is+a+test" className="footer__list-link">
                  Gmail
                </a>
              </li>
              <li className="footer__list-item">
                <a href="" className="footer__list-link">
                  FAQ's
                </a>
              </li>
            </ul>
            {/* <div className="contactimages">
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
            </div> */}
          </div>
          <div>
            <h6 className="footer__title">More Info</h6>
            <ul className="footer__list">
              <li className="footer__list-item">
                <Link to="/TermsAndConditions">
                  <a href="" className="footer__list-link">
                    Term and Conditions
                  </a>
                </Link>
              </li>
              <li className="footer__list-item">
                <Link to="/PrivacyPolicy">
                  <a href="" className="footer__list-link">
                    Privacy Policy
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="footer__title">About Us</h6>
            <ul className="footer__list">
              <li className="footer__list-item">
                <Link to="/Team">
                  <a href="" className="footer__list-link">
                    Developers
                  </a>
                </Link>
              </li>
              <li className="footer__list-item">
                <Link to="/AboutMFC">
                  <a href="" className="footer__list-link">
                    Mozilla Firefox Club VIT
                  </a>
                </Link>
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
