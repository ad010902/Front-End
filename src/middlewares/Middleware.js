import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import { Role } from "../constants";
import { notification } from "antd";
import { notiMessages } from "../constants/messages";
import NoPermission from "../pages/NoPermission";

export default function Middleware({ role }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== undefined) {
      if (!user.roles?.includes(role)) {
        notification.info({
          message: notiMessages.noPermission,
          duration: 1,
        });
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      }
    }
  }, [user, navigate]);
  if (user !== undefined) {
    if (!user.roles.includes(role)) {
      return <NoPermission />;
    } else {
      return <Outlet />;
    }
  }
}
