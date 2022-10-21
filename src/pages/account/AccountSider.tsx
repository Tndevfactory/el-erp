import React, { useState } from "react";

import Chart from "react-apexcharts";
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
} from "@ant-design/icons";

import {
  Layout,
  Menu,
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
} from "antd";

import type { SelectProps } from "antd/es/select";
import type { MenuProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapseLayout } from "../../features/ui/uiSlice";
import { useEffect } from "react";
const { Sider, Content } = Layout;

const RhSideMenus: MenuProps["items"] = [
  {
    key: "Accueil",
    icon: <UserOutlined />,
    label: (
      <NavLink
        // className={({ isActive }) =>
        //   isActive ? "text-red-500" : "text-gray-100"
        // }
        to="account1"
      >
        Gestion des contrats
      </NavLink>
    ),
  },
  {
    label: "Ressource humaine",
    key: "rh",
    icon: <VideoCameraOutlined />,
    children: [
      {
        label: "Recrutement",
        key: "setting:1",
      },
      {
        label: "Prime annuelle",
        key: "setting:2",
      },
    ],
  },
  {
    label: "Immobilisation",
    key: "Immobilisation",
    icon: <UploadOutlined />,
  },
  {
    label: "Finance",
    key: "finance",
    icon: <BarChartOutlined />,
  },
  {
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
  },
];

const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function HomeSider() {
  const { isCollapsed } = useSelector((store: any) => store.ui);
  console.log("isCollapsed");
  console.log(isCollapsed);

  const dispatch = useDispatch();

  const screens = useBreakpoint();
  console.log(screens.lg);
  return (
    <>
      <Sider
        className="bg-slate-blue text-yellow-50"
        style={{
          display: screens.lg ? "block" : "none",
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        trigger={null}
        collapsible
        collapsed={isCollapsed}
      >
        <div
          className="logo"
          style={{
            backgroundColor: "transparent",
            padding: "1rem",
            height: "auto",
            color: "white",
          }}
        >
          <Badge.Ribbon text={isCollapsed ? "RH" : "Ressource humaine"}>
            <Card title={` `} size="small">
              <Title level={5}>
                {isCollapsed ? "ES" : "Elastic-solutions"}
              </Title>
            </Card>
          </Badge.Ribbon>
        </div>
        <Menu
          theme="dark"
          mode={isCollapsed ? "vertical" : "inline"}
          defaultSelectedKeys={["4"]}
          items={RhSideMenus}
        />
      </Sider>
    </>
  );
}
