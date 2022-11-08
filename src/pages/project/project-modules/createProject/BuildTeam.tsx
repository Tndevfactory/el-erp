import React, { useEffect, useState, useCallback } from "react";
import { Button, AutoComplete, Tooltip, Form, Avatar, List, Typography, Select, Row, Col, Space } from "antd";
import { BsArrowReturnLeft } from "react-icons/bs";
import { UserDeleteOutlined } from "@ant-design/icons";
import VirtualList from 'rc-virtual-list';
const { Title } = Typography;
const { Option } = Select;
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
      <div >
        <div style={{ display: "flex" }}>
          <Title level={3} >Inviter votre équipe</Title>
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
        <Title level={5} type='secondary'>
         Constituez votre équipe. Vous pouvez le modifier et en ajouter plus tard.
        </Title>
        <Title level={5} >Ajouter employé</Title>
        <Space>
          <Select
            placeholder="Ajouter des collaborateurs  "
            showSearch
            onClear={() => {

            }}
            allowClear
            filterOption={(input, option) => 
              (option!.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            onSelect={(e) => {
            }}
          >
            {['Wael machlouch','Bassem soua','Emna ahmadi']?.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
          <Button
                type="primary"
                htmlType="submit"
              >
                Add
              </Button>
          <Button
                onClick={() => {
                  setCurrent(2);
                }}
              >
                Next
              </Button>
      </Space>
      <br />
      <br />

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
