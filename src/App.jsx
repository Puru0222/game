import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import LoginSignupComp from "./component/LoginSignupComp";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPasword from "./pages/ForgotPassword";
import VerifyEmailPass from "./pages/VerifyEmailPass";
import Dashboard from "./pages/Dashboard";
import Join from "./pages/Join";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import UpdateData from "./pages/UpdateData";
import BgmiChallange from "./pages/games/bgmi/BgmiChallange";
import FreeChallange from "./pages/games/bgmi/FreeChallange";
import CodChallange from "./pages/games/bgmi/CodChallange";
import Challenge from "./pages/games/Challenge";
import MyChallenge from "./pages/MyChallenge";
import OpenRoute from "./component/OpenRoute";
import PrivateRoute from "./component/PrivateRoute";
import Error from "./pages/Error";
import Add from "./pages/accounts/Add";
import Withdraw from "./pages/accounts/Withdraw";
import Complain from "./pages/accounts/Complain";
import PaymentForm from "./pages/accounts/PaymentForm";

const App = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col font-inter">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/loginSignup"
          element={
            <OpenRoute>
              <LoginSignupComp />
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPasword />} />
        <Route path="/verify-email-password" element={<VerifyEmailPass />} />
        <Route element={<Dashboard />}>
          {/* <Route index element={<Navigate to="/join" />} /> */}
          <Route
            path="/dashboard/join"
            element={
              <PrivateRoute>
                <Join />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/create"
            element={
              <PrivateRoute>
                <Create />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/updateData"
          element={
            <PrivateRoute>
              <UpdateData />
            </PrivateRoute>
          }
        />
        <Route
          path="/bgmichallange"
          element={
            <PrivateRoute>
              <BgmiChallange />
            </PrivateRoute>
          }
        />
        <Route
          path="/ffchallange"
          element={
            <PrivateRoute>
              <FreeChallange />
            </PrivateRoute>
          }
        />
        <Route
          path="/codchallange"
          element={
            <PrivateRoute>
              <CodChallange />
            </PrivateRoute>
          }
        />
        <Route
          path="/challenge/:uniqueSerialNumber"
          element={
            <PrivateRoute>
              <Challenge />
            </PrivateRoute>
          }
        />
        <Route
          path="/mychallenge"
          element={
            <PrivateRoute>
              <MyChallenge />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <Add />
            </PrivateRoute>
          }
        />
        <Route
          path="/Withdraw"
          element={
            <PrivateRoute>
              <Withdraw />
            </PrivateRoute>
          }
        />
        <Route
          path="/complain"
          element={
            <PrivateRoute>
              <Complain />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <PaymentForm />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
