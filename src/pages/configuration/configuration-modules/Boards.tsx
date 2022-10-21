import { useState } from "react";
import { useDrop } from "react-dnd";
import Element from "./Element";

import { Card, Space } from "antd";

function Boards() {
  const [positionAData, setPositionAData] = useState([
    { name: "Station 1" },
    { name: "Station 2" },
    { name: "Station 3" },
    { name: "Station 4" },
    { name: "Station 5" },
  ]);
  const [positionBData, setPositionBData] = useState([]);
  const [positionCData, setPositionCData] = useState([]);

  const [{ isOver: isPositionAOver }, positionARef] = useDrop({
    accept: "positionAType",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });
  /*   console.log("isPositionAOver boards", isPositionAOver); */
  const styleisPositionAOver = isPositionAOver ? "bg-amber-500" : "";

  const [{ isOver: isPositionBOver }, positionBRef] = useDrop({
    accept: "positionBType",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });
  /* console.log("isPositionBOver boards", isPositionBOver); */
  const styleisPositionBOver = isPositionBOver ? "bg-green-500" : "";

  const [{ isOver: isPositionCOver }, positionCRef] = useDrop({
    accept: "positionCType",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });
  const styleisPositionCOver = isPositionCOver ? "bg-blue-500" : "";

  const moveFromPositionAtoB = (item) => {
    setPositionAData((prev) => prev.filter((_, i) => item.index !== i));
    setPositionBData((prev) => [...prev, item]);
  };

  const moveFromPositionAtoC = (item) => {
    setPositionAData((prev) => prev.filter((_, i) => item.index !== i));
    setPositionCData((prev) => [...prev, item]);
  };
  const moveFromPositionBtoC = (item) => {
    setPositionBData((prev) => prev.filter((_, i) => item.index !== i));
    setPositionCData((prev) => [...prev, item]);
  };

  const moveFromPositionCtoB = (item) => {
    setPositionCData((prev) => prev.filter((_, i) => item.index !== i));
    setPositionBData((prev) => [...prev, item]);
  };

  const moveFromPositionBtoA = (item) => {
    setPositionBData((prev) => prev.filter((_, i) => item.index !== i));
    setPositionAData((prev) => [...prev, item]);
  };
  const moveFromPositionAtoA = (item) => {
    setPositionAData((prev) => prev.filter((_, i) => item.index !== i));
    setPositionAData((prev) => [...prev, item]);
  };

  const moveFromPositionCtoA = (item) => {
    setPositionCData((prev) => prev.filter((_, i) => item.index !== i));
    setPositionAData((prev) => [...prev, item]);
  };

  return (
    <Space className="w-52 h-96 drop-shadow">
      <Card
        className={` ${styleisPositionAOver} "positionADataRef  w-52 h-96 bg-blue-600"`}
        ref={positionARef}
      >
        <div className="text-1xl text-gray-300 font-semibold p-3">
          position A
        </div>
        {positionAData.map((p, i) => (
          <Element
            item={p}
            key={i}
            elementType="positionBType"
            onDropElement={moveFromPositionAtoB}
            onInit={moveFromPositionAtoA}
            index={i}
            dropBlockName="positionARef"
          />
        ))}
      </Card>

      <Card
        className={` ${styleisPositionBOver} " w-52 h-96 bg-amber-300"`}
        ref={positionBRef}
      >
        <div className="text-1xl text-gray-600 p-3 font-semibold">
          position B
        </div>
        {positionBData.map((p, i) => (
          <Element
            item={p}
            key={i}
            elementType="positionCType"
            onDropElement={moveFromPositionBtoC}
            onInit={moveFromPositionBtoA}
            index={i}
            dropBlockName="positionBRef"
          />
        ))}
      </Card>

      <Card
        className={` ${styleisPositionCOver} " w-52 h-96 bg-green-600"`}
        ref={positionCRef}
      >
        <div className="text-1xl text-gray-300 p-3 font-semibold">
          position C
        </div>
        {positionCData.map((p, i) => (
          <Element
            item={p}
            key={i}
            elementType="positionBType"
            onDropElement={moveFromPositionCtoB}
            onInit={moveFromPositionCtoA}
            index={i}
            dropBlockName="positionCRef"
          />
        ))}
      </Card>
    </Space>
  );
}

export default Boards;
