import React, { useEffect, useState } from "react";
import { Drawer, Form, Button, Input, DatePicker, Select } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;
const CreateTask = ({setVisible, visible }) => {
  const token = localStorage.getItem("token");
  const [form] = Form.useForm();
  let [options, setOptions] = useState([]);
  useEffect(() => {
  }, []);
  return (
    <Drawer
      className="CreateTask"
      title={"Ajouter une tâche"}
      placement="right"
      onClose={() => {
        setVisible(false);
      }}
      open={visible}
    >
      <Form
        // onFinish={(values) => {
        //   let data = {
        //     name: values.name,
        //     details: values.description,
        //     dateDebut: values.date[0].format("YYYY-MM-DD"),
        //     dateFin: values.date[1].format("YYYY-MM-DD"),
        //     project_id: parseInt(id),
        //     members: values.members,
        //   };
        // }}
      >
        <div>
          <span style={{ fontWeight: "bold" }}>Nom de tâche</span>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Veuillez entrer le nom de tâche!",
              },
            ]}
          >
            <Input placeholder="Nom de tâche *" />
          </Form.Item>
          <span style={{ fontWeight: "bold" }}>Description de tâche</span>
          <Form.Item name="description" rules={[]}>
            <TextArea placeholder="Description" />
          </Form.Item>
          <span style={{ fontWeight: "bold" }}>Date de debut et de fin de tâche</span>
          <Form.Item
            name="date"
            rules={[
              {
                required: true,
                message: "Veuillez entrer les dates dates de debut et de fin!",
              },
            ]}
          >
            <RangePicker
              style={{ width: "100%" }}
              onChange={(value, dateString) => {
                console.log(dateString);
              }}
            />
          </Form.Item>
          <span style={{ fontWeight: "bold" }}>Selecter les membres</span>
          <Form.Item name="members">
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Membres"
              optionLabelProp="label"
            >
              {options.map((item) => (
                <Option key={item.id} value={item.id} label={item.value}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "30%",
              left: "70%",
              borderRadius: "4px",
            }}
          >
            Ajouter
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default CreateTask;
