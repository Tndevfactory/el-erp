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
      // console.log(info.file, info.fileList);
    }
    if (status === "done") {
    } else if (status === "error") {
    }
  },
  onDrop(e) {
    // console.log("Dropped files", e.dataTransfer.files);
  },
};
//Contract form
export const ChargesForm = (
  modify: boolean,
  setModify?: React.Dispatch<React.SetStateAction<boolean>>
) => (
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
          label="N?? de Chassis"
          rules={
            modify && [
              {
                required: true,
                message: "Veuillez entrer le numero de Chassis",
              },
            ]
          }
        >
          <Input placeholder="N?? de Chassis" />
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
          label="Mod??le"
          rules={
            modify && [
              {
                required: true,
                message: "Veuillez entrer le mod??le",
              },
            ]
          }
        >
          <Select placeholder="Mod??le">
            <Option key={0} value="Mod??le 1">
              Mod??le 1
            </Option>
            <Option key={1} value="Mod??le 2">
              Mod??le 2
            </Option>
            <Option key={2} value="Mod??le 3">
              Mod??le 3
            </Option>
          </Select>
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Form.Item
          label="Date d??but contrat"
          name="debut_contrat"
          rules={
            modify && [
              {
                required: true,
                message: "Veuillez entrer la date  de d??but contrat",
              },
            ]
          }
        >
          <DatePicker
            style={{ width: "100%" }}
            format={"DD/MM/YYYY"}
            placement="topLeft"
            onChange={(value, dateString: string) => {}}
            placeholder="Date d??but contrat"
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
const UpdateCharge: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  forceRefresh: React.Dispatch<React.SetStateAction<number>>;
  modify: boolean;
  setModify: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ visible, setVisible, forceRefresh, modify, setModify }) => {
  var { windowWidth } = useSelector((store: any) => store.ui);
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);
  const styleCard: React.CSSProperties = {
    padding: "10px",
    marginBottom: "15px",
  };
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {}, []);

  return (
    <Drawer
      title={"D??tails de la note de frais"}
      width={windowWidth > 750 ? 720 : "90%"}
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
            {ChargesForm(modify, setModify)}
            {!modify && (
              <div style={{ width: "100%", textAlign: "right" }}>
                <Button
                  className="btnAnnuler"
                  onClick={() => {
                    setModify(true);
                  }}
                >
                  Modifier
                </Button>
              </div>
            )}
          </>
        </Card>
      </Space>
    </Drawer>
  );
};

export default UpdateCharge;
