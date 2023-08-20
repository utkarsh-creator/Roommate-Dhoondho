import React from "react";
import "./Header.css";
import logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Header() {
  const { pathname } = useLocation();
  const navigation = useNavigate();
  let isLogin = pathname === "/";

  return (
    <header className="flex justify-between px-[1rem] border-b-[#BEBCBD] border-b-[1px]">
      <img
        onClick={() => {
          navigation("/");
        }}
        alt="room-mate-dhoondo-logo"
        src={logo}
        className="h-[80px] cursor-pointer "
      />
      <div className="mr-[2rem] flex justify-center items-center">
        <Link to="/">
          <button
            className={`${
              isLogin
                ? "bg-[#06105A] text-white"
                : "text-[#06105A] border-[#06105A] border-[1px]"
            } rounded-[8px] px-[2.5rem] py-[0.5rem] `}
          >
            Login
          </button>
        </Link>
        <Link to="/signUp">
          <button
            className={` ${
              !isLogin
                ? "bg-[#06105A] text-white"
                : "text-[#06105A] border-[#06105A] border-[1px]"
            } rounded-[8px] px-[2.25rem] py-[0.5rem]  ml-[2rem]`}
          >
            Sign Up
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
