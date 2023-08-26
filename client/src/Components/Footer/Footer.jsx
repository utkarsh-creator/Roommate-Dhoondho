import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer class="footer">
      <div class="footer__container">
        <div class="footer__top">
          <div>
            <h6 class="footer__title">Need Help</h6>
            <ul class="footer__list">
              <li class="footer__list-item">
                <a href="" class="footer__list-link">
                  Contact Us
                </a>
              </li>
              <li class="footer__list-item">
                <a href="" class="footer__list-link">
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
            <h6 class="footer__title">More Info</h6>
            <ul class="footer__list">
              <li class="footer__list-item">
                <a href="" class="footer__list-link">
                  Term and Conditions
                </a>
              </li>
              <li class="footer__list-item">
                <a href="" class="footer__list-link">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h6 class="footer__title">About Us</h6>
            <ul class="footer__list">
              <li class="footer__list-item"></li>
              <li class="footer__list-item"></li>
            </ul>
          </div>
        </div>

        <hr class="footer__divider" />
        <div class="footer__bottom">
          <span class="copyright">Mozilla Firefox Club, VIT</span>
        </div>
        <hr class="footer__divider" />
      </div>
    </footer>
  );
};

export default Footer;
