import React from "react";
import "./Roompage.css";
import Navbar from "../NavBar/Navbar";
import NavTabs from "../TabBar/NavTabs";
import Footer from "../Footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";

const Roompage = () => {
  return (
    <>
      <Navbar />
      <NavTabs />
      <Footer />
    </>
  );
};

export default Roompage;
