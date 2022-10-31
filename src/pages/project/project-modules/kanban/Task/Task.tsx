import React, { useEffect, useState } from "react";
import { Card, Avatar, Col } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import "@/style/modules/Project.less";
import { useDrag } from "react-dnd";
var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const color = (etat: string): string => {
  if (etat === "Backlog") {
    return "#CACFD2";
  } else if (etat === "Doing") {
    return "#5DADE2";
  } else if (etat === "Test") {
    return "#F5B041";
  } else {
    return "#58D68D";
  }
};
const Task = ({ task }) => {
  const [visible, setVisible] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { task: task },
    end(draggedItem, monitor) {
      console.log(task.title);
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <Card
      ref={drag}
      hoverable={true}
      bordered={false}
      className="Task"
      style={{
        background:task.state==="Backlog"?"#F2F3F4":task.state==="Doing"?"#EBF5FB":task.state==="Test"?"#FEF5E7":"#EAFAF1",
        marginBottom: 10,
        borderRadius: 5,
        opacity: isDragging ? 0.1 : 1,
      }}
    >
      <div className="title" style={{ backgroundColor: color(task.state) }}>
        {task.title}
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            fontSize: "12px",
            fontWeight: "500",
            color: "#707B7C ",
            display: "flex",
            marginLeft: "2px",
          }}
        >
          <BiTimeFive
            style={{ fontSize: "15px", marginRight: "4px", marginTop: "2px" }}
          ></BiTimeFive>{" "}
          {String("2021/02/01").substr(8, 2) +
            " " +
            months[parseInt(String("2021/02/01").substr(5, 2)) - 1] +
            " - " +
            String("2021/05/01").substr(8, 2) +
            " " +
            months[parseInt(String("2021/05/01").substr(5, 2)) - 1]}
        </div>
        <Avatar.Group
          style={{
            position: "absolute",
            right: "8px",
          }}
          maxCount={2}
          maxStyle={{
            color: "",
            backgroundColor: "#D0D3D4",
          }}
        >
          <Avatar src="https://joeschmoe.io/api/v1/2" />
          <Avatar src="https://joeschmoe.io/api/v1/1" />
          <Avatar src="https://joeschmoe.io/api/v1/6" />
          {/* {members.map((member) => (
              <Avatar key={member.id} src={member.photo} />
            ))} */}
        </Avatar.Group>
      </div>
    </Card>
  );
};

export default Task;
