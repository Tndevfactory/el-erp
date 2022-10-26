import React from "react";
import { Button, DatePicker, Form } from "antd";
import { BsArrowReturnLeft } from "react-icons/bs";
const { RangePicker } = DatePicker;
const AddDates = ({ setCurrent, setDates, dates }) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <h1 className="Title">
        Enfin, ajoutez les dates de début et de fin du projet
        </h1>
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
      <p className="subTitle">Ajoutez les dates estimées de début et de fin du projet. Vous pouvez les modifier plus tard.</p>
      <br />
      <span style={{ fontWeight: "bold" }}>Ajouter date</span>
        <Form
          onFinish={(values) => {
            setCurrent(4);
          }}
          style={{display:"flex"}}
        >
          <Form.Item
            name="date"
            rules={[
              {
                required: true,
                message: "Veuillez saisir les dates estimées de début et de fin du projet!",
              },
            ]}
            style={{
                width:"60%"
              }}
          >
            <RangePicker
              className="input"
              onChange={(value, dateString) => {
                console.log(dateString);
                setDates(dateString);
              }}
              style={{
                width:"100%"
              }}
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
        </Form>
    </div>
  );
};

export default AddDates;
