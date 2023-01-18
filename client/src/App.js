import React, { Component } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./Components/Common/Auth/SignIn";
import SignUp from "./Components/Common/Auth/SignUp";
import ResetPassword from "./Components/Common/Auth/ForgotPassword";
import { app } from "./firebase";
import EmailBuilder from "./EmailSpamDetection/EmailBuilder";
import SpamScore from "./EmailSpamDetection/SpamScore";
class App extends Component {
  componentDidMount() {
    console.log()
  }

  render() {
    return (
      <>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<EmailBuilder />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/email-report" element={<SpamScore />} />
        </Routes>
      </>
    );
  }
}

export default App;
