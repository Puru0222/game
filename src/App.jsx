import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import LoginSignupComp from "./component/LoginSignupComp";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPasword from "./pages/ForgotPassword";
import VerifyEmailPass from "./pages/VerifyEmailPass";

const App = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col font-inter">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/loginSignup" element={<LoginSignupComp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPasword />} />
        <Route path="/verify-email-password" element={<VerifyEmailPass />} />
      </Routes>
    </div>
  );
};

export default App;
