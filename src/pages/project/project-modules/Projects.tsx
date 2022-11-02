import React, { useState } from "react";
import { Card, Col, Row, Badge, Breadcrumb } from "antd";
import CreateProject from './createProject/CreateProject';
import { NavLink, useNavigate } from "react-router-dom";
import { AppstoreAddOutlined } from "@ant-design/icons";
const Projects = () => {
  let navigate = useNavigate();
  const [createProject, setCreateProject] = useState(false);
  let [projects, setProjects] = useState([
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
  ]);
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
      <Breadcrumb separator=">" style={{marginBottom:"20px"}} className="mt-5">
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Projets</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={24}>
        <Col xs={12} md={8} lg={8} xl={6} xxl={4}>
          <Card
            hoverable={true}
            bordered={false}
            style={{ marginBottom: 15, borderRadius: 5, height: "100px" }}
            onClick={() => {
              setCreateProject(true);
            }}
          >
            <AppstoreAddOutlined /> Ajouter un projet
          </Card>
        </Col>
        {projects.map((project) => (
          <Col xs={12} md={8} lg={8} xl={6} xxl={4}>
            <Badge.Ribbon text={project.etat} color={color(project.etat)}>
              <NavLink to="/projects/kanban">
                <Card
                  hoverable={true}
                  bordered={false}
                  style={{ marginBottom: 15, borderRadius: 5, height: "100px" }}
                >
                  {project.name}
                </Card>
              </NavLink>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
      <CreateProject visible={createProject} setVisible={setCreateProject}></CreateProject>
    </div>
  );
};

export default Projects;
