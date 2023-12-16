import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { Menu, Layout, Avatar, Dropdown, notification, Flex } from "antd";
import { Typography } from "antd";
import { useContext, useEffect, useMemo, useState } from "react";
import { UserOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { MenuItemKey } from "../constants";
import { notiMessages } from "../constants/messages";
import AuthService from "../services/auth.service";

const { Header, Sider } = Layout;

const guessAuthMenu = [
  {
    key: MenuItemKey.signIn,
    label: "Đăng nhập",
    icon: <LoginOutlined />,
  },
];

const authMenu = [
  {
    key: MenuItemKey.signOut,
    label: "Đăng xuất",
    icon: <LogoutOutlined />,
  },
];

export default function DefaultLayout({ menuItems }) {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const selectingMenuItem = useMemo(() => {
    const currentKeys = location.pathname.split("/");

    return currentKeys[currentKeys.length - 1];
  }, [location]);

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user]);

  const handleClickMenuItem = async ({ key }) => {
    switch (key) {
      case MenuItemKey.signIn:
        navigate(`/${key}`);
        break;
      case MenuItemKey.signOut:
        try {
          await AuthService.logout();
          localStorage.removeItem("user");
          setUser(null);
          navigate("/sign-in");
        } catch (error) {
          notification.error({
            message: notiMessages.error,
          });
        }
        break;
      default:
        break;
    }
  };

  const handleClickPageMenu = ({ key }) => {
    navigate(key);
  };
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "fixed",
          top: 0,
          width: "100vw",
          zIndex: 2,
        }}
      >
        <Typography.Title style={{ color: "white" }}>
          Magic Post
        </Typography.Title>
        <Dropdown
          menu={{
            items: user ? authMenu : guessAuthMenu,
            onClick: handleClickMenuItem,
          }}
        >
          <Flex align="center" gap={8}>
            <Typography.Text style={{ color: "white" }}>
              {user.username}
            </Typography.Text>
            <Avatar
              style={{ backgroundColor: "white", color: "black" }}
              icon={<UserOutlined />}
            >
              {user?.username?.substring(0, 1)}
            </Avatar>
          </Flex>
        </Dropdown>
      </Header>
      <Layout style={{ marginTop: "64px" }}>
        <Sider
          width={200}
          style={{ height: "calc(100vh - 64px)", position: "sticky", top: 64 }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[selectingMenuItem]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={menuItems}
            onClick={handleClickPageMenu}
          />
        </Sider>
        <Layout
          style={{
            padding: "24px 24px",
          }}
        >
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
}
