import React, { useState } from "react";

import Chart from "react-apexcharts";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  UserOutlined,
  TeamOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  VideoCameraOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

import {
  Layout,
  Menu,
  Divider,
  MenuProps,
  Space,
  Avatar,
  AutoComplete,
  Input,
  Dropdown,
  Button,
  Badge,
  Card,
  Row,
  Col,
  Grid,
  Tag,
  Typography,
} from "antd";

import {
  Link,
  Outlet,
  useNavigate,
  useLocation,
  Navigate,
  NavLink,
} from "react-router-dom";

import type { SelectProps } from "antd/es/select";
import Navbar from "../../components/Navbar";

import { useDispatch, useSelector } from "react-redux";
import { toggleCollapseLayout } from "../../features/ui/uiSlice";
import { useEffect } from "react";

const { Content } = Layout;
const { useBreakpoint } = Grid;
const { Title } = Typography;

const Index: React.FC = () => {
  // redux toolkit store
  const { isCollapsed } = useSelector((store: any) => store.ui);
  const dispatch = useDispatch();

  const screens = useBreakpoint();
  // Current break point:{" "}
  // {Object.entries(screens)
  //   .filter((screen) => !!screen[1])
  //   .map((screen) => (
  //     <Tag color="blue" key={screen[0]}>
  //       {screen[0]}
  //     </Tag>
  //   ))}

  const styleLayout: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "transparent",
    marginLeft: !isCollapsed ? "200px" : "80px",
    transitionDelay: !isCollapsed ? "0.1s , 0.2s" : "0s",
    transitionProperty: "margin-left",
    transitionDuration: isCollapsed ? "0.21s" : "0.10s",
    transitionTimingFunction: "ease-in-out",
  };

  return (
    <Layout
      // className="site-layout bg-zinc-700  "
      className=" site-layout px-3 md:px-10 "
      style={styleLayout}
    >
      <Outlet />
    </Layout>
  );
};

export default Index;
