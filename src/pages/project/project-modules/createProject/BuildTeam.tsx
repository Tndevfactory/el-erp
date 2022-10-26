import React, { useEffect, useState, useCallback } from "react";
import { Button, AutoComplete, Tooltip, Form, Avatar, List } from "antd";
import { BsArrowReturnLeft } from "react-icons/bs";
import { UserDeleteOutlined } from "@ant-design/icons";
import VirtualList from 'rc-virtual-list';
const BuildTeam = ({ setCurrent, team, setTeam }) => {
  const [form] = Form.useForm();
  let [options, setOptions] = useState([]);

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
      <div>
        <div style={{ display: "flex" }}>
          <h1 className="Title">Inviter votre équipe</h1>
          <BsArrowReturnLeft
            style={{
              position: "absolute",
              right: "30px",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => {
              setCurrent(0);
            }}
          ></BsArrowReturnLeft>
        </div>
        <p className="subTitle">
         Constituez votre équipe. Vous pouvez le modifier et en ajouter plus tard.
        </p>
        <br></br>
          <span style={{ fontWeight: "bold" }}>Ajouter employé</span>
          <Form
            style={{display:"flex"}}
            form={form}
            onFinish={(values) => {
            }}
          >
            <Form.Item
              name="member"
              style={{
                width:"60%"
              }}
            >
              <AutoComplete
                className='input'
                options={options}
                placeholder="Employe"
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
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
                  setCurrent(2);
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
        <List >
      <VirtualList
        data={team}
        height={280}
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
  );
};

export default BuildTeam;
