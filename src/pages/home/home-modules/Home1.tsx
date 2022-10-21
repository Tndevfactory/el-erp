import React, { useState } from "react";
import io from "socket.io-client";
import { each, groupBy } from "@antv/util";
import { Checkbox } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import type { RadioChangeEvent } from "antd";
import { format } from "date-fns";

import type { ColumnsType } from "antd/es/table";

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
  Table,
  Layout,
  Menu,
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
  BackTop,
  Steps,
  Divider,
} from "antd";

import { Link, useLocation, NavLink } from "react-router-dom";
import TableData from "./TableData";

import type { SelectProps } from "antd/es/select";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapseLayout } from "../../../features/ui/uiSlice";
import { useEffect } from "react";
import Positions1 from "../../positions/positions-modules/Positions1";
import { TinyLine, Column, Radar, Line } from "@ant-design/plots";
import fr from "date-fns/esm/locale/fr/index.js";
// chart
const DemoTinyLine = () => {
  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
    546, 983, 340, 539, 243, 226, 192,
  ];
  const config: any = {
    height: 60,
    autoFit: false,
    data,
    smooth: true,
  };
  return <TinyLine {...config} />;
};
// column

const DemoColumn = () => {
  const dataColumn = [
    {
      name: "Site A",
      month: "Jan.",
      alert: 18.9,
    },
    {
      name: "Site A",
      month: "Feb.",
      alert: 28.8,
    },
    {
      name: "Site A",
      month: "Mar.",
      alert: 39.3,
    },
    {
      name: "Site A",
      month: "Apr.",
      alert: 81.4,
    },
    {
      name: "Site A",
      month: "May",
      alert: 47,
    },
    {
      name: "Site A",
      month: "Jun.",
      alert: 20.3,
    },
    {
      name: "Site A",
      month: "Jul.",
      alert: 24,
    },
    {
      name: "Site A",
      month: "Aug.",
      alert: 35.6,
    },
    {
      name: "Site A",
      month: "Jan.",
      alert: 12.4,
    },
    {
      name: "Site A",
      month: "Feb.",
      alert: 23.2,
    },
    {
      name: "Site A",
      month: "Mar.",
      alert: 34.5,
    },
    {
      name: "Site A",
      month: "Apr.",
      alert: 99.7,
    },
    {
      name: "Site A",
      month: "May",
      alert: 52.6,
    },
    {
      name: "Site A",
      month: "Jun.",
      alert: 35.5,
    },
    {
      name: "Site A",
      month: "Jul.",
      alert: 37.4,
    },
    {
      name: "Site A",
      month: "Aug.",
      alert: 42.4,
    },
    {
      name: "Site B",
      month: "Jan.",
      alert: 12.4,
    },
    {
      name: "Site B",
      month: "Feb.",
      alert: 23.2,
    },
    {
      name: "Site B",
      month: "Mar.",
      alert: 34.5,
    },
    {
      name: "Site B",
      month: "Apr.",
      alert: 50.7,
    },
    {
      name: "Site B",
      month: "May",
      alert: 52.6,
    },
    {
      name: "Site B",
      month: "Jun.",
      alert: 35.5,
    },
    {
      name: "Site B",
      month: "Jul.",
      alert: 37.4,
    },
    {
      name: "Site B",
      month: "Aug.",
      alert: 42.4,
    },
    {
      name: "Site C",
      month: "Jan.",
      alert: 12.4,
    },
    {
      name: "Site C",
      month: "Feb.",
      alert: 23.2,
    },
    {
      name: "Site C",
      month: "Mar.",
      alert: 34.5,
    },
    {
      name: "Site C",
      month: "Apr.",
      alert: 21.7,
    },
    {
      name: "Site C",
      month: "May",
      alert: 52.6,
    },
    {
      name: "Site C",
      month: "Jun.",
      alert: 35.5,
    },
    {
      name: "Site C",
      month: "Jul.",
      alert: 37.4,
    },
    {
      name: "Site C",
      month: "Aug.",
      alert: 42.4,
    },
  ];
  const [data, setData] = useState(dataColumn);

  useEffect(() => {
    // asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/antfincdn/iPY8JFnxdb/dodge-padding.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config: any = {
    data,
    isGroup: true,
    xField: "month",
    yField: "alert",
    seriesField: "name",

    dodgePadding: 2,

    intervalPadding: 20,
    label: {
      position: "top",
      // 'top', 'middle', 'bottom'

      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
  };

  return <Column {...config} />;
  // return <div>column</div>;
};

//

const dataLine = [
  {
    year: "2022-04-01",
    value: 0,
    category: "Heat",
  },
  {
    year: "2022-04-01",
    value: 0,
    category: "Humidity",
  },
  {
    year: "2022-04-01",
    value: 0,
    category: "Attack",
  },
  {
    year: "2022-05-01",
    value: 55,
    category: "Heat",
  },
  {
    year: "2022-05-01",
    value: 65,
    category: "Humidity",
  },
  {
    year: "2022-05-01",
    value: 35,
    category: "Attack",
  },
  {
    year: "2022-06-01",
    value: 34,
    category: "Heat",
  },
  {
    year: "2022-06-01",
    value: 44,
    category: "Humidity",
  },
  {
    year: "2022-06-01",
    value: 15,
    category: "Attack",
  },
  {
    year: "2022-07-01",
    value: 65,
    category: "Heat",
  },
  {
    year: "2022-07-01",
    value: 55,
    category: "Humidity",
  },
  {
    year: "2022-07-01",
    value: 55,
    category: "Attack",
  },
  {
    year: "2022-08-01",
    value: 15,
    category: "Heat",
  },
  {
    year: "2022-08-01",
    value: 25,
    category: "Humidity",
  },
  {
    year: "2022-08-01",
    value: 35,
    category: "Attack",
  },
];
const DemoLine = () => {
  const [data, setData] = useState(dataLine);

  useEffect(() => {
    // asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config: any = {
    data,
    xField: "year",
    yField: "value",
    seriesField: "category",
    /*  xAxis: {
      type: "time",
    }, */
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    xAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) =>
          /*   `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`), */

          format(new Date(v), "MMM"), // июня
      },
    },
  };

  return <Line {...config} />;
};
// end chart
const style: React.CSSProperties = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 4,
  backgroundColor: "#1088e9",
  color: "#fff",
  textAlign: "center",
  fontSize: 14,
};

