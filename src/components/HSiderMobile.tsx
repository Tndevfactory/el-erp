import React, { useEffect, useState } from "react";
import { Drawer, MenuProps, Menu } from "antd";
import { useSelector } from "react-redux";
import MenuIcon from "./MenuIcon";
import { NavLink } from "react-router-dom";
import { important } from "tailwind.config";

const HSiderMobile: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ visible, setVisible }) => {
  const [current, setCurrent] = useState("0");
  useEffect(() => {
    window.addEventListener("storage", () => {
      setCurrent("0");
    });
  }, [current]);
  const { menu } = useSelector((store: any) => store.ui);
  const onClose=()=>{setVisible(false)}
  return (
    <Drawer
      className="HSiderMobile"
      placement={"left"}
      width={255}
      onClose={onClose}
      open={visible}
      closable={false}
    >
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        {menu.map((item, index) => (
          <Menu.SubMenu
            key={index}
            title={item.designation_fr}
            icon={<div><MenuIcon icon={item.icon} /></div>}
          >
            {item.child_recursive.map((item, y) => (
              <Menu.Item
                key={index + "-" + y}
                icon={
                  <div>
                    <MenuIcon icon={item.icon} />
                  </div>
                }
                onClick={() =>{
                  setCurrent(index.toString() + "-" + y.toString())
                  onClose()
                }}
              >
                <NavLink to={item.link}>{item.designation_fr}</NavLink>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ))}
      </Menu>
    </Drawer>
  );
};

export default HSiderMobile;
