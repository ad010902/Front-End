import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout";
import Middleware from "./middlewares/Middleware";
import Login from "./pages/Auth/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import AuthContext from "./contexts/AuthContext";
import Dashboard from "./pages/DashBoard";
import {
  AdminMenuItems,
  ManagerTransMenuItems,
  Role,
  TellerMenuItems,
  UserMenuItems,
} from "./constants";
import TransLocalManage from "./pages/Admin/TransLocalManage";
import AccountsManage from "./pages/Admin/AccountsManage";
import TellersManage from "./pages/TransPointLeader/TellersManage";
import OrdersManage from "./pages/Teller/OrdersManage";

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
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);
  return (
    <Routes>
      {" "}
      {/* <Route exact path="/sign-up" element={<SignUp />} /> */}{" "}
      <Route exact path="/sign-in" element={<Login />} />{" "}
      <Route
        path="/"
        element={<DefaultLayout menuItems={UserMenuItems} />}
      ></Route>{" "}
      <Route
        path="admin"
        element={<DefaultLayout menuItems={AdminMenuItems} />}
      >
        <Route path="" element={<Middleware role={Role.owner} />}>
          {" "}
          <Route path="diem-tap-ket" element={<AdminDashboard />} />{" "}
          <Route path="diem-giao-dich" element={<TransLocalManage />} />{" "}
          <Route path="tai-khoan" element={<AccountsManage />} />{" "}
        </Route>{" "}
      </Route>{" "}
      <Route
        path="manager-trans"
        element={<DefaultLayout menuItems={ManagerTransMenuItems} />}
      >
        <Route path="" element={<Middleware role={Role.managerTrans} />}>
          {" "}
          <Route path="giao-dich-vien" element={<TellersManage />} />{" "}
        </Route>{" "}
      </Route>{" "}
      <Route
        path="giao-dich-vien"
        element={<DefaultLayout menuItems={TellerMenuItems} />}
      >
        <Route element={<Middleware role={Role.staffTrans} />}>
          {" "}
          <Route path="don-hang" element={<OrdersManage />} />{" "}
        </Route>{" "}
      </Route>{" "}
    </Routes>
  );
};

export default App;
