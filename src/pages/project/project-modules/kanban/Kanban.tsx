import React, { useEffect, useState } from "react";
import "../../../../style/modules/Project.less";
import { Card, Avatar, Col, Row, Breadcrumb } from "antd";
import { BiTimeFive } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import "@/style/modules/Project.less";
import Column from "./Column/Column";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import KanbanSideMenu from "./kanbanSideMenu/KanbanSideMenu";
import moment from "moment";
const columns = ["Backlog", "Doing", "Test", "Finish"];
const data = {
  cards: [
    {
      id: 92,
      dateD: "06-06-2022",
      dateF: "06-08-2022",
      title: "gerer demande",
      description: null,
      state: "Backlog",
    },

    {
      id: 48,
      dateD: "06-05-2022",
      dateF: "07-06-2022",
      title: "gerer compte",
      description: "bqvdsqvdvqdvkq",
      state: "Doing",
    },
    {
      id: 49,
      dateD: "06-05-2022",
      dateF: "07-06-2022",
      title: "Admin Dashboard",
      description: "On this task we will build the admin's dashboard...",
      state: "Doing",
    },
    {
      id: 7,
      dateD: "06-05-2022",
      dateF: "06-06-2022",
      title: "Messagerie11",
      description: null,
      state: "Test",
    },
    {
      id: 9,
      dateD: "06-05-2022",
      dateF: "06-06-2022",
      title: "gerer notification",
      description: "To be, or not to be, that is a question: Whether it is nobler in the mind to suffer. The slings and arrows of outrageous fortune Or to take arms against a sea of troubles",
      state: "Test",
    },
    {
      id: 78,
      dateD: "01-05-2022-2022",
      dateF: "06-05-2022",
      title: "gestion annonce",
      description: null,
      state: "Doing",
    },
    {
      id: 89,
      dateD: "06-05-2022",
      dateF: "06-06-2022",
      title: "gerer profile",
      description: null,
      state: "Finish",
    },

    {
      id: 94,
      dateD: "08-06-2022",
      dateF: "08-07-2022",
      title: "task135",
      description: null,
      state: "Finish",
    },
  ],
};
const Kanban = () => {
  const dispatch = useDispatch();
  let [tasks, setTasks] = useState(data.cards.map((item, index) =>
    Object.assign({}, item, {
      lastMove: moment().valueOf(),
  })));
  let [backlogTasks, setBacklogTasks] = useState([]);
  let [doingTasks, setDoingTasks] = useState([]);
  let [testTasks, setTestTasks] = useState([]);
  let [finishTasks, setFinishTasks] = useState([]);
  const [refresh, forceRefresh] = useState(0);

  const moveTask = (item,column) => {
    if(item.task.state!==column){
      item.task.state=column;
      item.task.lastMove=moment().valueOf()
      setTasks([...tasks.filter(task=>task.id!==item.task.id),item.task])
    }
  }
  useEffect(() => {
    console.log(tasks)
    setBacklogTasks(tasks.filter(item=>item.state==="Backlog").sort((a, b) => a.lastMove - b.lastMove));
    setDoingTasks(tasks.filter(item=>item.state==="Doing").sort((a, b) => a.lastMove - b.lastMove));
    setTestTasks(tasks.filter(item=>item.state==="Test").sort((a, b) => a.lastMove - b.lastMove));
    setFinishTasks(tasks.filter(item=>item.state==="Finish").sort((a, b) => a.lastMove - b.lastMove));
  }, [tasks]);
  return (
    <DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
      <div>
      <Breadcrumb separator=">" className="mt-5" style={{marginBottom:"20px"}}>
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="/projects">Projet</Breadcrumb.Item>
        <Breadcrumb.Item href="">Titre de projet</Breadcrumb.Item>
      </Breadcrumb>
      
        <Row gutter={16} className="Kanban">
          {columns.map((column) => (
            <Col flex={100}>
            <Column
              column={column}
              tasks={column==="Backlog"?backlogTasks:column==="Doing"?doingTasks:column==="Test"?testTasks:finishTasks}
              // setTasks={column==="Backlog"?setBacklogTasks:column==="Doing"?setDoingTasks:column==="Test"?setTestTasks:setFinishTasks}
              moveTask={moveTask}
              // setTasks={setTasks}
              // forceRefresh={forceRefresh}
            />
           </Col>
          ))}
          <Col  flex={1}>
          <KanbanSideMenu/>
          </Col>
        </Row>
      </div>
    </DndProvider>
  );
};

export default Kanban;
