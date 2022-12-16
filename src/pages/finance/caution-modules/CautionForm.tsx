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
  Radio,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch,useSelector } from "react-redux";
import { addCaution } from "../../../features/finance/caution/cautionSlice";
const { Option } = Select;
const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
    } else if (status === "error") {
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const CautionForm: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  forceRefresh: React.Dispatch<React.SetStateAction<number>>;
}> = ({ visible, setVisible, forceRefresh }) => {
  const dispatch = useDispatch();
  var { windowWidth } = useSelector((store: any) => store.ui);
  const [form] = Form.useForm();
  const [eps, setEps] = useState(0);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const handleSubmit = (values) => {
    dispatch(
      addCaution({
        id: Math.random(),
        Nom_Projet: values.name,
        Demandeur: values.Demandeur,
        type_caution: values.type,
        DateD: moment(values.dateTime._d).format("DD/MM/YYYY"),
        Client: values.client,
        Montant: values.montant,
        ligne: values.ligne,
        Frais_mois: 20,
        Durée: values.Durée,
        Etat_main_levée: "En attente",
        Observation: values.Observation,
      })
    );
    forceRefresh(Math.random());
    setVisible(false);
    console.log(values);
  };
  return (
    <Drawer
      title="Demander une nouvelle caution"
      width={windowWidth>750?720:"90%"}
      className="CautionForm"
      onClose={onClose}
      open={visible}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >
      <Form
        layout="vertical"
        hideRequiredMark
        onFinish={handleSubmit}
        form={form}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="client"
              label="Client"
              rules={[
                {
                  required: true,
                  message: "Please choose the type",
                },
              ]}
            >
              <Select placeholder="Veuillez entrer le client">
                <Option key={0} value="Ministère de la Jeunesse et des Sports">
                  Ministère de la Jeunesse et des Sports
                </Option>
                <Option
                  key={1}
                  value="Ministère de commerce et du Développement des Exportations"
                >
                  Ministère de commerce et du Développement des Exportations
                </Option>
                <Option
                  key={2}
                  value="Société Régionale de Transport du Gouvernorat de Nabeul (SRTGN)"
                >
                  Société Régionale de Transport du Gouvernorat de Nabeul
                  (SRTGN)
                </Option>
                <Option
                  key={3}
                  value="Institut National de la Météorologie-INM"
                >
                  Institut National de la Météorologie-INM
                </Option>
                <Option
                  key={4}
                  value="L'Instance Tunisienne de l'Investissement"
                >
                  L'Instance Tunisienne de l'Investissement
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="type"
              label="type de caution "
              rules={[
                {
                  required: true,
                  message: "Please select an owner",
                },
              ]}
            >
              <Select placeholder="Veuillez entrer le type de caution">
                <Option key={0} value="Provisoire-CSP">
                  Provisoire-CSP
                </Option>
                <Option key={1} value="Définitive-CSP">
                  Définitive-CSP
                </Option>
                <Option key={2} value="Retenue de Garantie">
                  Retenue de Garantie
                </Option>
                <Option key={3} value="Avance">
                  Avance
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="name"
              label="Nom du Projet "
              rules={[
                {
                  required: true,
                  message: "Please enter user name",
                },
              ]}
            >
              <Select placeholder="Veuillez entrer le titre du projet">
                <Option key={0} value="Projet 1">
                  Projet 1
                </Option>
                <Option key={1} value="Projet 2">
                  Projet 2
                </Option>
                <Option key={2} value="Projet 3">
                  Projet 3
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="montant"
              label="Montant en dinars"
              rules={[
                {
                  required: true,
                  message: "Please choose the approver",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                placeholder="Veuillez entrer le montant"
                onBlur={(e) => {
                  if (parseFloat(e.target.value.replace(",", "")) >= 1000) {
                    form.setFieldsValue({
                      ligne: "EPS",
                    });
                  } else {
                    form.setFieldsValue({
                      ligne: "Compte courant",
                    });
                  }
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="dateTime"
              label="Date début"
              rules={[
                {
                  required: true,
                  message: "Please choose the dateTime",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
                placement="topLeft"
                onChange={(value, dateString: string) => {}}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="Durée"
              label="Durée par jour"
              rules={[
                {
                  required: true,
                  message: "Please choose the approver",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Veuillez entrer la durée du caution"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="aFaireAvant"
              label="A faire avant"
              rules={[
                {
                  required: true,
                  message: "Please choose the dateTime",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
                placement="topLeft"
                onChange={(value, dateString: string) => {}}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="ligne"
              label="Ligne"
              // tooltip={{ title: 'Tooltip with customize icon', icon: <InboxOutlined /> }}
              rules={[
                {
                  required: true,
                  message: "Please choose the approver",
                },
              ]}
            >
              <Radio.Group defaultValue={eps}>
                <Radio value={"EPS"}> Ligne eps </Radio>
                <Radio value={"Compte courant"}> Compte courant </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="files"
              label="Attachements"
              rules={[
                {
                  required: true,
                  message: "Please choose the type",
                },
              ]}
            >
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Cliquez ou faites glisser le fichier dans cette zone pour le
                  télécharger
                </p>
                <p className="ant-upload-hint">
                  Merci d'attacher le fichier ..., ... et ...
                </p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ textAlign: "right" }}>
          <Button
            className="btnAnnuler"
            htmlType="reset"
            style={{ marginRight: "10px" }}
          >
            Annuler
          </Button>
          <Button className="btnModofier" htmlType="submit">
            Envoyer
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CautionForm;
