import React, { useState, useEffect } from "react";
import './main.css';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HistoryOutlined,
  CarOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Button, theme } from "antd";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const { Header, Sider, Content } = Layout;

const BoardUser = () => {
  const [content, setContent] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container-fluid">
      <header className="jumbotron">
        <h3> {content} </h3>{" "}
      </header>{" "}
      <Layout className="layout-height">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu 
            className="mt-menu"
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <CarOutlined />,
                label: "Order Moving",
              },
              {
                key: "2",
                icon: <HistoryOutlined />,
                label: "Order History",
              },
            ]}
          />{" "}
        </Sider>{" "}
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />{" "}
          </Header>{" "}
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            Content{" "}
          </Content>{" "}
        </Layout>{" "}
      </Layout>{" "}
    </div>
  );
};

export default BoardUser;
