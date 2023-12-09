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

export default function DefaultLayout({ menuItems, breadcrumbItems }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      notification.error({
        message: notiMessages.signInYet,
        duration: 1,
      });
      navigate("/sign-in");
    }
  }, [user]);

  const handleClickMenuItem = ({ key }) => {
    switch (key) {
      case MenuItemKey.signIn:
        navigate(`/${key}`);
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
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            {breadcrumbItems?.map((breadcrumbItem) => {
              return (
                <Breadcrumb.Item key={breadcrumbItem}>
                  {breadcrumbItem}
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
