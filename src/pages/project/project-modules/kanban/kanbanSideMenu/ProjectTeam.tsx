import React, { useEffect, useState, useCallback } from "react";
import {
  Drawer,
  Button,
  AutoComplete,
  List,
  Avatar,
  Form,
  Tooltip,
} from "antd";
import axios from "axios";
import VirtualList from "rc-virtual-list";
import { UserDeleteOutlined } from "@ant-design/icons";
const ProjectTeam = ({ setVisible, visible }) => {
  const token = localStorage.getItem("token");
  const isEmployee = localStorage.getItem("role") === "1";
  const [form] = Form.useForm();
  let [options, setOptions] = useState([]);
  let [name, setName] = useState("");
  let [team, setTeam] = useState([]);
  const appendData = () => {
    fetch('https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setTeam(team.concat(body.results));
        console.log(team.concat(body.results));
      });
  };

  useEffect(() => {
    appendData();
  }, []);
  return (
    <Drawer
      className="ProjectTeam"
      title={"Equipe de projet"}
      placement="right"
      onClose={() => {
        setVisible(false);
      }}
      visible={visible}
    >
        <Form
          form={form}
        >
          <span style={{ fontWeight: "bold" }}>Ajouter un employé</span>
          <div style={{ display: "flex" }}>
            <Form.Item
              name="selectEmploye"
              style={{
                width: "80%",
              }}
              rules={[
                {
                  required: true,
                  message: "Please select member!",
                },
              ]}
            >
              <AutoComplete options={options} placeholder="Employe" />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{
                width: "20%",
              }}
            >
              Add
            </Button>
          </div>
        </Form>
      <div style={{ marginTop: "20px" }}>
        <span style={{ fontWeight: "bold" }}>Equipe de projet</span>
        <List >
      <VirtualList
        data={team}
        height={420}
        itemHeight={42}
        itemKey="email"
      >
        {(item) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name.last}</a>}
              description={item.email}
            />
            <Tooltip title='Supprimer'>
            <UserDeleteOutlined className="deleteMember"/>
            </Tooltip>
          </List.Item>
        )}
      </VirtualList>
    </List>
      </div>
    </Drawer>
  );
};

export default ProjectTeam;
