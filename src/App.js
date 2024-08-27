import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TestSelector from "./components/TestSelector";
import StartTest from "./components/StartTest";
import Result from "./components/Result";
import ChangePassword from "./components/ChangePassword";
import MyProfile from "./components/MyProfile";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/dashoff" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/myprofile" Component={MyProfile} />
        <Route path="/test" Component={TestSelector} />
        <Route path="/changepassword" Component={ChangePassword} />
        <Route path="/test/1-min" element={<StartTest url="1-min" />} />
        <Route path="/test/3-min" element={<StartTest url="3-min" />} />
        <Route path="/test/5-min" element={<StartTest url="5-min" />} />
        <Route path="/test/result" Component={Result} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;