import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
// import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import DefaultLayout from "./layouts/DefaultLayout";
import OwnerMiddleware from "./middlewares/OwnerMiddleware";
import Login from "./pages/Auth/Login";

const App = () => {
  // const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      // setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    // setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <Routes>
      <Route exact path="/sign-in" element={<Login />} />
      <Route path="/" element={<DefaultLayout />}>
        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/home"} element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="/user" element={<BoardUser />} />
        <Route path="/admin" element={<OwnerMiddleware />}>
          <Route exact path="/admin" element={<BoardAdmin />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
