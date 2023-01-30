import { DeleteOutlined } from "@ant-design/icons";
import { Card, Layout } from "antd";

import React from "react";
import { useDrag } from "react-dnd";
const { Content } = Layout;
const Element = ({
  item,
  elementType,
  onDropElement,
  index,
  dropBlockName,
  onInit,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: elementType,

    item: () => ({ ...item, index }),

    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      // console.log("dropBlockName", dropBlockName);
      // console.log("elementType", elementType);
      if (item && dropResult) {
        onDropElement(item);
      }
    },

    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  return (
    <Content
      className="p-1 mb-2
       bg-zinc-400  cursor-pointer
       text-white drop-shadow flex justify-between items-center"
      ref={dragRef}
      id="1"
    >
      <div onClick={(e) => alert("clicked")} className="bg-transparent flex-1">
        {item.name}
      </div>
      <DeleteOutlined
        className="text-red-100 pl-1"
        title="reset"
        onClick={onInit}
      />
    </Content>
  );
};

export default Element;
