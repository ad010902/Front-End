import { Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import {
  Breadcrumb,
  Menu,
  Layout,
  Flex,
  Avatar,
  Dropdown,
  notification,
} from "antd";
import { Typography } from "antd";
import { useContext, useEffect } from "react";
import { UserOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { MenuItemKey } from "../constants";
import { notiMessages } from "../constants/messages";
import AuthService from "../services/auth.service";

const { Header, Content, Sider } = Layout;

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

  useEffect(() => {
    if (!user && user !== undefined) {
      notification.error({
        message: notiMessages.signInYet,
        duration: 1,
      });
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
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
          <Avatar
            style={{ backgroundColor: "white", color: "black" }}
            icon={<UserOutlined />}
          >
            {user?.username?.substring(0, 1)}
          </Avatar>
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={menuItems}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
}