const { Content } = Layout;
const { useBreakpoint } = Grid;
const { Title } = Typography;
const { Step } = Steps;

const Home1: React.FC = () => {
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

  /*  const socket = io("http://localhost:3001"); */

  const [inputSocket, setInputSocket] = useState("");
  const onSearch = (value: string) => alert(inputSocket);

  const joinRoom = () => {
    /*   if (room !== "") {
      socket.emit("join_room", room);
    } */
  };

  /*  const sendMessage = () => {
    alert(message);
    socket.emit("send_message", { message, room });
  }; */
  const sendMessage = () => {
    /* socket.emit("send_message", { message }); */
  };

  /* useEffect(() => {
    socket.on("received_message", (data: any) => {
      console.log(data);
      setMessageReceived(data.message);
    });
    socket.on("temperature", function (data) {
      setTemperature(data.value);
    });
  }, [socket]); */

  /*  useEffect(() => {
    socket.on("dtd", (data: any) => {
      console.log(data);
      setMessageReceived(data);
    });
  }, [socket]); */

  ///// socket io ---------------------
  ///// check box options ---------------------
  interface sitesOptions {
    id: string;
    label: string;
  }
  interface espaceOptions {
    id: string;
    label: string;
    nature: string;
    id_site: string;
  }

  const [sites, setSites] = useState<sitesOptions[]>([
    {
      id: "1",
      label: "Tunis",
    },
    {
      id: "2",
      label: "Zahra",
    },

    {
      id: "3",
      label: "Hammam chatt",
    },
  ]);
  const [espaces, setEspaces] = useState<espaceOptions[]>([
    {
      id: "1",
      label: "Batiment",
      nature: "Indoor",
      id_site: "1",
    },
    {
      id: "2",
      label: "Terre agricole",
      nature: "Outdoor",
      id_site: "1",
    },
  ]);

  const [dataSites, setDataSites] = useState([]);
  const [dataEspaces, setDataEspaces] = useState([]);

  return (
    <>
      <Breadcrumb separator=">" className="my-5">
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>{" "}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Row gutter={[12, 24]}>
          <Col xs={24}>
            {" "}
            <div className="drop-shadow h-12  bg-white flex justify-center items-center ">
              {" "}
              <span className="drop-shadow text-2xl ">Dashboard</span>
            </div>{" "}
          </Col>
          <Col xs={24} md={12} lg={12} xl={12} xxl={12}>
            <Row gutter={[12, 20]}>
              <Col xs={24} md={8} lg={8} xl={8} xxl={8}>
                <Link to="/home/site-a">
                  <Card
                    bordered={false}
                    className="drop-shadow bg-amber-200 shadow-lg shadow-amber-200/20 border-0"
                    /*    style={{
                    backgroundImage: `url("https://via.placeholder.com/500")`,
                  }} */
                  >
                    <Content className=" flex -mt-4  flex-col justify-center items-center">
                      <Progress
                        type="circle"
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }}
                        percent={78.3}
                        className=" mt-4"
                      />
                      <span className=" mt-5 font-sans font-bold text-xl">
                        ABU DHABI
                      </span>
                      <span className=" mt-1 font-sans font-bold text-lg">
                        UAE
                      </span>
                    </Content>
                  </Card>
                </Link>
              </Col>
              <Col xs={24} md={8} lg={8} xl={8} xxl={8}>
                <Link to="/home/site-b">
                  <Card
                    bordered={false}
                    className="drop-shadow bg-green-200 shadow-lg shadow-green-200/20 border-0"
                  >
                    <Content className=" flex -mt-4  flex-col justify-center items-center">
                      <Progress
                        type="circle"
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }}
                        percent={90.9}
                        className=" mt-4"
                      />
                      <span className=" mt-5 font-sans font-bold text-xl">
                        AL AIN
                      </span>
                      <span className=" mt-1 font-sans font-bold text-lg">
                        UAE
                      </span>
                    </Content>
                  </Card>
                </Link>
              </Col>
              <Col xs={24} md={8} lg={8} xl={8} xxl={8}>
                <Link to="/home/site-c">
                  <Card
                    bordered={false}
                    className="drop-shadow bg-green-300 shadow-lg shadow-green-300/30 border-0"
                  >
                    <Content className=" flex -mt-4  flex-col justify-center items-center">
                      <Progress
                        type="circle"
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }}
                        percent={100}
                        className=" mt-4"
                      />
                      <span className=" mt-5 font-sans font-bold text-xl">
                        TUNIS
                      </span>
                      <span className=" mt-1 font-sans font-bold text-lg">
                        TUNISIA
                      </span>
                    </Content>
                  </Card>
                </Link>
              </Col>
              <Col xs={24} md={8} lg={8} xl={8} xxl={8}>
                <Link to="/dashboard/site-a">
                  <Card
                    title="SPACES"
                    bordered={false}
                    className="drop-shadow bg-amber-200 shadow-lg shadow-amber-200/20 border-0"
                  >
                    Espace1
                    <Progress
                      strokeColor={{
                        "0%": "#108ee9",
                        "100%": "#87d068",
                      }}
                      percent={19.9}
                      status="active"
                    />
                    Espace2
                    <Progress
                      strokeColor={{
                        "0%": "#108ee9",
                        "100%": "#87d068",
                      }}
                      percent={79.9}
                    />
                    Espace3
                    <Progress
                      strokeColor={{
                        "0%": "#108ee9",
                        "100%": "#87d068",
                      }}
                      percent={99.9}
                    />
                  </Card>
                </Link>
              </Col>
              <Col xs={24} md={8} lg={8} xl={8} xxl={8}>
                <Link to="/dashboard/site-b">
                  <Card
                    title="SPACES"
                    bordered={false}
                    className="drop-shadow bg-green-200 shadow-lg shadow-green-200/20 border-0"
                  >
                    Espace1
                    <Progress
                      strokeColor={{
                        "0%": "#108ee9",
                        "100%": "#87d068",
                      }}
                      percent={19.9}
                    />
                    Espace2
                    <Progress
                      strokeColor={{
                        "0%": "#108ee9",
                        "100%": "#87d068",
                      }}
                      percent={79.9}
                    />
                    Espace3
                    <Progress
                      strokeColor={{
                        "0%": "#108ee9",
                        "100%": "#87d068",
                      }}
                      percent={99.9}
                    />
                  </Card>
                </Link>
              </Col>
              <Col xs={24} md={8} lg={8} xl={8} xxl={8}>
                <Link to="/dashboard/site-c">
                  <Card
                    title="SPACES"
                    bordered={false}
                    className="drop-shadow bg-green-300 shadow-lg shadow-green-3zertçà)0/20 border-0"
                  >
                    Espace1
                    <Progress
                      strokeColor={{
                        "0%": "#108ee9",
                        "100%": "#87d068",
                      }}
                      percent={19.9}
                    />
                    Espace2
                    <Progress
                      strokeColor={{
                        "0%": "#108ee9",
                        "100%": "#87d068",
                      }}
                      percent={79.9}
                    />
                    Espace3
                    <Progress
                      strokeColor={{
                        "0%": "#108ee9",
                        "100%": "#87d068",
                      }}
                      percent={99.9}
                    />
                  </Card>
                </Link>
              </Col>
            </Row>
          </Col>

          <Col xs={24} md={12} lg={12} xl={12} xxl={12}>
            <Card
              title="Monthly Alerts levels"
              bordered={false}
              className="drop-shadow "
            >
              <DemoColumn />
            </Card>
          </Col>

          <Col xs={24} md={8} lg={8} xl={8} xxl={8}>
            <Card
              title=" Site A Frequency Issue "
              bordered={false}
              className="drop-shadow"
            >
              <DemoLine />
            </Card>
          </Col>

          <Col xs={24} md={8} lg={8} xl={8} xxl={8}>
            <Card
              title="Site B Frequency Issue "
              bordered={false}
              className="drop-shadow"
            >
              <DemoLine />
            </Card>
          </Col>

          <Col xs={24} md={8} lg={8} xl={8} xxl={8}>
            <Card
              title="Site C Frequency Issue "
              bordered={false}
              className="drop-shadow"
            >
              <DemoLine />
            </Card>
          </Col>

          <Col xs={24} md={8} lg={8} xl={8} xxl={8}>
            <Card
              title="Site A Latest alerts "
              bordered={false}
              className="drop-shadow"
            >
              <Steps progressDot current={8} direction="vertical" className="">
                <Step
                  title="Critical - 2022-10-02"
                  description=" before remote telemetry unit (RTU) monitoring high temperature over 95°c"
                  className=""
                />
                <Step
                  title="High - 2022-09-19"
                  description="remote telemetry unit (RTU) monitoring high temperature over 70°c"
                  className=""
                />
                <Step
                  title="Medium  - 2022-08-22"
                  description="remote telemetry unit (RTU) monitoring high temperature over 40°c"
                  className=""
                />
                <Step
                  title="Low - 2022-08-12"
                  description="remote telemetry unit (RTU) monitoring high temperature over 25°c"
                  className=""
                />
                <Step
                  title="Low - 2022-08-11"
                  description="remote telemetry unit (RTU) monitoring high temperature over 15°c"
                  className=""
                />
              </Steps>
              {/* 
              <div className="relative steps">
                <div
                  className="
        relative
        ml-3
        font-[500]
        text-gray-500
        before:rounded-lg
        before:absolute 
        before:w-[9px]
        before:h-[9px]
        before:bottom-[7px]
        before:-left-[15px]
      before:bg-blue-700
        "
                >
                  Element 1
                </div>
                <div
                  className="
        relative 
        h-5
        ml-3
       
        before:absolute 
        before:w-[1.5px]
        before:h-5
       
        before:-left-[11px]
        before:bg-blue-400
        "
                >
                  rrrrrrrrr
                </div>
                <div
                  className="
        relative
        ml-3
        before:rounded-lg
        before:absolute 
        before:w-[9px]
        before:h-[9px]
        before:bottom-[7px]
        before:-left-[15px]
      before:bg-blue-700
        "
                >
                  Element 1
                </div>
                <div
                  className="
        relative 
        h-5
        ml-3
       
        before:absolute 
        before:w-[1.5px]
        before:h-5
       
        before:-left-[11px]
        before:bg-blue-400
        "
                >
                  rrrrrrrrr
                </div>
                <div
                  className="
        relative
        ml-3
        before:rounded-lg
        before:absolute 
        before:w-[9px]
        before:h-[9px]
        before:bottom-[7px]
        before:-left-[15px]
      before:bg-blue-600
        "
                >
                  Element 1
                </div>
              </div> */}
            </Card>
          </Col>
          <Col xs={24} md={8} lg={8} xl={8} xxl={8}>
            <Card
              title="Site B Latest alerts"
              bordered={false}
              className="drop-shadow"
            >
              <Steps progressDot current={8} direction="vertical" className="">
                <Step
                  title="Critical - 2022-10-02"
                  description="remote telemetry unit (RTU) monitoring high temperature over 95°c"
                  className=""
                />
                <Step
                  title="High - 2022-09-19"
                  description="remote telemetry unit (RTU) monitoring high temperature over 70°c"
                  className=""
                />
                <Step
                  title="Medium  - 2022-08-22"
                  description="remote telemetry unit (RTU) monitoring high temperature over 40°c"
                  className=""
                />
                <Step
                  title="Low - 2022-08-12"
                  description="remote telemetry unit (RTU) monitoring high temperature over 25°c"
                  className=""
                />
                <Step
                  title="Low - 2022-08-11"
                  description="remote telemetry unit (RTU) monitoring high temperature over 15°c"
                  className=""
                />
              </Steps>
            </Card>
          </Col>
          <Col xs={24} md={8} lg={8} xl={8} xxl={8}>
            <Card
              title="Site C Latest alerts"
              bordered={false}
              className="drop-shadow"
            >
              <Steps progressDot current={8} direction="vertical" className="">
                <Step
                  title="Critical - 2022-10-02"
                  description="remote telemetry unit (RTU) monitoring high temperature over 95°c"
                  className=""
                />
                <Step
                  title="High - 2022-09-19"
                  description="remote telemetry unit (RTU) monitoring high temperature over 70°c"
                  className=""
                />
                <Step
                  title="Medium  - 2022-08-22"
                  description="remote telemetry unit (RTU) monitoring high temperature over 40°c"
                  className=""
                />
                <Step
                  title="Low - 2022-08-12"
                  description="remote telemetry unit (RTU) monitoring high temperature over 25°c"
                  className=""
                />
                <Step
                  title="Low - 2022-08-11"
                  description="remote telemetry unit (RTU) monitoring high temperature over 15°c"
                  className=""
                />
              </Steps>
            </Card>
          </Col>
        </Row>

        <TableData />
      </Space>
    </>
  );
};

export default Home1;
