import React, { useEffect, useState, useRef } from "react";
import "@/style/modules/Flotte.less";
import {
  UploadProps,
  Button,
  Space,
  Drawer,
  Input,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Tabs,
  Card,
} from "antd";
import { ProCard } from "@ant-design/pro-components";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { ClientForm } from "../clients-modules/ClientDetails";
import { VehiculeForm } from "../vehicules-modules/DetailVehicule";
import Factures from "../Factures-modules/Factures";
import ConditionsContract from "./ContractDetails/ConditionsContract";
import KilometrageContarct from "./ContractDetails/KilometrageContarct";

const { Option } = Select;

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
//Contract form
export const ContractForm = (modify:boolean, setModify?:React.Dispatch<React.SetStateAction<boolean>>) => (
  <Form layout="vertical" hideRequiredMark disabled={!modify} fields={[]}>
    <Row gutter={16}>
      <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Form.Item
          name="code_contrat"
          label="Code contrat"
          rules={
            modify && [
              {
                required: true,
                message: "Veuillez entrer le code contrat",
              },
            ]
          }
        >
          <Input placeholder="Code contrat" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Form.Item
          name="code_client"
          label="Code client"
          rules={
            modify && [
              {
                required: true,
                message: "Veuillez entrer le code client",
              },
            ]
          }
        >
          <Input placeholder="Code client" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Form.Item
          name="immatriculation"
          label="Immatriculation"
          rules={
            modify && [
              {
                required: true,
                message: "Veuillez entrer l'immatriculation",
              },
            ]
          }
        >
          <Input placeholder="Immatriculation" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Form.Item
          name="numero_chassis"
          label="N° de Chassis"
          rules={
            modify && [
              {
                required: true,
                message: "Veuillez entrer le numero de Chassis",
              },
            ]
          }
        >
          <Input placeholder="N° de Chassis" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Form.Item
          name="marque"
          label="Marque"
          rules={
            modify && [
              {
                required: true,
                message: "Veuillez entrer la marque",
              },
            ]
          }
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
          name="modele"
          label="Modèle"
          rules={
            modify && [
              {
                required: true,
                message: "Veuillez entrer le modèle",
              },
            ]
          }
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
          name="debut_contrat"
          rules={
            modify && [
              {
                required: true,
                message: "Veuillez entrer la date  de début contrat",
              },
            ]
          }
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
          name="fin_contrat"
          rules={
            modify && [
              {
                required: true,
                message: "Veuillez entrer la date  de fin contrat",
              },
            ]
          }
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
      {modify && (
        <Form.Item
          style={{
            width: "100%",
            textAlign: "right",
            marginRight: "10px",
          }}
        >
          <Button
            className="btnAnnuler"
            onClick={() => {
              setModify(false);
            }}
            style={{ marginRight: "10px" }}
          >
            Annuler
          </Button>
          <Button type="primary" htmlType="submit">
            Envoyer
          </Button>
        </Form.Item>
      )}
    </Row>
  </Form>
);
const CautionDetails: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  forceRefresh: React.Dispatch<React.SetStateAction<number>>;
  modify: boolean;
  setModify: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ visible, setVisible, forceRefresh, modify, setModify }) => {
  var { caution } = useSelector((store: any) => store.caution);
  var { windowWidth } = useSelector((store: any) => store.ui);
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);
  const styleCard: React.CSSProperties = {
    padding: '10px',
    marginBottom: '15px',
  }
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {}, []);

  return (
    <Drawer
      title={"Détails de contrat"}
      width={windowWidth>750?720:"90%"}
      onClose={onClose}
      open={visible}
      bodyStyle={{
        paddingBottom: 80,
      }}
      className="ContractsDetails"
    >
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Card title="Informations">
          <>
            {ContractForm(modify, setModify)}
            {!modify && (
              <div style={{ width: "100%", textAlign: "right" }}>
                <Button
                  className="btnAnnuler"
                  onClick={() => {
                    setModify(true);
                  }}
                  style={{ marginRight: "10px" }}
                >
                  Modifier
                </Button>
              </div>
            )}
          </>
        </Card>
        <ProCard
          title="Plus de détail"
          collapsible
          bordered
          // defaultCollapsed
        >
          <Tabs
            defaultActiveKey="1"
            type="card"
            items={[
              {
                label: "Client",
                key: "1",
                children: <Card style={styleCard}>{ClientForm(false)}</Card>,
              },
              {
                label: "Véhicule",
                key: "2",
                children: <Card style={styleCard}>{VehiculeForm(false)}</Card>,
              },
              {
                label: "Factures",
                key: "3",
                children: <Factures />,
              },
              {
                label: "Conditions",
                key: "4",
                children: <ConditionsContract/>,
              },
              {
                label: "Kilométrages",
                key: "5",
                children: <Card style={styleCard}><KilometrageContarct/></Card>,
              },
              {
                label: "Autres",
                key: "6",
                children: <Card style={styleCard}></Card>,
              },
            ]}
          />
        </ProCard>
      </Space>
    </Drawer>
  );
};

export default CautionDetails;
