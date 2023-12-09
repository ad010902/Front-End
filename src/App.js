import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout";
import OwnerMiddleware from "./middlewares/OwnerMiddleware";
import Login from "./pages/Auth/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import AuthContext from "./contexts/AuthContext";
import { AdminMenuItems, UserMenuItems } from "./constants";

const App = () => {
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    // const token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    // if (token) {
    //   const decodedJwt = JSON.parse(atob(token.split(".")[1]));
    //   if (decodedJwt.exp * 1000 < Date.now()) {
    //     user = null;
    //   }
    // }
    setUser(user);
  }, []);
  return (
    <Routes>
      <Route exact path="/sign-in" element={<Login />} />
      <Route
        path="/"
        element={<DefaultLayout menuItems={UserMenuItems} />}
      ></Route>
      <Route
        path="admin"
        element={<DefaultLayout menuItems={AdminMenuItems} />}
      >
        <Route path="" element={<OwnerMiddleware />}>
          <Route path="" element={<AdminDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
