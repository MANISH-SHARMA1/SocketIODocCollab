import React from "react";
import Login from "./pages/login/Login.js";
import Signup from "./pages/signup/Signup.js";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.js";
import OnlyIfNotLoggedIn from "./updateProfile/OnlyIfNotLoggedIn.js";
import RequireUser from "./updateProfile/RequireUser.js";

function App() {
  return (
    <div className="App">
      {" "}
      <Routes>
        <Route element={<RequireUser />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route element={<OnlyIfNotLoggedIn />}>
          <Route path="/" index element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
