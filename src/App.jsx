import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/SignIn/SignIn";
import { Upload } from "./pages/Upload/Upload";
import { SignUp } from "./pages/SignUp/SignUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home } from "./pages/Home/Home";
import { UserContextProvider } from "./Context/UserContext";
import { PasswordRecovery } from "./pages/PasswordRecovery/PasswordRecovery";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";

export const App = () => {
  return (
    <>
      <Router>
        <UserContextProvider>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<SignIn />} />
            <Route path="/Register" element={<SignUp />} />
            <Route path="/Upload" element={<Upload />} />
            <Route path="/RecoverPassword" element={<PasswordRecovery />} />
            <Route path="/ResetPassword/:token" element={<ResetPassword />} />
          </Routes>
        </UserContextProvider>
      </Router>
    </>
  );
};
