import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Avatar,
  Dropdown,
  Row,
  Col,
  Card,
  notification,
} from "antd";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DeleteOutlined,
  PlusOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import Router from "next/router";
import { getCookie, signout } from "../actions/auth";
import File from "./File";
import { uploadFile, getAllFiles } from "../actions/file";

const { SubMenu } = Menu;
const { Meta } = Card;
const { Header, Content, Sider } = Layout;

const Lay = () => {
  const [collapsed, setCollapsed] = useState(false);
  const token = getCookie("token");
  const [files, setValues] = useState([]);

  useEffect(() => {
    getAllFiles(token).then((data) => {
      setValues(data.data);
    });
  }, []);
  const openNotification = (data) => {
    const args = {
      message: data,
      duration: 4.5,
    };
    notification.open(args);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          rel="noopener noreferrer"
          href="#"
          onClick={() => signout(() => Router.replace("/login"))}
        >
          Sign out
        </a>
      </Menu.Item>
    </Menu>
  );

  const handleChange = async (e) => {
    const form_data = new FormData();
    form_data.append("file", e.target.files[0]);
    form_data.append("filename", e.target.value);
    await uploadFile(form_data, token).then((data) => {
      openNotification(data.message);
      setValues(data.files);
    });
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo">Drive</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          {/* <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item> */}
          <Dropdown overlay={menu} placement="bottomRight">
            <Avatar
              style={{
                backgroundColor: "#87d068",
                float: "right",
                marginTop: "15px",
              }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        </Menu>
      </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={200}
          collapsedWidth={50}
          className="site-layout-background"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="1">
              Dashboard
            </Menu.Item>
            <Menu.Item icon={<DeleteOutlined />} key="2">
              Trash
            </Menu.Item>
            {/* <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<NotificationOutlined />}
              title="subnav 3"
            >
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu> */}
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <div style={{ display: "flex", margin: "16px 0" }}>
            {collapsed ? (
              <MenuUnfoldOutlined
                className="collapse-button trigger"
                onClick={() => setCollapsed(!collapsed)}
              />
            ) : (
              <MenuFoldOutlined
                className="collapse-button trigger"
                onClick={() => setCollapsed(!collapsed)}
              />
            )}
            {/* <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
          </div>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: "100vh",
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={6} key={0}>
                <Card
                  hoverable
                  style={{ textAlign: "center" }}
                  cover={
                    <PlusOutlined
                      style={{ fontSize: "200px", color: "#1750b6" }}
                    />
                  }
                >
                  <Meta title="Upload" />
                  <input
                    type="file"
                    className="ipload"
                    onChange={(e) => handleChange(e)}
                  />
                </Card>
              </Col>
              {files.map((file, i) => {
                return (
                  <Col span={6} key={i}>
                    <File file={file} setValues={setValues}/>
                  </Col>
                );
              })}
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Lay;
