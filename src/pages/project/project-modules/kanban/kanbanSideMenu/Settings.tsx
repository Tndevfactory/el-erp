import React, { useState } from "react";
import moment from "moment";
import { Drawer, Form, Input, Button, DatePicker, Popconfirm } from "antd";
import { HiOutlineArchive } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;
const Settings = ({
  setVisible,
  visible
}) => {
  const token = localStorage.getItem("token");
  let navigate = useNavigate();
  let [date, setDate] = useState([
    // controlledBoard.dateDebut,
    // controlledBoard.dateFin,
  ]);
  return (
    <Drawer
      className="ProjectSettings"
      title={"Paramétrage du projet"}
      placement="right"
      onClose={() => {
        setVisible(false);
        // forceUpdate(Math.random());
      }}
      visible={visible}
    >
      <Form
        initialValues={{
        //   title: controlledBoard?.name,
        }}
        onFinish={(values) => {
          let data = {
            title: values.title,
          };
        }}
      >
        <span style={{ fontWeight: "bold" }}>Modifier le titre du projet</span>
        <div style={{ display: "flex" }}>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Veuillez entrer le nouveau titre du projet!",
              },
            ]}
            style={{ width: "80%" }}
          >
            <Input placeholder="Nouveau titre" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "20%",
            }}
          >
            Edit
          </Button>
        </div>
      </Form>
      <Form
        initialValues={{
        //   date: controlledBoard?.dateDebut
        //     ? [
        //         moment(controlledBoard?.dateDebut, "YYYY-MM-DD"),
        //         moment(controlledBoard?.dateFin, "YYYY-MM-DD"),
        //       ]
        //     : null,
        }}
        onFinish={(values) => {
          let data = {
            dateDebut: date[0],
            dateFin: date[1],
          };
        }}
      >
        <span style={{ fontWeight: "bold" }}>Modifier les dates du projet</span>
        <div style={{ display: "flex" }}>
          <Form.Item
            name="date"
            rules={[
              {
                required: true,
                message: "Veuillez entrer les nouveaux dates !",
              },
            ]}
            style={{ width: "80%" }}
          >
            <RangePicker
              style={{ width: "100%" }}
              onChange={(value, dateString) => {
                setDate([dateString[0], dateString[1]]);
              }}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "20%",
            }}
          >
            Edit
          </Button>
        </div>
      </Form>
      <Popconfirm
        title="Êtes-vous sûr d'archiver ce projet?"
        onConfirm={() => {
        }}
        onCancel={() => {}}
        okText="Oui"
        cancelText="Non"
        placement="bottom"
      >
        <div className="archiveProject">
          <span style={{ fontWeight: "bold" }}>Archiver le projet</span>
          <div>
            <HiOutlineArchive
              style={{ marginLeft: "10px", fontSize: "20px" }}
            ></HiOutlineArchive>
          </div>
        </div>
      </Popconfirm>
    </Drawer>
  );
};

export default Settings;
