import React, { useState, useEffect } from "react";
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
import { addCaution } from "../../../features/caution/cautionSlice";
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
function DetailVehicule({ visible, setVisible, vehicule, modify, setModify, forceRefresh }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [fields, setFields] = useState([])

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setModify(false)
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
        ligne:values.ligne,
        Frais_mois: 20,
        Durée: values.Durée,
        Etat_main_levée: "En attente",
        Observation: values.Observation,
      })
    );
    forceRefresh(Math.random());
    setVisible(false);
    console.log(values)
  };
  useEffect(() => {
    if (visible) {
      setFields([
        {
          name: ['immatriculation'],
          value: vehicule.immatriculation,
        },
        {
          name: ['modele'],
          value: vehicule.modele,
        },
        {
          name: ['marque'],
          value: vehicule.marque,
        },
        {
          name: ['numero_chassis'],
          value: vehicule.numero_chassis,
        },
        {
          name: ['puissance_fiscale'],
          value: vehicule.puissance_fiscale,
        },
        {
          name: ['puissance_cylindrée'],
          value: vehicule.puissance_cylindrée,
        },
        {
          name: ['type_carburant'],
          value: "Essence",
        },
        {
          name: ['kilometrage_initial'],
          value: "25000",
        },
        {
          name: ['nombre_places'],
          value: "5",
        },
        {
          name: ['echeance_taxe'],
          value: moment(vehicule.echeance_taxe, 'DD/MM/YYYY'),
        },
        {
          name: ['echeance_assurance'],
          value: moment(vehicule.echeance_assurance, 'DD/MM/YYYY'),
        },
        {
          name: ['echeance_visite'],
          value: moment(vehicule.echeance_visite, 'DD/MM/YYYY'),
        },
      ])
    }
  }, [vehicule])
  return (
    <Drawer
      title={modify?"Modifier véhicule":"Détail de véhicule"}
      width={720}
      className="CautionForm"
      onClose={onClose}
      open={visible}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >
      <Form layout="vertical" hideRequiredMark onFinish={handleSubmit} form={form} fields={fields} disabled={!modify}>
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
              <Input placeholder="Immatriculation"/>
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
              <Input placeholder="N° de Chassis"/>
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
              name="puissance_fiscale"
              label="Puissance fiscale"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer la puissance fiscale",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Puissance fiscale"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="puissance_cylindrée"
              label="Puissance cylindrée"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer la puissance cylindrée",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Puissance cylindrée"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
        <Col span={12}>
            <Form.Item
              label="Type du carburant"
              name="type_carburant"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer la Type du carburant",
                },
              ]}
            >
                   <Select placeholder="Type du carburant">
                <Option key={0} value="Essence">
                  Essence
                </Option>
                <Option key={1} value="Diesel">
                  Diesel
                </Option>
                <Option key={2} value="Electrique">
                  Electrique
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="kilometrage_initial"
              label="kilométrage initial"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le kilométrage initial",
                },
              ]}
            >
               <InputNumber
                style={{ width: "100%" }}
                placeholder="kilométrage initial"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
        <Col span={12}>
            <Form.Item
              name="nombre_places"
              label="Nombre de places"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le nombre de places",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Nombre de places"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="echeance_taxe"
              label="Echéance de taxe"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer la date d'echéance de taxe",
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
        </Row>
        <Row gutter={16}>
        <Col span={12}>
            <Form.Item
              name="echeance_assurance"
              label="Echéance de l'assurance"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer la date d'echéance de l'assurance",
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
          <Col span={12}>
            <Form.Item
              name="echeance_visite"
              label="Echéance de visite technique"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer la date d'echéance de visite technique",
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
        </Row>
        <Row gutter={16}>
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
                  Merci d'attacher les fiches de taxe, d'assurance  et de visite technique
                </p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>
        {modify&&
        <Form.Item style={{ textAlign: "right" }}>
          <Button className="btnAnnuler" onClick={()=>{setModify(false)}} style={{ marginRight: "10px" }}>
            Annuler
          </Button>
          <Button type="primary" htmlType="submit">
            Envoyer
          </Button>
        </Form.Item>}
      </Form>
      {!modify&&
      <div style={{ width:"100%", textAlign: "right" }}>  
      <Button  className="btnAnnuler" onClick={()=>{setModify(true)}} style={{ marginRight: "10px" }}>
      Modifier 
    </Button></div>}
    </Drawer>
  );
}

export default DetailVehicule;
