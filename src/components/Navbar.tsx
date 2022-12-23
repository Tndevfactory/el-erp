import React, { useState, useRef } from "react";
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
  MenuOutlined,
  SearchOutlined,
  BellOutlined,
  AudioOutlined,
  ExportOutlined 
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  MenuProps,
  Space,
  Avatar,
  Input,
  Dropdown,
  Badge,
  Grid,
  Typography,
  Affix,
} from "antd";
import type { SelectProps } from "antd/es/select";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCollapseLayout,
  showDrawer,
  selectModule,
  changeWidth,
} from "../features/ui/uiSlice";
import { useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
// profil menu

import Hsider from "./Hsider";
import HSiderMobile from "./HSiderMobile";

const profilMenu = (
  <Menu
    items={[
      // {
      //   key: "1",
      //   icon:<UserOutlined/>,
      //   label: <Link to="#"> Chawki Barhoumi</Link>,
      // },
      // {
      //   key: "2",
      //   icon:<ExportOutlined/>,
      //   label: <Link to="#">Déconnexion</Link>,
      //   onClick: () => alert("test logout"),
      // },
      {
        key: "1",
        icon:<UserOutlined/>,
        label: <Link to="#"> Commerciale</Link>,
        onClick: () => localStorage.setItem("role", "commerciale"),
      },
      {
        key: "2",
        icon:<UserOutlined/>,
        label: <Link to="#">Chef</Link>,
        onClick: () => localStorage.setItem("role", "chef"),
      },      {
        key: "3",
        icon:<UserOutlined/>,
        label: <Link to="#"> DAF</Link>,
        onClick: () => localStorage.setItem("role", "daf"),
      },
    ]}
  />
);
const notificationsMenu = (
  <Menu
    items={[
      {
        key: "1",
        label: <Link to="#"> Notification de mesure S1</Link>,
      },
      {
        key: "2",
        label: <Link to="#"> Notification de mesure S2</Link>,
      },
      {
        key: "3",
        label: <Link to="#">Notification de mesure S3</Link>,
        onClick: () => console.log("Notification de mesure "),
      },
      {
        key: "4",
        label: <Link to="#">Notification de mesure S4</Link>,
        onClick: () => console.log("Notification de mesure "),
      },
      {
        key: "5",
        label: <Link to="#">Notification de mesure S5</Link>,
        onClick: () => console.log("Notification de mesure "),
      },
    ]}
  />
);
// end profil menu
// ---------Search
const getRandomInt = (max: number, min = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// --------end-Search

const { useBreakpoint } = Grid;

export default function Navbar() {
  // redux toolkit store
  const { isCollapsed, menu, selectedModule, windowWidth } = useSelector(
    (store: any) => store.ui
  );
  const dispatch = useDispatch();

  const [visibleMenuMobile, setVisibleMenuMobile] = useState(false);

  const { Header } = Layout;
  const screens = useBreakpoint();

  React.useEffect(() => {
    const handleWindowResize = () => {
      dispatch(changeWidth({ width: window.innerWidth }));
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [screens]);

  let location = useLocation();

  const styleHeaderDesktop: React.CSSProperties = {
    marginLeft: !isCollapsed ? "200px" : "80px",
  };

  const handleSelectModule = (info) => {
    localStorage.setItem("module", info.key);
    window.dispatchEvent(new Event("storage"));
  };

  const ws = useRef(null);

  // useEffect(() => {
  //     ws.current = new WebSocket("wss://socketsbay.com/wss/v2/1/demo/12");
  //     ws.current.onopen = () => console.log("ws opened");
  //     ws.current.onclose = () => console.log("ws closed");

  //     const wsCurrent = ws.current;

  //     return () => {
  //         wsCurrent.close();
  //     };
  // }, []);

  // useEffect(() => {
  //     if (!ws.current) return;

  //     ws.current.onmessage = e => {
  //         console.log(e.data);
  //     };
  // }, []);

  return (
    <Affix offsetTop={0}>
      <div>
        <Header
          className="header-desktop site-layout-background border-b-2  border-gray-200 
        sticky top-0 z-50 s bg-white text-gray-500"
          style={styleHeaderDesktop}
        >
          <Space>
            {React.createElement(
              isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => dispatch(toggleCollapseLayout()),
              }
            )}
            <Menu
              disabledOverflow={true}
              theme="light"
              mode="horizontal"
              selectedKeys={[localStorage.getItem("module")]}
              onClick={handleSelectModule}
              // items={navbarItems}
            >
              {menu.map((item, index) => (
                <Menu.Item key={item.id}>
                  <NavLink to={item.link}>{item.designation_fr}</NavLink>
                </Menu.Item>
              ))}
            </Menu>
          </Space>
          <Space direction="horizontal">
            <Space wrap onClick={() => {}}>
              <SearchOutlined
                className="text-md border-2 rounded-full p-1 cursor-pointer
              border-gray-400  hover:border-blue-500   transition ease-in duration-200"
              />
            </Space>
            <Space wrap>
              <Dropdown overlay={notificationsMenu} placement="bottomLeft">
                <Badge size="default" count={5}>
                  <BellOutlined
                    className="text-md border-2 rounded-full p-1 cursor-pointer
                  border-gray-400  hover:border-blue-500   transition ease-in duration-200"
                  />
                </Badge>
              </Dropdown>
            </Space>
            <Space wrap>
              <Dropdown overlay={profilMenu} placement="bottomLeft">
                <UserOutlined
                  className="text-md border-2 rounded-full p-1 cursor-pointer
                border-gray-400  hover:border-blue-500    transition ease-in duration-200"
                />
              </Dropdown>
            </Space>
          </Space>
        </Header>

        {/* mobile menu header  */}
        <Header
          className="header-mobile site-layout-background site-layout-background border-b-2  border-gray-200 
        sticky top-0 z-50 s bg-white text-gray-500"
          style={{ height: "48px" }}
        >
          <Space size="small" className="trigger_menu mobile-menu">
            <MenuOutlined
              className="ml-3"
              onClick={() => setVisibleMenuMobile(true)}
            />

            <span className="text-white">ERP SAAS</span>
          </Space>

          <Space direction="vertical">
            <Space wrap>
              <Dropdown overlay={profilMenu} placement="bottomLeft">
                <Avatar className="border-gray-200" size={32} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              </Dropdown>
            </Space>
          </Space>
        </Header>

        <Hsider />
        <HSiderMobile
          visible={visibleMenuMobile}
          setVisible={setVisibleMenuMobile}
        />
      </div>
    </Affix>
  );
}
