import React, { useState } from 'react'
import { compareAsc, format } from 'date-fns'

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
  SettingOutlined,
} from '@ant-design/icons'
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
} from 'antd'
const { Content } = Layout
import type { SelectProps } from 'antd/es/select'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCollapseLayout, showDrawer, selectModule } from '../features/ui/uiSlice'
import { useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
// profil menu

import Hsider from './Hsider'
import { TbRuler2 } from 'react-icons/tb'

const profilMenu = (
  <Menu
    items={[
      {
        key: '1',
        label: <Link to="#"> Chawki Barhoumi</Link>,
      },
      {
        key: '2',
        label: <Link to="#">Déconnexion</Link>,
        onClick: () => alert('test logout'),
      },
    ]}
  />
)
const chatMenu = (
  <Menu
    items={[
      {
        key: '1',
        label: <Link to="#"> Public room</Link>,
      },
      {
        key: '2',
        label: <Link to="#"> Responsable Maintenance Mohamed Amine ...</Link>,
      },
      {
        key: '3',
        label: <Link to="#"> Technicien IOT Mehdi ...</Link>,
      },
    ]}
  />
)
const notificationsMenu = (
  <Menu
    items={[
      {
        key: '1',
        label: <Link to="#"> Notification de mesure S1</Link>,
      },
      {
        key: '2',
        label: <Link to="#"> Notification de mesure S2</Link>,
      },
      {
        key: '3',
        label: <Link to="#">Notification de mesure S3</Link>,
        onClick: () => console.log('Notification de mesure '),
      },
      {
        key: '4',
        label: <Link to="#">Notification de mesure S4</Link>,
        onClick: () => console.log('Notification de mesure '),
      },
      {
        key: '5',
        label: <Link to="#">Notification de mesure S5</Link>,
        onClick: () => console.log('Notification de mesure '),
      },
    ]}
  />
)
// end profil menu
// ---------Search
const getRandomInt = (max: number, min = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const searchResult = (query: string) =>
  new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_, idx) => {
      const category = `${query}${idx}`
      return {
        value: category,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              Found {query} on{' '}
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
      }
    })
// --------end-Search

const navbarMobile: MenuProps['items'] = [
  {
    label: 'Elastic mobile',
    key: 'Accueil',
    icon: <UserOutlined />,
  },
  {
    label: 'Ressource humaine',
    key: 'rh',
    icon: <VideoCameraOutlined />,
  },
]
const { useBreakpoint } = Grid

const navbarItems: MenuProps['items'] = [
  {
    label: ( <Link to="home"> hey
    </Link> ),
    key: 'Accueil',
    icon: <UserOutlined />,
  },
  {
    label: ( <Link to="finance"> hey
    </Link> ),
    key: 'rh',
    icon: <VideoCameraOutlined />,
  },
  {
    label: ( <Link to="projects"> hey
    </Link> ),
    key: 'Immobilisation',
    icon: <UploadOutlined />,
  },
  {
    label: 'Finance',
    key: 'finance',
    icon: <BarChartOutlined />,
  },
  {
    label: 'Projet',
    key: 'projet',
    icon: <CloudOutlined />,
    children: [
      {
        label: 'Ticketing',
        key: 'ticketing',
        icon: <AppstoreOutlined />,
      },
      {
        label: 'Achats',
        key: 'achat',
        icon: <TeamOutlined />,
      },
    ],
  },
]
export default function Navbar() {
  // redux toolkit store
  const { isCollapsed, menu, selectedModule } = useSelector((store: any) => store.ui)
  const dispatch = useDispatch()

  
  // --- search
  const [options, setOptions] = useState<SelectProps<object>['options']>([])

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : [])
  }

  const onSelect = (value: string) => {
    console.log('onSelect', value)
  }
  // --- endsearch

  const { Header } = Layout
  const screens = useBreakpoint()
  // console.log(screens.lg);

  React.useEffect(() => {
    // console.log(screens);
  }, [screens])

  const [dateElastic, setDateElastic] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setDateElastic(new Date()), 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  let location = useLocation()

  /*  console.log(location.pathname); */

  const styleHeaderDesktop: React.CSSProperties = {
    marginLeft: !isCollapsed ? '200px' : '80px',
  }
  const { Search } = Input

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  )

  const { Title, Text, Link } = Typography

  const sdata = [
    {
      id: 1,
      url: '/finance',
      q: 'map',
      description: 'see map  loremmmmmmmmmmmmmmmmmmmm',
    },
    {
      id: 2,
      url: '/finance',
      q: 'map1',
      description: 'see map loremmmmmmmmmmmmmmmmmmmm',
    },
    {
      id: 3,
      url: '/finance',
      q: 'map',
      description: 'see map3 loremmmmmmmmmmmmmmmmmmmm',
    },
  ]

  const handleSelectModule=(info)=>{
    localStorage.setItem("module",info.key);
  }

  return (
    <>
      <Header
        className="header-desktop site-layout-background border-b-2  border-gray-200 
        sticky top-0 z-50 s bg-white text-gray-500"
        style={styleHeaderDesktop}
      >
        <Space>
                  {React.createElement(
            isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => dispatch(toggleCollapseLayout()),
            },
          )}
              <Menu
              disabledOverflow={true}
        theme="light"
        mode="horizontal"
        selectedKeys={[localStorage.getItem("module")]}
        onClick={handleSelectModule}
        // items={navbarItems}
        >
          {menu.map((item,index)=>(
                        <Menu.Item key={item.id} >
            <NavLink to={item.link}>
                         {item.designation_fr}
                        </NavLink>
                      </Menu.Item>
                      ))}
        </Menu>
      </Space>
        <Space direction="horizontal">
          <Space wrap onClick={()=>{}}>
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
  )
}
