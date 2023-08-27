import React from "react";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import ProfileTab from "../ProfileTab/ProfileTab";
import Newlisting from "../Listing/Listing";

const Profilepage = () => {
  return (
    <>
      <Navbar />
      <ProfileTab />
      <Newlisting />
      <Footer />
    </>
  );
};

export default Profilepage;
