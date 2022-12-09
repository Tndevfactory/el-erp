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
} from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { addCaution } from "../../../features/caution/cautionSlice";
const { Option } = Select;

const CautionForm: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  forceRefresh: React.Dispatch<React.SetStateAction<number>>;
}> = ({ visible, setVisible, forceRefresh }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

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
      title="Nouveau contrat"
      width={720}
      className="CautionForm"
      onClose={onClose}
      open={visible}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="code_contrat"
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
          <Col span={12}>
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
              <Input placeholder="Code client" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="immatriculation"
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
          <Col span={12}>
            <Form.Item
              name="numero_chassis"
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
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="marque"
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
          <Col span={12}>
            <Form.Item
              name="modele"
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
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Date début contrat"
              name="debut_contrat"
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
          <Col span={12}>
            <Form.Item
              label="Date fin contrat"
              name="fin_contrat"
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
        </Row>
      </Form>
    </Drawer>
  );
};

export default CautionForm;
