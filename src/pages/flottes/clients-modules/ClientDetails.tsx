import React, { useEffect, useState, useRef } from 'react'
import {
  Button,
  Drawer,
  Input,
  Form,
  Row,
  Col,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'

function CautionDetails({ visible, setVisible, client, forceRefresh  }) {
  var { caution } = useSelector((store: any) => store.caution)
  const dispatch = useDispatch()
  const [fields, setFields] = useState([])

  useEffect(() => {
    if (visible) {
      console.log("detail")
      setFields([
        {
          name: ['code_client'],
          value: client.code_client,
        },
        {
          name: ['designation'],
          value: client.designation,
        },
        {
          name: ['code_dossier'],
          value: client.code_dossier,
        },
        {
          name: ['telephone'],
          value: client.telephone,
        },
      ])
    }
  }, [visible])

  return (
    <Drawer
      title={'Détails de client'}
      className="CautionDetails"
      width={500}
      onClose={()=>{setVisible(false)}}
      open={visible}
      bodyStyle={{
        paddingBottom: 80,
      }} 
    >
      <Form layout="vertical" hideRequiredMark fields={fields}
        onFinish={(values)=>{
          console.log(values)
        }} 
      >
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
              name="telephone"
              label="Téléphone"
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
          <Button className="btnModofier" htmlType="submit">
            Envoyer
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default CautionDetails
