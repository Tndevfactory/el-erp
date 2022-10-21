import React, { useState } from "react";
import io from "socket.io-client";
import { each, groupBy } from "@antv/util";
import type { TransferDirection } from "antd/es/transfer";
import Boards from "./Boards";

import {
  Bullet,
  Gauge,
  Liquid,
  G2,
  Column,
  Pie,
  measureTextWidth,
  BidirectionalBar,
  Line,
  Sunburst,
} from "@ant-design/plots";

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
  Transfer,
} from "antd";

import { Link, useLocation, NavLink } from "react-router-dom";

import type { SelectProps } from "antd/es/select";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapseLayout } from "../../../features/ui/uiSlice";
import { useEffect } from "react";

// transfer
interface RecordType {
  key: string;
  title: string;
  description: string;
}

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `sensor${i + 1}`,
  description: `description of content${i + 1}`,
}));

const initialTargetKeys = mockData
  .filter((item) => Number(item.key) > 10)
  .map((item) => item.key);

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

const Configuration1: React.FC = () => {
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

  /*  const sendMessage = () => {
    alert(message);
    socket.emit("send_message", { message, room });
  }; */

  /*  useEffect(() => {
    socket.on("dtd", (data: any) => {
      console.log(data);
      setMessageReceived(data);
    });
  }, [socket]); */

  ///// socket io ---------------------
  ///// transfer ---------------------
  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const onChange = (
    nextTargetKeys: string[],
    direction: TransferDirection,
    moveKeys: string[]
  ) => {
    console.log("targetKeys:", nextTargetKeys);
    console.log("direction:", direction);
    console.log("moveKeys:", moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (
    sourceSelectedKeys: string[],
    targetSelectedKeys: string[]
  ) => {
    console.log("sourceSelectedKeys:", sourceSelectedKeys);
    console.log("targetSelectedKeys:", targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScroll = (
    direction: TransferDirection,
    e: React.SyntheticEvent<HTMLUListElement>
  ) => {
    console.log("direction:", direction);
    console.log("target:", e.target);
  };

  return (
    <>
      <Breadcrumb separator=">" className="mt-5">
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Positions</Breadcrumb.Item>
        <Breadcrumb.Item>Configuration</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mt-5" gutter={[12, 24]}>
        {/*  <Col xs={24} md={24} lg={9} xl={9} xxl={7}>
          <Content className="site-layout-background  bg-white drop-shadow ">
            <Card
              title="Position 1"
              bordered={false}
              className="flex flex-col items-center justify-center"
            >
              <Transfer
                dataSource={mockData}
                titles={["Sensors", "Position1"]}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={onChange}
                onSelectChange={onSelectChange}
                onScroll={onScroll}
                render={(item) => item.title}
              />
            </Card>
          </Content>
        </Col>
        <Col xs={24} md={24} lg={9} xl={9} xxl={7}>
          <Content className="site-layout-background  bg-white drop-shadow ">
            <Card
              title="Position 2"
              bordered={false}
              className="flex flex-col items-center justify-center"
            >
              <Transfer
                dataSource={mockData}
                titles={["Sensors", "Position2"]}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={onChange}
                onSelectChange={onSelectChange}
                onScroll={onScroll}
                render={(item) => item.title}
              />
            </Card>
          </Content>
        </Col>
        <Col xs={24} md={24} lg={9} xl={9} xxl={7}>
          <Content className="site-layout-background  bg-white drop-shadow ">
            <Card
              title="Position 3"
              bordered={false}
              className="flex flex-col items-center justify-center"
            >
              <Transfer
                dataSource={mockData}
                titles={["Sensors", "Position3"]}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={onChange}
                onSelectChange={onSelectChange}
                onScroll={onScroll}
                render={(item) => item.title}
              />
            </Card>
          </Content>
        </Col> */}
        <Col xs={24}>
          <Boards />
        </Col>
      </Row>
    </>
  );
};

export default Configuration1;
