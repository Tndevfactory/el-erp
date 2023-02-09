import React, { useState } from "react";
import {
  Button,
  Drawer,
  Input,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Card,
} from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
const { Option } = Select;

const CreateCharge: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  forceRefresh: React.Dispatch<React.SetStateAction<number>>;
}> = ({ visible, setVisible, forceRefresh }) => {
  var { windowWidth } = useSelector((store: any) => store.ui);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [indexForm, setIndexForm] = useState<any[]>([0]);

  const onClose = () => {
    setVisible(false);
  };

  const removeForm = (i) => {
    const r = [...indexForm];
    r.pop();

    setIndexForm(r);
  };
  const addForm = (i) => {
    console.log("indexForm", indexForm);
    console.log("index", i);
    setIndexForm([...indexForm, i]);
  };
  const handleSubmit = (values) => {
    console.log("form-data", values);

    forceRefresh(Math.random());
    setVisible(false);
    // console.log(values);
  };
  return (
    <Drawer
      title="Nouvelle(s) note(s) de frais"
      width={windowWidth > 750 ? 720 : "90%"}
      className="CautionForm"
      onClose={onClose}
      open={visible}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >
      <Form layout="vertical" hideRequiredMark onFinish={handleSubmit}>
        {indexForm.map((v, i) => (
          <Card
            style={{
              backgroundColor: "#eee",
              paddingTop: "1rem",
              marginBottom: "2rem",
            }}
            key={i}
            title={`Note de frais N° ${i + 1}`}
          >
            <Row gutter={16}>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item
                  name={`${i}-code_contrat`}
                  label="Code contrat"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer le code contrat",
                    },
                  ]}
                >
                  <Input placeholder="Code contrat" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item
                  name={`${i}-code_client`}
                  label="Code client"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer le code client",
                    },
                  ]}
                >
                  <Input placeholder="Code client" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item
                  name={`${i}-immatriculation`}
                  label="Immatriculation"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer l'immatriculation",
                    },
                  ]}
                >
                  <Input placeholder="Immatriculation" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item
                  name={`${i}-numero_chassis`}
                  label="N° de Chassis"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer le numero de Chassis",
                    },
                  ]}
                >
                  <Input placeholder="N° de Chassis" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item
                  name={`${i}-marque`}
                  label="Marque"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer la marque",
                    },
                  ]}
                >
                  <Select placeholder="Marque">
                    <Option key={0} value="Marque 1">
                      Marque 1
                    </Option>
                    <Option key={1} value="Marque 2">
                      Marque 2
                    </Option>
                    <Option key={2} value="Marque 3">
                      Marque 3
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item
                  name={`${i}-modele`}
                  label="Modèle"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer le modèle",
                    },
                  ]}
                >
                  <Select placeholder="Modèle">
                    <Option key={0} value="Modèle 1">
                      Modèle 1
                    </Option>
                    <Option key={1} value="Modèle 2">
                      Modèle 2
                    </Option>
                    <Option key={2} value="Modèle 3">
                      Modèle 3
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item
                  label="Date début contrat"
                  name={`${i}-debut_contrat`}
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer la date  de début contrat",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    format={"DD/MM/YYYY"}
                    placement="topLeft"
                    onChange={(value, dateString: string) => {}}
                    placeholder="Date début contrat"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item
                  label="Date fin contrat"
                  name={`${i}-fin_contrat`}
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer la date  de fin contrat",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    format={"DD/MM/YYYY"}
                    placement="topLeft"
                    onChange={(value, dateString: string) => {}}
                    placeholder="Date fin contrat"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        ))}
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button
            style={{ width: "100%", marginTop: "10px", marginBottom: "20px" }}
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              addForm(indexForm.length);
            }}
          >
            Ajouter note de frais
          </Button>
          <Button
            style={{
              width: "100%",
              marginTop: "10px",
              marginBottom: "20px",
              backgroundColor: indexForm.length < 2 ? "lightgray" : "#E80B2C",
              color: "white",
            }}
            icon={<MinusOutlined />}
            onClick={() => {
              removeForm(indexForm.length - 1);
            }}
            disabled={indexForm.length < 2}
          >
            Supprimer note de frais
          </Button>
        </div>

        <Form.Item
          style={{
            width: "100%",
            textAlign: "right",
            marginRight: "10px",
          }}
        >
          <Button htmlType="reset" style={{ marginRight: "10px" }}>
            Annuler
          </Button>
          <Button type="primary" htmlType="submit">
            Envoyer
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateCharge;
