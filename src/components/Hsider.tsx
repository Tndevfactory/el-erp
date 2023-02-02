import React, { useState } from "react";
import elasticLogo from "../assets/elastic-logo.png";
import { NavLink } from "react-router-dom";
import {
  Layout,
  Menu,
  Card,
  Typography,
  Grid,
  Image,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MenuIcon from "./MenuIcon";
const { Sider } = Layout;

const { useBreakpoint } = Grid;

export default function Hsider() {
  const { isCollapsed, selectedModule } = useSelector(
    (store: any) => store.ui
  );
  const dispatch = useDispatch();
  const [ menu, setMenu] = useState(JSON.parse(localStorage.getItem("menu")));

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

  //Hsider handle selected item
  const [current, setCurrent] = useState('0')
  useEffect(()=>{
    window.addEventListener('storage', () => {
      setCurrent('0')
    })
  },[current])
  return (
    <Sider
      className="bg-white text-gray-500 shadow"
      style={styleHSider}
      trigger={null}
      collapsible
      collapsed={isCollapsed}
    >
      <div className="border-0 mx-3 bg-white p-2 flex">
        <Image width={30} src={elasticLogo} preview={false}/>
        {!isCollapsed ? (
          <Text
            strong
            className="text-blue-600 ml-2 text-lg subpixel-antialiased font-semibold
            tracking-tighter uppercase"
          >
            elastic erp
          </Text>
        ) : (
          ""
        )}
      </div>
      <Menu
        /* theme="light" */
        className="bg-tranparent text-gray-600  border-1 border-transparent"
        mode={isCollapsed ? "vertical" : "inline"}
        selectedKeys={[current]}
        defaultOpenKeys={["0"]}
      >
        {menu.filter((item)=>item.id===parseInt(localStorage.getItem("module")))[0]?.child_recursive.map((item,index) =>
          item.child_recursive.length === 0 ? (
            <Menu.Item key={index}  icon={<div><MenuIcon icon={item.icon}/></div>} onClick={()=>setCurrent(index.toString())}><NavLink to={item.link}>{item.designation_fr}</NavLink></Menu.Item>
          ) : (
            <Menu.SubMenu key={index}  title={item.designation_fr} icon={<div><MenuIcon icon={item.icon} /></div>} >
              {item.child_recursive.map((item,y) =><Menu.Item key={index+"-"+y}  onClick={()=>{setCurrent(index.toString()+"-"+y.toString())}}><NavLink to={item.link}>{item.designation_fr}</NavLink></Menu.Item>)}
            </Menu.SubMenu>
          )
        )}
      </Menu>
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
