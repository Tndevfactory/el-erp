import React, { useState } from "react";
import {
  Button,
  Space,
  Drawer,
  Input,
  Form,
  Row,
  Col,
  DatePicker,
  Select,
  Switch,
  Avatar,
  Typography,
  TimePicker,
} from "antd";
import { InboxOutlined, UserOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select;
const { Text } = Typography;
const { RangePicker} = DatePicker;
const { TextArea } = Input;
var users = [
  {
    id: "01",
    label: "Wael Machlouch",
    email: "wael.machlouch@tac-tic.net",
  },
  {
    id: "02",
    label: "Nidhal Chalbia",
    email: "nidhal.chalbia@tac-tic.net",
  },
  {
    id: "03",
    label: "Emna Ahmadi",
    email: "emna.ahmadi@tac-tic.net",
  },
];
const CreateSession: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  forceRefresh: React.Dispatch<React.SetStateAction<number>>;
}> = ({ visible, setVisible, forceRefresh }) => {
  const dispatch = useDispatch();
  var { windowWidth } = useSelector((store: any) => store.ui);
  const [form] = Form.useForm();

  const onClose = () => {
    setVisible(false);
  };
  return (
    <Drawer
      title="Ajout d'une session"
      width={windowWidth > 650 ? 600 : "90%"}
      onClose={onClose}
      open={visible}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >
      <Form layout="vertical" hideRequiredMark form={form}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="designation"
              label="Désignation"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer la désignation",
                },
              ]}
            >
              <Input placeholder="Veuillez entrer la désignation" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="domaine"
              label="Domaine "
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le type de domaine",
                },
              ]}
            >
              <Input placeholder="Veuillez entrer le type de domaine" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="date"
              label="Date"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer la date",
                },
              ]}
            >
              <RangePicker format={"DD/MM/YYYY"} onChange={() => {}} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="horaire"
              label="Horaire"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer l'horaire",
                },
              ]}
            >
              <TimePicker.RangePicker onChange={(e,dateString) => {console.log(dateString)}} style={{ width: "100%" }} format={'HH:mm'} showSecond={false} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="participation"
              label="Participation"
              rules={[
                {
                  required: true,
                  message: "Veuillez remplir ce champ",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Participation"
                options={[{
                  value: 'Présentielle',
                  label: 'Présentielle',
                },
                {
                  value: 'A distance',
                  label: 'A distance',
                },
                {
                  value: 'Mixte',
                  label: 'Mixte',
                },]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="sujet"
              label="Sujet "
            >
              <TextArea placeholder="Veuillez entrer le sujet" autoSize />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="participants" label="Liste de participants">
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Mentionner les participants"
                onChange={(e) => {
                  console.log(e);
                }}
                optionLabelProp="label"
                optionFilterProp="label"
              >
                {users.map((item) => (
                  <Option value={item.id} label={item.label} key={item.email}>
                    <Space>
                      <Avatar size="small" icon={<UserOutlined />} />
                      <span>{item.label}</span>
                      <Text type="secondary">{item.email}</Text>
                    </Space>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item style={{ textAlign: "right" }}>
              <Button htmlType="reset" style={{ marginRight: "10px" }}>
                Annuler
              </Button>
              <Button type="primary" htmlType="submit">
                Envoyer
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default CreateSession;
