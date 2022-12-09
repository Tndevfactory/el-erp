import React, { useEffect, useState, useRef } from "react";
import { Button, Drawer, Input, Form, Row, Col, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addDuration, updateCaution } from "@/features/caution/cautionSlice";
import { IClient } from "@/features/flotte/client/flotteClientSlice";

export const ClientForm = (
  modify: boolean,
  client?: IClient,
  refreshDrawer?: React.Dispatch<React.SetStateAction<number>>,
  setModify?: React.Dispatch<React.SetStateAction<boolean>>
) => (
  <Form
    layout="vertical"
    hideRequiredMark
    fields={
      client && [
        {
          name: ["code_client"],
          value: client.code_client,
        },
        {
          name: ["designation"],
          value: client.designation,
        },
        {
          name: ["code_dossier"],
          value: client.code_dossier,
        },
        {
          name: ["telephone"],
          value: client.telephone,
        },
        {
          name: ["adresse"],
          value: "Ariana Essoughra, Cebalat Ben Ammar",
        },
      ]
    }
    disabled={!modify}
  >
    <Row gutter={16}>
      <Col span={24}>
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
          <Input placeholder="Veuillez entrer le code client" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item
          name="designation"
          label="Désignation "
          rules={
            modify && [
              {
                required: true,
                message: "Veuillez entrer le type de caution",
              },
            ]
          }
        >
          <Input placeholder="Veuillez entrer le type de caution" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item
          name="telephone"
          label="Téléphone "
          rules={
            modify && [
              {
                required: true,
                message: "Veuillez entrer le numéro",
              },
            ]
          }
        >
          <Input placeholder="Veuillez entrer le numéro" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item
          name="adresse"
          label="Adresse"
          rules={
            modify && [
              {
                required: true,
                message: "Veuillez entrer l'adresse",
              },
            ]
          }
        >
          <Input placeholder="Veuillez entrer l'adresse" />
        </Form.Item>
      </Col>
    </Row>

    {modify && (
      <Form.Item style={{ textAlign: "right" }}>
        <Button
          className="btnAnnuler"
          onClick={() => {
            refreshDrawer(Math.random());
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
  </Form>
);
const ClientDetails: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  client: IClient;
  modify: boolean;
  setModify: React.Dispatch<React.SetStateAction<boolean>>;
  forceRefresh: React.Dispatch<React.SetStateAction<number>>;
}> = ({ visible, setVisible, client, modify, setModify, forceRefresh }) => {
  var { caution } = useSelector((store: any) => store.caution);
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);
  const [refresh, refreshDrawer] = useState(0);
  const showDrawer = () => {
    setVisible(true);
  };

  useEffect(() => {}, [visible, refresh]);
  return (
    <Drawer
      title={modify ? "Modifier client" : "Détail de client"}
      className="CautionDetails"
      width={500}
      onClose={() => {
        setModify(false);
        setVisible(false);
      }}
      open={visible}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >
      <>
        {ClientForm(modify, client, refreshDrawer, setModify)}
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
    </Drawer>
  );
};

export default ClientDetails;
