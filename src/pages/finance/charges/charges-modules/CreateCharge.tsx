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
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
const { TextArea } = Input;
const props: UploadProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
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
  const [projects, setProjects] = useState<any[]>([
    {
      id: 1,
      titre: "Installation serveur rs523",
      date: "2022-05-01",
    },
    {
      id: 2,
      titre: "Installation serveur linux adr547",
      date: "2022-02-06",
    },
    {
      id: 3,
      titre: "Installation serveur windows 5847tr",
      date: "2022-05-01",
    },
    {
      id: 4,
      titre: "Installation serveur plc-iot-98",
      date: "2022-05-01",
    },
    {
      id: 5,
      titre: "Autres frais",
      date: "2022-05-01",
    },
  ]);
  const [frais, setFrais] = useState<any[]>([
    {
      titre_frais: "Déplacement taxi",
      description_frais: "taxi pour rencontrer le client ",
      montant_frais: 12.52,
      date_frais: "20-06-2022",
      file_preuve_frais: "capture_image_compteur",
      remboursement_frais: "en cours de traitement",
      date_remboursement_frais: "28-05-2022",
      titre_projet: "Installation serveur rs523",
      projet_id: 1,
      user_name: "Karim ben Ahmed",
      user_id: 1,
    },
  ]);

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
                  name={`${i}-titre_frais`}
                  label="Titre"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer le titre de frais",
                    },
                  ]}
                >
                  <Input placeholder="titre de frais" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item
                  name={`${i}-montant_frais`}
                  label="Montant"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer le montant de frais",
                    },
                  ]}
                >
                  <Input placeholder="montant de frais" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item
                  label="Date"
                  name={`${i}-date_frais`}
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer la date de frais",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    format={"DD/MM/YYYY"}
                    placement="topLeft"
                    onChange={(value, dateString: string) => {}}
                    placeholder="date de frais"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item
                  name={`${i}-file_preuve_frais`}
                  label="Fichier"
                  rules={[
                    {
                      required: false,
                      message: "Veuillez télécharger une piéce justificative",
                    },
                  ]}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>
                      Ajouter piéce justificative
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item
                  name={`${i}-titre_projet`}
                  label="Projet"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez selectionner le titre du projet",
                    },
                  ]}
                >
                  <Select placeholder="titre_projet">
                    {projects.map((v, i) => (
                      <Option key={v.id} value={v.titre}>
                        {v.titre}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Form.Item
                  name={`${i}-description_frais`}
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer une description de frais",
                    },
                  ]}
                >
                  <TextArea rows={2} placeholder="description de frais" />
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
