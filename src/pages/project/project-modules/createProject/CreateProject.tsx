import React, { useState } from "react";
import {
  Steps,
  Input,
  Button,
  Drawer,
  Form,
  Result,
  Typography,
  Space,
} from "antd";
// import { GraphQLSkipDirective } from 'graphql';
import { RiUserAddLine } from "react-icons/ri";
import { MdDriveFileRenameOutline, MdDoneAll } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import BuildTeam from "./BuildTeam";
import "@/style/modules/Project.less";
import CreateBacklog from "./CreateBacklog";
import AddDates from "./AddDate";
import { BsArrowReturnLeft } from "react-icons/bs";
const { Step } = Steps;
const { Title } = Typography;

const CreateProject = ({ setVisible, visible }) => {
  const [current, setCurrent] = useState(0);
  const [title, setTitle] = useState("");
  let [team, setTeam] = useState([]);
  let [backlog, setBacklog] = useState([]);
  let [dates, setDates] = useState([]);
  const onFinish = (value) => {
    setTitle(value.Title);
    setCurrent(current + 1);
  };
  const steps = [
    {
      key: 0,
      icon: <MdDriveFileRenameOutline />,
      content: (
        <Space direction="vertical">
          <Title level={3}>D'abord, nommez votre projet</Title>
          <Title level={5} type="secondary">
            Donnez à votre projet un nom distinct et discriptif. Vouz pouvez le
            modifier à tout moment.{" "}
          </Title>
          <Form onFinish={onFinish}>
            <Title level={5}>Departement</Title>

            <Form.Item
              name="departement"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le departement!",
                },
              ]}
            >
              <Input
                defaultValue={title}
                placeholder="Departement"
                className="input"
              />
            </Form.Item>
            <Title level={5}>Client</Title>

            <Form.Item
              name="client"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le client!",
                },
              ]}
            >
              <Input
                defaultValue={title}
                placeholder="Client"
                className="input"
              />
            </Form.Item>
            <Title level={5}>Titre du projet</Title>

            <Form.Item
              name="Title"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le titre du projet!",
                },
              ]}
            >
              <Input
                defaultValue={title}
                placeholder="Titre du projet"
                className="input"
              />
            </Form.Item>
            <Button
              htmlType="submit"
              // type="primary"
              style={{ position: "absolute", right: "6.5%" }}
            >
              Next
            </Button>
          </Form>
        </Space>
      ),
    },
    {
      key: 1,
      icon: <RiUserAddLine />,
      content: (
        <BuildTeam
          setCurrent={setCurrent}
          team={team}
          setTeam={setTeam}
        ></BuildTeam>
      ),
    },
    {
      key: 2,
      icon: <FaTasks />,
      content: (
        <CreateBacklog
          setCurrent={setCurrent}
          backlog={backlog}
          setBacklog={setBacklog}
        ></CreateBacklog>
      ),
    },
    {
      key: 3,
      icon: <IoIosTimer />,
      content: (
        <AddDates
          setCurrent={setCurrent}
          dates={dates}
          setDates={setDates}
        ></AddDates>
      ),
    },
    {
      key: 4,
      icon: <MdDoneAll />,
      content: (
        <Result
          status="success"
          title="Projet créé avec succès"
          extra={[
            <Button type="primary" key="console">
              Accès au projet
            </Button>,
          ]}
        />
      ),
    },
  ];
  return (
    <Drawer
      className="CreateProject"
      title={"Créer un nouveau projet"}
      placement="right"
      width={700}
      onClose={() => {
        setVisible(false);
        setCurrent(0);
        setTitle("");
        setTeam([]);
        setBacklog([]);
      }}
      open={visible}
    >
      <div>
        <div>{steps[current].content}</div>
        <Steps
          current={current}
          style={{ position: "absolute", bottom: "40px", width: "95%" }}
        >
          {steps.map((item, index) => (
            <Step key={index} icon={item.icon} />
          ))}
        </Steps>
      </div>
    </Drawer>
  );
};

export default CreateProject;
