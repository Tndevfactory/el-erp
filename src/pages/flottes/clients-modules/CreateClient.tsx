import React, { useState } from "react";
import {
  Button,
  Space,
  Drawer,
  Input,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  InputNumber,
  Upload,
  UploadProps,
  Radio
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import { addClient, IClient } from "@/features/flotte/client/flotteClientSlice";
const { Option } = Select;

function CreateClient({ visible, setVisible, forceRefresh }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onClose = () => {
    setVisible(false);
  };
  const handleSubmit = (values) => {
    dispatch(
      addClient({
        code_dossier: "xxxxxxxx",
        code_client: values.code_client,
        telephone: values.telephone,
        designation: values.designation,
      })
    );
    forceRefresh(Math.random());
    setVisible(false);
    console.log(values)
  };
  return (
    <Drawer
      title="Ajout d'un client"
      width={500}
      className="CautionForm"
      onClose={onClose}
      open={visible}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >
      <Form layout="vertical" hideRequiredMark onFinish={handleSubmit} form={form}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="code_client"
              label="Code client"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le code client",
                },
              ]}
            >
              <Input placeholder="Veuillez entrer le code client"/>
            </Form.Item>
          </Col>
          </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="designation"
              label="Désignation "
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le type de caution",
                },
              ]}
            >
              <Input placeholder="Veuillez entrer le type de caution"/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Téléphone "
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le numéro",
                },
              ]}
            >
              <Input placeholder="Veuillez entrer le numéro"/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="adresse"
              label="Adresse"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer l'adresse",
                },
              ]}
            >
              <Input placeholder="Veuillez entrer l'adresse"/>
            </Form.Item>
          </Col>
        </Row>
        
        <Form.Item style={{ textAlign: "right" }}>
          <Button className="btnAnnuler" htmlType="reset" style={{ marginRight: "10px" }}>
            Annuler
          </Button>
          <Button type="primary" htmlType="submit">
            Envoyer
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default CreateClient;
