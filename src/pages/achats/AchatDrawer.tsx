import type { DrawerProps, RadioChangeEvent } from "antd";
import { Button, Drawer, Radio, Space } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showDrawer, closeDrawer } from "../../features/ui/uiSlice";

const AchatDrawer: React.FC = () => {
  const [visible, setVisible] = useState(false);
  // redux toolkit store
  const { isVisibleDrawer } = useSelector((store: any) => store.ui);
  const dispatch = useDispatch();

  return (
    <>
      <Drawer
        title="Basic Drawer"
        placement="left"
        onClose={() => dispatch(closeDrawer())}
        open={isVisibleDrawer}
      >
        <p>Achat drawer...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default AchatDrawer;
