import React, { useState, useCallback, useEffect } from "react";
import { Input, Button, List, Form, Tooltip } from "antd";
import { BsArrowReturnLeft } from "react-icons/bs";
import VirtualList from 'rc-virtual-list';
import { CloseOutlined } from "@ant-design/icons";

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
          <h1 className="Title">Créer un backlog de projet</h1>
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
        <p className="subTitle">
        Entrez les tâches principales de votre projet. Vous pouvez les modifier et ajouter d'autres
          plus tard.
        </p>
        <br></br>
          <span style={{ fontWeight: "bold" }}>Ajouter tâche</span>
          <Form
            form={form}
            onFinish={(values) => {
            }}
            style={{display:"flex"}}
          >
            <Form.Item
              name="task"
              style={{
                marginBottom: "0px",
                width:"60%"
              }}
            >
              <Input
                placeholder="Ajouter tâche"
                className="input"
              />
            </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "20%",
                  backgroundColor: "#28B463",
                  color: "white",
                  borderRadius: "4px",
                  borderColor: "white",
                }}
              >
                Add
              </Button>
              <Button
                onClick={() => {
                  setCurrent(3);
                }}
                style={{
                  width: "20%",
                  backgroundColor: "#5499C7",
                  color: "white",
                  borderRadius: "4px",
                }}
              >
                Next
              </Button>
          </Form>
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
