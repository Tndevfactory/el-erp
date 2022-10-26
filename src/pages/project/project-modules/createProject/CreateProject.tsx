import React, {useState} from 'react'
import { Steps, Input, Button, Drawer, Form, Result } from "antd";
// import { GraphQLSkipDirective } from 'graphql';
import { RiUserAddLine } from "react-icons/ri";
import { MdDriveFileRenameOutline, MdDoneAll } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import BuildTeam from './BuildTeam';
import '@/style/modules/Project.less'
import CreateBacklog from './CreateBacklog';
import AddDates from './AddDate';
import { BsArrowReturnLeft } from "react-icons/bs";
import FinalStep from './FinalStep';
const { Step } = Steps;
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
        <Form onFinish={onFinish} >
          <div>
            <h1 className='Title'>D'abord, nommez votre projet</h1>
            <p className='subTitle'>
              Donnez à votre projet un nom distinct et discriptif. Vouz pouvez le modifier à tout moment.{" "}
            </p>
            <br></br>
              <span style={{ fontWeight: "bold" }}>Nom du projet</span>
              <div style={{display:"flex"}}>
              <Form.Item
                style={{
                  marginBottom: "0px",
                  width:"60%"
                }}
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
                  placeholder="Nom du projet"
                  className='input'
                />
              </Form.Item>
              <Button
                htmlType="submit"
                style={{
                  width: "20%",
                  backgroundColor: "#5499C7",
                  color: "white",
                  borderRadius: "4px",
                }}
              >
                Next
              </Button>
              </div>
          </div>
        </Form>
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
      content:(
        <FinalStep
        setCurrent={setCurrent}
        title={title}
        team={team}
        backlog={backlog}
        dates={dates}
        ></FinalStep>
      )
    },
  ];
  return (
    <Drawer
    className='CreateProject'
    title={"Créer un nouveau projet"}
    placement="right"
    size={"large"}
    onClose={() => {
      setVisible(false);
      setCurrent(0);
      setTitle("");
      setTeam([]);
      setBacklog([]);
    }}
    visible={visible}
  >
          <div>
        <div>{steps[current].content}</div>
        <Steps
          current={current}
          style={{ position: "absolute", bottom: "40px", width: "90%" }}
        >
          {steps.map((item, index) => (
            <Step key={index} icon={item.icon} />
          ))}
        </Steps>
      </div>
  </Drawer>
  )
}

export default CreateProject
