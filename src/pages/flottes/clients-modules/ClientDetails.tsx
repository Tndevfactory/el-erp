import React, { useEffect, useState, useRef } from "react";
import { Button, Drawer, Input, Form, Row, Col, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addDuration, updateCaution } from "@/features/caution/cautionSlice";

function ClientDetails({ visible, setVisible, client, modify, setModify, forceRefresh }) {
  var { caution } = useSelector((store: any) => store.caution);
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);
  const showDrawer = () => {
    setVisible(true);
  };
  useEffect(() => {
    if (visible) {
      setFields([
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
      ]);
    }
  }, [visible]);
  return (
    <Drawer
      title={modify?"Modifier client":"Détail de client"}
      className="CautionDetails"
      width={500}
      onClose={() => {
        setModify(false)
        setVisible(false);
      }}
      open={visible}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >
      <Form layout="vertical" hideRequiredMark fields={fields} disabled={!modify}>
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
              <Input placeholder="Veuillez entrer le code client" />
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
              <Input placeholder="Veuillez entrer le type de caution" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="telephone"
              label="Téléphone "
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le numéro",
                },
              ]}
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
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer l'adresse",
                },
              ]}
            >
              <Input placeholder="Veuillez entrer l'adresse" />
            </Form.Item>
          </Col>
        </Row>

       {modify&& <Form.Item style={{ textAlign: "right" }}>
          <Button
            className="btnAnnuler"
            htmlType="reset"
            style={{ marginRight: "10px" }}
          >
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

export default ClientDetails;
