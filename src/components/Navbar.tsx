import React, { useState } from "react";
import { compareAsc, format } from "date-fns";

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
  MessageOutlined,
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
  Drawer,
} from "antd";
const { Content } = Layout;
import type { SelectProps } from "antd/es/select";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapseLayout, showDrawer } from "../features/ui/uiSlice";
import { useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
// profil menu

import Hsider from "./Hsider";

const profilMenu = (
  <Menu
    items={[
      {
        key: "1",
        label: <Link to="#"> Chawki Barhoumi</Link>,
      },
      {
        key: "2",
        label: <Link to="#">Déconnexion</Link>,
        onClick: () => alert("test logout"),
      },
    ]}
  />
);
const chatMenu = (
  <Menu
    items={[
      {
        key: "1",
        label: <Link to="#"> Public room</Link>,
      },
      {
        key: "2",
        label: <Link to="#"> Responsable Maintenance Mohamed Amine ...</Link>,
      },
      {
        key: "3",
        label: <Link to="#"> Technicien IOT Mehdi ...</Link>,
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

const searchResult = (query: string) =>
  new Array(getRandomInt(5))
    .join(".")
    .split(".")
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              Found {query} on{" "}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });
// --------end-Search

const navbarItems: MenuProps["items"] = [
  {
    label: "Accueil",
    key: "Accueil",
    icon: <UserOutlined />,
  },
  {
    label: "Ressource humaine",
    key: "rh",
    icon: <VideoCameraOutlined />,
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
    children: [
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
    ],
  },
];
const navbarMobile: MenuProps["items"] = [
  {
    label: "Elastic mobile",
    key: "Accueil",
    icon: <UserOutlined />,
  },
  {
    label: "Ressource humaine",
    key: "rh",
    icon: <VideoCameraOutlined />,
  },
];
const { useBreakpoint } = Grid;

export default function Navbar() {
  // redux toolkit store
  const { isCollapsed } = useSelector((store: any) => store.ui);
  const dispatch = useDispatch();

  // --- search
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    console.log("onSelect", value);
  };
  // --- endsearch

  const { Header } = Layout;
  const screens = useBreakpoint();
  // console.log(screens.lg);

  React.useEffect(() => {
    // console.log(screens);
  }, [screens]);

  const [dateElastic, setDateElastic] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDateElastic(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  let location = useLocation();

  /*  console.log(location.pathname); */

  const styleHeaderDesktop: React.CSSProperties = {
    marginLeft: !isCollapsed ? "200px" : "80px",
  };
  const [openSearch, setOpenSearch] = useState(false);

  const showSearchDrawer = () => {
    setOpenSearch(true);
  };
  const onCloseSearchDrawer = () => {
    setOpenSearch(false);
    setSearchData(sdata);
    setSearchView(false);
  };

  const { Search } = Input;

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );

  const { Title, Text, Link } = Typography;

  const sdata = [
    {
      id: 1,
      url: "/finance",
      q: "map",
      description: "see map  loremmmmmmmmmmmmmmmmmmmm",
    },
    {
      id: 2,
      url: "/finance",
      q: "map1",
      description: "see map loremmmmmmmmmmmmmmmmmmmm",
    },
    {
      id: 3,
      url: "/finance",
      q: "map",
      description: "see map3 loremmmmmmmmmmmmmmmmmmmm",
    },
  ];
  const [searchData, setSearchData] = useState(sdata);
  const [searchView, setSearchView] = useState(false);

  const handleSearchQuery = (e) => {
    console.log(e.target.value);
    setSearchData(sdata);
    setSearchView(false);
  };
  const onSearch = (queryValue: string) => {
    console.log(queryValue);
    let p = searchData.filter((v) => v.q === queryValue);
    setSearchData(p);
    setSearchView(true);
  };
  return (
    <>
      <Drawer
        /*  title="Recherche" */
        placement="top"
        width={500}
        height="100%"
        onClose={onCloseSearchDrawer}
        open={openSearch}
        extra={
          <Space>
            <Button danger onClick={onCloseSearchDrawer}>
              x
            </Button>
            {/*  <Button type="primary" onClick={onCloseSearchDrawer}>
              OK
            </Button> */}
          </Space>
        }
        className=" overflow-auto scroll-auto "
      >
        <div
          style={{
            width: "100%",
            background: "transparent",
            display: "flex",
            justifyContent: "center",
          }}
          className=" overflow-auto scroll-auto"
        >
          <Search
            placeholder="input search text"
            onChange={handleSearchQuery}
            onSearch={onSearch}
            enterButton
            style={{ width: "80%" }}
          />
        </div>
        {searchView && (
          <div className="mt-9 bg-white overflow-auto scroll-auto px-7 ">
            {searchData.length ? (
              searchData.map((v, i) => (
                <Link
                  href={v.url}
                  target="_blank"
                  className="text-gray-500  hover:text-gray-800 "
                  key={i}
                >
                  <Card className=" mb-1 drop-shadow hover:bg-slate-100  transition ease-in duration-100">
                    {" "}
                    <span className="font-semibold text-md">{i}</span>
                    <span className="text-md">- {v.description}</span>
                  </Card>
                </Link>
              ))
            ) : (
              <Card className=" drop-shadow font-semibold text-md text-lg">
                no data found
              </Card>
            )}
          </div>
        )}
      </Drawer>
      <Header
        className="header-desktop site-layout-background border-b-2  border-gray-200 
        sticky top-0 z-50 s bg-white text-gray-500"
        style={styleHeaderDesktop}
      >
        <Space size="small" className="trigger_menu desktop-menu ">
          {React.createElement(
            isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => dispatch(toggleCollapseLayout()),
            }
          )}

          <span className="block text-gray-500 mt-1 pt-1  ml-1">
            {format(dateElastic, "dd-MM-yyyy hh:mm:ss")}
          </span>
        </Space>

        <Space direction="horizontal">
          <Space wrap onClick={showSearchDrawer}>
            {/*   <Avatar size={{ xs: 24, sm: 24 }} icon={<SearchOutlined />} /> */}
            <SearchOutlined
              className="text-md border-2 rounded-full p-1 cursor-pointer
              border-gray-400  hover:border-blue-700   transition ease-in duration-200"
            />
          </Space>
          {/*   <Space wrap>
            <Dropdown overlay={chatMenu} placement="bottomLeft">
         
              <Badge size="default" count={2}>
                <MessageOutlined
                  className="text-md border-2 rounded-full p-1 cursor-pointer
                  border-gray-400  hover:border-blue-700   transition ease-in duration-200"
                />
              </Badge>
            </Dropdown>
          </Space> */}
          <Space wrap>
            <Dropdown overlay={notificationsMenu} placement="bottomLeft">
              {/*  <Avatar size={{ xs: 24, sm: 24 }} icon={<BellOutlined />} /> */}
              <Badge size="default" count={5}>
                <BellOutlined
                  className="text-md border-2 rounded-full p-1 cursor-pointer
                  border-gray-400  hover:border-blue-700   transition ease-in duration-200"
                />
              </Badge>
            </Dropdown>
          </Space>
          <Space wrap>
            <Dropdown overlay={profilMenu} placement="bottomLeft">
              {/*  <Avatar size={{ xs: 24, sm: 24 }} icon={<UserOutlined />} /> */}
              <UserOutlined
                className="text-md border-2 rounded-full p-1 cursor-pointer
                border-gray-400  hover:border-blue-700    transition ease-in duration-200"
              />
            </Dropdown>
          </Space>
        </Space>
      </Header>

      {/* mobile menu header  */}
      <Header className="header-mobile site-layout-background  bg-gray-900 text-white">
        <Space size="small" className="trigger_menu mobile-menu">
          <MenuOutlined
            className="ml-5"
            onClick={() => dispatch(showDrawer())}
          />

          <span className="text-white">ERP SAAS</span>
        </Space>

        <Space direction="vertical">
          <Space wrap>
            <Dropdown overlay={profilMenu} placement="bottomLeft">
              <Avatar size={{ xs: 24, sm: 32 }} icon={<UserOutlined />} />
            </Dropdown>
          </Space>
        </Space>
      </Header>

      <Hsider />
    </>
  );
}
