// eslint-disable-next-line
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [navbar, setHeader] = useState("navbar");

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(true);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <img src="./image/logo.png" alt="" style={{ height: "60px" }} />
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink to="/home" className="nav-links" onClick={closeMobileMenu}>
              <button className="myroomies">
                {" "}
                <span
                  className="button_icon whitespace-nowrap"
                  onClick={handleClick}
                >
                  <i
                    className={
                      click
                        ? "fa-solid fa-user-group blue"
                        : "fa-solid fa-user-group white"
                    }
                  />
                  My Roomies
                </span>
              </button>
            </NavLink>
          </li>
          <li
            className="nav-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <NavLink to="/need" className="nav-links" onClick={closeMobileMenu}>
              <button className="listing">
                {" "}
                <span className="button_icon" onClick={handleClick}>
                  <i
                    className={
                      click ? "fa-solid fa-plus blue" : "fa-solid fa-plus white"
                    }
                  />
                  Add Listing
                </span>
              </button>
            </NavLink>
          </li>
          <li className="nav-item">
            <Link
              to="/bookmarks"
              className="nav-links bookmarks"
              onClick={closeMobileMenu}
            ></Link>
          </li>
          <li className="nav-item">
            <Link
              to="/user"
              className="nav-links user"
              onClick={closeMobileMenu}
            ></Link>
          </li>
          <li className="nav-item-mobile">
            <Link
              to="/home"
              className="nav-links-mobile"
              onClick={closeMobileMenu}
            >
              My Roomies
            </Link>
          </li>
          <li className="nav-item-mobile">
            <Link
              to="/need"
              className="nav-links-mobile user"
              onClick={closeMobileMenu}
            >
              Add Listing
            </Link>
          </li>
          <li className="nav-item-mobile">
            <Link
              to="/bookmarks"
              className="nav-links-mobile bookmarks"
              onClick={closeMobileMenu}
            >
              Bookmarks
            </Link>
          </li>
          <li className="nav-item-mobile">
            <Link
              to="/user"
              className="nav-links-mobile user"
              onClick={closeMobileMenu}
            >
              Users
            </Link>
          </li>
        </ul>
      </nav>
      <hr class="hr1" />
    </>
  );
}
export default Navbar;