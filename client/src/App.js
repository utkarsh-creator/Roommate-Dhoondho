import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if(process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const App = () => {
  return (
    <Router>
      <Navbar />
      <NavTabs />
      <Footer />
    </Router>
  );
};

export default App;
