import React, { useEffect, useState } from 'react'
import { Col } from "antd";
import Task from '../Task/Task';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from "react-redux";
import { moveCard } from "@/features/project/projectSlice";
import { setDate } from 'date-fns';

function Column({column,tasks, setTasks, forceRefresh}) {
  const dispatch = useDispatch();
  const [{isOver}, drop ]= useDrop(()=>({
    accept:"card",
    drop:(item) => moveTask(item),
    collect:monitor=>({
        isOver: !!monitor.isOver()
      }),
  }))

  const moveTask = (item) => {
    item.task.state=column;
    setTasks([...tasks.filter(task=>task.id!==item.task.id),item.task])
}
  return (
    <div className='column' ref={drop} >
    <div className="title">{column}</div>
    {tasks.map(task=>task.state===column&&<Task task={task}/>)}
  </div>
  )
}

export default Column