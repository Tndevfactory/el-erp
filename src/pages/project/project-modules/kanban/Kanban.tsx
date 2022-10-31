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

const columns = ["Backlog", "Doing", "Test", "Finish"];
const data = {
  cards: [
    {
      id: 92,
      dateD: "2022-06-23",
      dateF: "2022-06-28",
      title: "gerer demande",
      description: null,
      state: "Backlog",
    },

    {
      id: 48,
      dateD: "2022-06-08",
      dateF: "2022-07-03",
      title: "gerer compte",
      description: "bqvdsqvdvqdvkq",
      state: "Doing",
    },
    {
      id: 49,
      dateD: "2022-06-30",
      dateF: "2022-07-04",
      title: "Admin Dashboard",
      description: "On this task we will build the admin's dashboard...",
      state: "Doing",
    },
    {
      id: 7,
      dateD: "2022-06-09",
      dateF: "2022-06-13",
      title: "Messagerie11",
      description: null,
      state: "Test",
    },
    {
      id: 9,
      dateD: "2022-06-01",
      dateF: "2022-06-09",
      title: "gerer notification",
      description: "description dhvsdh",
      state: "Test",
    },
    {
      id: 78,
      dateD: "2022-06-24",
      dateF: "2022-06-30",
      title: "gestion annonce",
      description: null,
      state: "Doing",
    },
    {
      id: 89,
      dateD: "2022-06-25",
      dateF: "2022-06-30",
      title: "gerer profile",
      description: null,
      state: "Finish",
    },

    {
      id: 94,
      dateD: "2022-08-18",
      dateF: "2022-08-27",
      title: "task135",
      description: null,
      state: "Finish",
    },
  ],
};
const Kanban = () => {
  const dispatch = useDispatch();
  let [tasks, setTasks] = useState(data.cards);
  const [refresh, forceRefresh] = useState(0);
  useEffect(() => {}, [refresh]);
  return (
    <DndProvider backend={HTML5Backend} >
      <div>
      <Breadcrumb separator=">" className="mt-5" style={{marginBottom:"20px"}}>
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Projet</Breadcrumb.Item>
        <Breadcrumb.Item href="">Titre de projet</Breadcrumb.Item>
      </Breadcrumb>
      
        <Row gutter={16} className="Kanban">
          {columns.map((column) => (
            <Col span={6}>
            <Column
              column={column}
              tasks={tasks}
              setTasks={setTasks}
              forceRefresh={forceRefresh}
            />
           </Col>
          ))}
          {/* <Col  flex={1}>
          <KanbanSideMenu/>
          </Col> */}
        </Row>
      </div>
    </DndProvider>
  );
};

export default Kanban;
