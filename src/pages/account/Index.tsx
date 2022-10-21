import React, { useState } from "react";
import AccountDrawer from "./AccountDrawer";

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
import AccountSider from "./AccountSider";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapseLayout } from "../../features/ui/uiSlice";
import { useEffect } from "react";

const { Content } = Layout;
const { useBreakpoint } = Grid;
const { Title } = Typography;

const Index: React.FC = () => {
  // redux toolkit store
  const { isCollapsed, isVisibleDrawer } = useSelector(
    (store: any) => store.ui
  );
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);
  // apexchart
  const [chartOption, chartOptionSet] = useState({
    options: {},
    series: [44, 55, 41, 17, 15],
    labels: ["A", "B", "C", "D", "E"],
  });
  const [chartBar, chartBarSet] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
    labels: ["A", "B", "C", "D", "E"],
  });
  const [chartRadar, chartRadarSet] = useState({
    options: {
      plotOptions: {
        radar: {
          polygons: {
            strokeColor: "#e8e8e8",
            fill: {
              colors: ["#f8f8f8", "#fff"],
            },
          },
        },
      },
    },
    series: [
      {
        name: "Radar Series 1",
        data: [45, 52, 38, 24, 33, 10],
      },
      {
        name: "Radar Series 2",
        data: [26, 21, 20, 6, 8, 15],
      },
    ],
    labels: ["April", "May", "June", "July", "August", "September"],
  });
  // apexchart

  const screens = useBreakpoint();
  // Current break point:{" "}
  // {Object.entries(screens)
  //   .filter((screen) => !!screen[1])
  //   .map((screen) => (
  //     <Tag color="blue" key={screen[0]}>
  //       {screen[0]}
  //     </Tag>
  //   ))}
  console.log(screens);
  return (
    <Layout className="site-layout bg-gray-100 min-h-screen">
      {/* <Outlet /> */}
    </Layout>
  );
};

export default Index;
