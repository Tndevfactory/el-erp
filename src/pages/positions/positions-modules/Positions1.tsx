import React, { useState } from "react";
import io from "socket.io-client";
import { each, groupBy } from "@antv/util";
import { DecompositionTreeGraph } from "@ant-design/graphs";

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
  ArrowUpOutlined,
  AudioOutlined,
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
  Breadcrumb,
  Statistic,
  Progress,
} from "antd";

import { Link, useLocation, NavLink } from "react-router-dom";

import type { SelectProps } from "antd/es/select";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapseLayout } from "../../../features/ui/uiSlice";
import { useEffect } from "react";

const { Content } = Layout;
const { useBreakpoint } = Grid;
const { Title } = Typography;

// socket
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}
// socket  end

// please note that the types are reversed
/* const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(); */

const Positions1: React.FC = () => {
  // redux toolkit store
  const { isCollapsed } = useSelector((store: any) => store.ui);
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();
  // Current break point:{" "}
  // {Object.entries(screens)
  //   .filter((screen) => !!screen[1])
  //   .map((screen) => (
  //     <Tag color="blue" key={screen[0]}>
  //       {screen[0]}
  //     </Tag>
  //   ))}
  // console.log(screens);
  const { Search } = Input;

  ///// socket io ---------------------
  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [temperature, setTemperature] = useState(5);

  ///// socket io ---------------------
  const DemoDecompositionTreeGraph = () => {
    const data = {
      id: "A0",
      value: {
        title: "Site1",
        items: [
          {
            text: "Hammam Chatt",
          },
        ],
      },
      children: [
        {
          id: "A1",
          value: {
            title: "Station1",
            items: [
              {
                text: "raspberry pie",
              },
              {
                text: "V4",
                value: "UID34R44",
              },
            ],
          },
          children: [
            {
              id: "A11",
              value: {
                title: "Sensor1",
                items: [
                  {
                    text: "Proximity",
                  },
                  {
                    text: "threshold",
                    value: "30%",
                  },
                ],
              },
            },
            {
              id: "A12",
              value: {
                title: "Sensor2",
                items: [
                  {
                    text: "Capacitif",
                  },
                  {
                    text: "threshold",
                    value: "10%",
                  },
                ],
              },
            },
            {
              id: "A13",
              value: {
                title: "Sensor3",
                items: [
                  {
                    text: "Temperature",
                  },
                  {
                    text: "threshold",
                    value: "80%",
                  },
                ],
              },
            },
          ],
        },
        {
          id: "A2",
          value: {
            title: "Station2",
            items: [
              {
                text: "STM32",
              },
              {
                text: "V4",
                value: "UID34R99",
                icon: "https://gw.alipayobjects.com/zos/antfincdn/iFh9X011qd/7797962c-04b6-4d67-9143-e9d05f9778bf.png",
              },
            ],
          },
        },
      ],
    };

    const config = {
      data,
      markerCfg: (cfg) => {
        const { children } = cfg;
        return {
          show: children?.length,
        };
      },
      behaviors: ["drag-canvas", "zoom-canvas", "drag-node"],
    };

    return <DecompositionTreeGraph {...config} />;
  };
  return (
    <>
      <Breadcrumb separator=">" className="mt-5">
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Positions</Breadcrumb.Item>
        <Breadcrumb.Item>Visualisation</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mt-5" gutter={[12, 24]}>
        <Col xs={24}>
          <Content className="site-layout-background  bg-white drop-shadow ">
            <Card title="General view Site and Stations" bordered={false}>
              <DemoDecompositionTreeGraph />
            </Card>
          </Content>
        </Col>
      </Row>
    </>
  );
};

export default Positions1;
