import React, { useState } from "react";
import { Card, Col, Row, Badge, Breadcrumb, Select, Space, Button } from "antd";
import CreateProject from "./createProject/CreateProject";
import { NavLink, useNavigate } from "react-router-dom";
import { AppstoreAddOutlined } from "@ant-design/icons";
const { Option } = Select;
const data = [
  {
    name: "GIP v2",
    etat: "todo",
    id: 36,
  },
  {
    name: "El ERP",
    etat: "inprogress",
    id: 30,
  },
  {
    name: "Ministère de commerce",
    etat: "test",
    id: 30,
  },
  {
    name: "GIP",
    etat: "done",
    id: 10,
  },
  
];
const Projects = () => {
  let navigate = useNavigate();
  const [createProject, setCreateProject] = useState(false);
  let [projects, setProjects] = useState(data);
  const color = (etat) => {
    if (etat === "todo") {
      return "#CACFD2";
    } else if (etat === "inprogress") {
      return "#5DADE2";
    } else if (etat === "test") {
      return "#F5B041";
    } else {
      return "#58D68D";
    }
  };
  return (
    <div className="Projects">
      <div style={{ display: "flex", width: "100%" }}>
        <Breadcrumb
          separator=">"
          style={{ marginBottom: "20px" }}
          className="mt-5"
        >
          <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item href="">Projets</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{ position: "absolute", right: "100px", paddingTop: "20px" }}
        >
          <Select
          style={{borderBottomColor:"#CACFD2", borderBottomWidth:"0.5px", minWidth:"150px"}}
            placeholder="Recherche"
            showSearch
            bordered={false}
            onClear={() => {
              setProjects(
                data
              );
            }}
            allowClear
            filterOption={(input, option) => 
              (option!.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            onSelect={(e) => {
              let x = data;
              setProjects(
                x.filter((item) => item.name === e)
              );
            }}
          >
            {data?.map((item) => (
              <Option key={item.name} value={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <Row gutter={24}>
        <Col xs={12} md={8} lg={8} xl={6} xxl={4}>
          <Card
            hoverable={true}
            bordered={true}
            style={{ marginBottom: 15, borderRadius: 5, height: "100px" }}
            onClick={() => {
              setCreateProject(true);
            }}
          >
            <AppstoreAddOutlined /> Ajouter un projet
          </Card>
        </Col>
        {projects.map((project, index) => (
          <Col xs={12} md={8} lg={8} xl={6} xxl={4} key={index}>
            <Badge.Ribbon text={project.etat} color={color(project.etat)}>
              <NavLink to="/projects/kanban">
                <Card
                  hoverable={true}
                  bordered={true}
                  style={{ marginBottom: 15, borderRadius: 5, height: "100px" }}
                >
                  {project.name}
                </Card>
              </NavLink>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>

      <CreateProject
        visible={createProject}
        setVisible={setCreateProject}
      ></CreateProject>
    </div>
  );
};

export default Projects;
