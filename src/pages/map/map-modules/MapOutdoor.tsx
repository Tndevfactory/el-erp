import React, { useState } from "react";

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
} from "antd";

import {
  Link,
  Outlet,
  useNavigate,
  useLocation,
  Navigate,
  NavLink,
} from "react-router-dom";

import type { SelectProps } from "antd/es/select";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapseLayout } from "../../../features/ui/uiSlice";
import { useEffect } from "react";

// leaflet
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import { Icon } from "leaflet";
import * as parkData from "./parks.json";
import sensorIcon from "../../../assets/sensor.svg";
import "../../../style/leaflet.css";

export const icon = new Icon({
  iconUrl: sensorIcon,
  iconSize: [25, 25],
});

const { Content } = Layout;
const { useBreakpoint } = Grid;
const { Title } = Typography;

const MapOutdoor: React.FC = () => {
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
  const [activePark, setActivePark] = React.useState(null);
  const redOptions = { color: "rgba(255,0,0,0.5)" };

  return (
    <>
      <Breadcrumb separator=">" className="mt-5">
        <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="/finance">Map</Breadcrumb.Item>
        <Breadcrumb.Item>Outdoor</Breadcrumb.Item>
      </Breadcrumb>
      <Row
        gutter={[16, 24]}
        style={{
          // marginLeft: screens.lg ? (!isCollapsed ? "200px" : "80px") : "0px",
          // marginLeft: !collapsed ? "220px" : "100px",
          marginTop: "24px ",
          backgroundColor: "transparent",
        }}
      >
        <Col
          xs={24}
          md={12}
          lg={12}
          xl={8}
          xxl={6}
          style={{
            backgroundColor: "transparent",
          }}
        >
          <Content
            className="site-layout-background"
            style={{
              backgroundColor: "red",
              position: "relative",
              minHeight: "50vh",
            }}
          >
            <MapContainer
              center={[36.679569, 10.379172]}
              zoom={12}
              style={{ position: "absolute" }}
              className="parc bougarnine z-0"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {parkData.sensors.map((sensor) => (
                <Marker
                  key={sensor.properties.SENSOR_ID}
                  position={[
                    sensor.geometry.coordinates[1],
                    sensor.geometry.coordinates[0],
                  ]}
                  icon={icon}
                  eventHandlers={{
                    click: (e) => {
                      alert("clicked"); // will print 'FooBar' in console
                    },
                  }}
                >
                  <Popup>
                    {sensor.properties.SPECIFITE} <br /> membre de la station
                    mère (GATEWAY) {sensor.properties.STATION_ID}
                  </Popup>
                </Marker>
              ))}
              <CircleMarker
                center={[36.669569, 10.379172]}
                pathOptions={redOptions}
                radius={70}
              >
                <Popup>TACTIC GATEWAY STATION {parkData.STATION_ID} </Popup>
              </CircleMarker>
            </MapContainer>
          </Content>
        </Col>
        <Col
          xs={24}
          md={12}
          lg={12}
          xl={8}
          xxl={6}
          style={{
            backgroundColor: "transparent",
          }}
        >
          <Content
            className="site-layout-background"
            style={{
              backgroundColor: "red",
              position: "relative",
              minHeight: "50vh",
            }}
          >
            <MapContainer
              center={[36.679569, 10.379172]}
              zoom={12}
              style={{ position: "absolute" }}
              className="parc bougarnine z-0"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {parkData.sensors.map((sensor) => (
                <Marker
                  key={sensor.properties.SENSOR_ID}
                  position={[
                    sensor.geometry.coordinates[1],
                    sensor.geometry.coordinates[0],
                  ]}
                  icon={icon}
                >
                  <Popup>
                    {sensor.properties.SPECIFITE} <br /> membre de la station
                    mere {sensor.properties.STATION_ID}
                  </Popup>
                </Marker>
              ))}
              <CircleMarker
                center={[36.669569, 10.379172]}
                pathOptions={redOptions}
                radius={70}
              >
                <Popup>TACTIC GATEWAY STATION {parkData.STATION_ID} </Popup>
              </CircleMarker>
            </MapContainer>
          </Content>
        </Col>
        <Col
          xs={24}
          md={12}
          lg={12}
          xl={8}
          xxl={6}
          style={{
            backgroundColor: "transparent",
          }}
        >
          <Content
            className="site-layout-background"
            style={{
              backgroundColor: "red",
              position: "relative",
              minHeight: "50vh",
            }}
          >
            <MapContainer
              center={[36.679569, 10.379172]}
              zoom={12}
              style={{ position: "absolute" }}
              className="parc bougarnine z-0"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {parkData.sensors.map((sensor) => (
                <Marker
                  key={sensor.properties.SENSOR_ID}
                  position={[
                    sensor.geometry.coordinates[1],
                    sensor.geometry.coordinates[0],
                  ]}
                  icon={icon}
                >
                  <Popup>
                    {sensor.properties.SPECIFITE} <br /> membre de la station
                    mere {sensor.properties.STATION_ID}
                  </Popup>
                </Marker>
              ))}
              <CircleMarker
                center={[36.669569, 10.379172]}
                pathOptions={redOptions}
                radius={70}
              >
                <Popup>TACTIC GATEWAY STATION {parkData.STATION_ID} </Popup>
              </CircleMarker>
            </MapContainer>
          </Content>
        </Col>
        <Col
          xs={24}
          md={12}
          lg={12}
          xl={8}
          xxl={6}
          style={{
            backgroundColor: "transparent",
          }}
        >
          <Content
            className="site-layout-background"
            style={{
              backgroundColor: "red",
              position: "relative",
              minHeight: "50vh",
            }}
          >
            <MapContainer
              center={[36.679569, 10.379172]}
              zoom={12}
              style={{ position: "absolute" }}
              className="parc bougarnine z-0"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {parkData.sensors.map((sensor) => (
                <Marker
                  key={sensor.properties.SENSOR_ID}
                  position={[
                    sensor.geometry.coordinates[1],
                    sensor.geometry.coordinates[0],
                  ]}
                  icon={icon}
                >
                  <Popup>
                    {sensor.properties.SPECIFITE} <br /> membre de la station
                    mere {sensor.properties.STATION_ID}
                  </Popup>
                </Marker>
              ))}
              <CircleMarker
                center={[36.669569, 10.379172]}
                pathOptions={redOptions}
                radius={70}
              >
                <Popup>TACTIC GATEWAY STATION {parkData.STATION_ID} </Popup>
              </CircleMarker>
            </MapContainer>
          </Content>
        </Col>
      </Row>
      <span className="text-center text-gray-900 mt-9">
        {" "}
        &copy; Copyright {new Date().getFullYear()} ERP SAAS V2 - TACTIC{" "}
      </span>
    </>
  );
};

export default MapOutdoor;
