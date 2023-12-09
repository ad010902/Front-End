import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { Outlet } from "react-router-dom";
import NoPermission from "../pages/NoPermission";
import { Role } from "../constants";

export default function OwnerMiddleware() {
    const { user } = useContext(AuthContext);

    if (!user.roles.include(Role.owner)) {
        return <NoPermission />
    }

    return <Outlet />
}