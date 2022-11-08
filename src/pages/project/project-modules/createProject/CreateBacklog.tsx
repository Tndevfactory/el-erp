import React, { useState, useCallback, useEffect } from "react";
import { Input, Button, List, Form, Tooltip, Typography, Space } from "antd";
import { BsArrowReturnLeft } from "react-icons/bs";
import VirtualList from 'rc-virtual-list';
import { CloseOutlined } from "@ant-design/icons";
const { Title } = Typography;
const CreateBacklog = ({ setCurrent, backlog, setBacklog }) => {
  const [form] = Form.useForm();
  const appendData = () => {
    fetch('https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setBacklog(backlog.concat(body.results));
        console.log(backlog.concat(body.results));
      });
  };

  useEffect(() => {
    appendData();
  }, []);
  return (
    <div>
      <div>
        <div style={{ display: "flex" }}>
          <Title level={3}>Créer le backlog de projet</Title>
          <BsArrowReturnLeft
            style={{
              position: "absolute",
              right: "30px",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => {
              setCurrent(1);
            }}
          ></BsArrowReturnLeft>
        </div>
        <Title level={5} type="secondary">
        Entrez les tâches principales de votre projet. Vous pouvez les modifier et ajouter d'autres
          plus tard.
        </Title>
        <Title level={5}>Ajouter tâche</Title>
        <Space>
              <Input
                placeholder="Ajouter tâche"
                className="input"
              />
              <Button
                type="primary"
                htmlType="submit"
              >
                Add
              </Button>
              <Button
                onClick={() => {
                  setCurrent(3);
                }}
              >
                Next
              </Button>
        </Space>
          <br />
          <br />
          <List >
      <VirtualList
        data={backlog}
        height={250}
        itemHeight={47}
        itemKey="email"
      >
        {(item) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.name.last}</a>}
            />
            <Tooltip title='Supprimer'>
                <CloseOutlined className="deleteTask"/>
            </Tooltip>
          </List.Item>
        )}
      </VirtualList>
    </List>
      </div>
    </div>
  );
};

export default CreateBacklog;
