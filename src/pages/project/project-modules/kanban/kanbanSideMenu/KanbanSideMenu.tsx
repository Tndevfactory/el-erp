import React, { useState } from "react";
import { Menu, Badge, Statistic } from "antd";
import { MessageOutlined, CalendarOutlined } from "@ant-design/icons";
import { HiOutlineUsers, HiOutlineArchive } from "react-icons/hi";
import { MdAddTask } from "react-icons/md";
import { BsKanban } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { ImStatsBars } from "react-icons/im";
import CreateTask from "./CreateTask";
import "@/style/modules/Project.less"
import ChatGroup from "./ChatGroup";
import ProjectTeam from "./ProjectTeam";
import Statistics from "./Statistics";
import Settings from "./Settings";

const KanbanSideMenu = () => {
  const [createTask, setCreateTask] = useState(false);
  const [chatGroup, setChatGroup] = useState(false);
  const [projectTeam, setProjectTeam] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [settings, setSettings] = useState(false);
  return (
    <div>
      <Menu
        className="KanbanSideMenu"
        style={{ borderRadius:"5px", width:"60px"}}  
        mode="inline"
        inlineCollapsed={true}
      >
        <Menu.Item key="0" icon={<BsKanban />}>
          kanban table
        </Menu.Item>
          <Menu.Item
            key="1"
            icon={<MdAddTask />}
            onClick={() => {
              setCreateTask(true)
            }}
          >
            Add Task
          </Menu.Item>
        <Menu.Item
          key="2"
          icon={<HiOutlineUsers />}
          onClick={() => {
            setProjectTeam(true)
          }}
        >
          Project Team
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={
            <Badge
              count={1}
              size="small"
              style={{ fontSize: "8px", marginTop: "7px" }}
            >
              <MessageOutlined />
            </Badge>
          }
          onClick={() => {
            setChatGroup(true)
          }}
        >
          Groupe messaging
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<ImStatsBars />}
          onClick={() => {
            setStatistics(true)
          }}
        >
          Project statistics
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={<CalendarOutlined />}
          onClick={() => {
          }}
        >
          Project Calendar
        </Menu.Item>
          <Menu.Item
            key="6"
            icon={<AiOutlineSetting />}
            onClick={() => {
              setSettings(true)
            }}
          >
            Project Setting
          </Menu.Item>
        <Menu.Item
          key="7"
          icon={<HiOutlineArchive />}
          onClick={() => {
          }}
        >
          Project Archive
        </Menu.Item>
      </Menu>
      <CreateTask visible={createTask} setVisible={setCreateTask}/>
      <ProjectTeam setVisible={setProjectTeam} visible={projectTeam}/>
      <ChatGroup visible={chatGroup} setVisible={setChatGroup}/>
      <Statistics visible={statistics} setVisible={setStatistics}/>
      <Settings visible={settings} setVisible={setSettings}/>
    </div>
  );
};

export default KanbanSideMenu;
