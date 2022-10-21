import React, { useState } from "react";

import elasticLogo from "../assets/elastic-logo.png";
import { Link, NavLink } from "react-router-dom";
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
  DashboardOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import {
  Layout,
  Menu,
  Breadcrumb,
  Divider,
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
  Typography,
  Grid,
  Tag,
  Image,
} from "antd";

import type { SelectProps } from "antd/es/select";
import type { MenuProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapseLayout } from "../features/ui/uiSlice";
import { useEffect } from "react";
const { Sider, Content } = Layout;

const sideMenus: MenuProps["items"] = [
  {
    key: "Accueil",
    icon: <DashboardOutlined />,
    label: (
      <NavLink
        // className={({ isActive }) =>
        //   isActive ? "text-red-500" : "text-gray-100"
        // }
        to="home"
      >
        Dashboard
      </NavLink>
    ),
  },
  {
    label: "Map",
    key: "rh",
    icon: <VideoCameraOutlined />,
    children: [
      {
        label: (
          <NavLink
            // className={({ isActive }) =>
            //   isActive ? "text-red-500" : "text-gray-100"
            // }
            to="finance"
          >
            Outdoor
          </NavLink>
        ),
        key: "setting:1",
      },
      {
        label: "Indoor",
        key: "setting:2",
      },
    ],
  },
  {
    label: (
      <NavLink
        // className={({ isActive }) =>
        //   isActive ? "text-red-500" : "text-gray-100"
        // }
        to="positions"
      >
        Positions
      </NavLink>
    ),
    key: "Positions",
    icon: <UploadOutlined />,
  },
  {
    label: (
      <NavLink
        // className={({ isActive }) =>
        //   isActive ? "text-red-500" : "text-gray-100"
        // }
        to="configuration"
      >
        Configuration
      </NavLink>
    ),
    key: "configuration",
    icon: <SettingOutlined />,
  },
  /* {
    label: "Projet",
    key: "projet",
    icon: <CloudOutlined />,
  },

  {
    label: "Ticketing",
    key: "ticketing",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Achats",
    key: "achat",
    icon: <TeamOutlined />,
  }, */
];

const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function Hsider() {
  const { isCollapsed } = useSelector((store: any) => store.ui);
  // console.log("isCollapsed");
  // console.log(isCollapsed);
  const dispatch = useDispatch();

  const screens = useBreakpoint();
  /* console.log(screens.lg); */

  const styleHSider: React.CSSProperties = {
    display: screens.lg ? "block" : "none",
    overflow: "auto",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
  };
  const { Title, Text, Link } = Typography;
  return (
    <Sider
      className="bg-white  text-gray-500   shadow  "
      style={styleHSider}
      trigger={null}
      collapsible
      collapsed={isCollapsed}
    >
      <div className="border-0 mx-3 pt-5 bg-white p-2 flex justify-center ">
        <Image width={20} src={elasticLogo} />
        {!isCollapsed ? (
          <Text
            strong
            className="text-blue-600 ml-2 text-lg subpixel-antialiased font-semibold
            tracking-tighter uppercase"
          >
            elastic watch
          </Text>
        ) : (
          ""
        )}
      </div>
      <Menu
        /* theme="light" */
        className="bg-tranparent text-gray-600  border-1 border-transparent"
        mode={isCollapsed ? "vertical" : "inline"}
        defaultSelectedKeys={["4"]}
        items={sideMenus}
      />
      <Card className="absolute bottom-0 left-0 border-0 bg-transparent  flex justify-start gap-x-8">
        {!isCollapsed ? (
          <Text
            strong
            className="text-blue-900 text-sm   subpixel-antialiased 
            tracking-tighter uppercase"
          >
            &copy; e-solutions {new Date().getFullYear()}
          </Text>
        ) : (
          <Text
            strong
            className="text-blue-600  text-sm subpixel-antialiased 
          tracking-tighter uppercase"
          >
            &copy; ew
          </Text>
        )}
      </Card>
    </Sider>
  );
}
