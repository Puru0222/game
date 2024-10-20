import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import LoginSignupComp from "./component/LoginSignupComp";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPasword from "./pages/ForgotPassword";
import VerifyEmailPass from "./pages/VerifyEmailPass";
import Dashboard from "./pages/Dashboard";
import Join from "./pages/Join";
import Create from "./pages/Create";

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
        <Route  element={<Dashboard />} > 
          {/* <Route index element={<Navigate to="/join" />} /> */}
          <Route path="/dashboard/join" element={<Join />} />
          <Route path="/dashboard/create" element={<Create />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
