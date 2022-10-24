import React, { useState } from "react";
import {
  Layout,
  Grid,
  Typography,
} from "antd";

import {
  Outlet,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const { useBreakpoint } = Grid;
const Index: React.FC = () => {
  // redux toolkit store
  const { isCollapsed } = useSelector((store: any) => store.ui);

  // Current break point:{" "}
  // {Object.entries(screens)
  //   .filter((screen) => !!screen[1])
  //   .map((screen) => (
  //     <Tag color="blue" key={screen[0]}>
  //       {screen[0]}
  //     </Tag>
  //   ))}
  // console.log(screens);

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
