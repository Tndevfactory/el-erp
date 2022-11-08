import React from "react";
import { Button, DatePicker, Space, Typography } from "antd";
import { BsArrowReturnLeft } from "react-icons/bs";
const { Title }= Typography;
const { RangePicker } = DatePicker;
const AddDates = ({ setCurrent, setDates, dates }) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Title level={3}>
        Enfin, ajoutez les dates de début et de fin du projet
        </Title>
        <BsArrowReturnLeft
          style={{
            position: "absolute",
            right: "30px",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={() => {
            setCurrent(2);
          }}
        ></BsArrowReturnLeft>
      </div>
      <Title level={5} type="secondary">
Ajoutez les dates estimées de début et de fin du projet. Vous pouvez les modifier plus tard.</Title>
      <br />
      <Title level={5}>Ajouter date</Title>
        <Space>
            <RangePicker
              className="input"
              onChange={(value, dateString) => {
                console.log(dateString);
                setDates(dateString);
              }}
            />
          <Button
            onClick={()=>{setCurrent(4)}}
          >
            Next
          </Button>
        </Space>
    </div>
  );
};

export default AddDates;
