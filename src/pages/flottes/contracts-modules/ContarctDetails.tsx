import React, { useEffect, useState, useRef } from 'react'
import '@/style/modules/Flotte.less'
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
} from 'antd'
import { ProCard } from '@ant-design/pro-components' ; 
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { ClientForm } from '../clients-modules/ClientDetails'
import { VehiculeForm } from '../vehicules-modules/DetailVehicule'

const { Option } = Select

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
    } else if (status === 'error') {
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files)
  },
}
//Contract form
export const ContractForm=(modify,setModify?)=>(
  <Form layout="vertical" hideRequiredMark disabled={!modify}>
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item
        name="code_contrat"
        label="Code contrat"
        rules={
          modify && [
            {
              required: true,
              message: 'Veuillez entrer le code contrat',
            },
          ]
        }
      >
        <Input placeholder="Code contrat" />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        name="code_client"
        label="Code client"
        rules={
          modify && [
            {
              required: true,
              message: 'Veuillez entrer le code client',
            },
          ]
        }
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
    <Col span={12}>
      <Form.Item
        name="numero_chassis"
        label="N° de Chassis"
        rules={
          modify && [
            {
              required: true,
              message: 'Veuillez entrer le numero de Chassis',
            },
          ]
        }
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
        rules={
          modify && [
            {
              required: true,
              message: 'Veuillez entrer la marque',
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
    <Col span={12}>
      <Form.Item
        name="modele"
        label="Modèle"
        rules={
          modify && [
            {
              required: true,
              message: 'Veuillez entrer le modèle',
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
  </Row>
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item
        label="Date début contrat"
        name="debut_contrat"
        rules={
          modify && [
            {
              required: true,
              message: 'Veuillez entrer la date  de début contrat',
            },
          ]
        }
      >
        <DatePicker
          style={{ width: '100%' }}
          format={'DD/MM/YYYY'}
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
        rules={
          modify && [
            {
              required: true,
              message: 'Veuillez entrer la date  de fin contrat',
            },
          ]
        }
      >
        <DatePicker
          style={{ width: '100%' }}
          format={'DD/MM/YYYY'}
          placement="topLeft"
          onChange={(value, dateString: string) => {}}
          placeholder="Date fin contrat"
        />
      </Form.Item>
    </Col>
    {modify && (
      <Form.Item
        style={{
          width: '100%',
          textAlign: 'right',
          marginRight: '10px',
        }}
      >
        <Button
          className="btnAnnuler"
          onClick={() => {
            setModify(false)
          }}
          style={{ marginRight: '10px' }}
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
)
function CautionDetails({
  visible,
  setVisible,
  forceRefresh,
  modify,
  setModify,
}) {
  var { caution } = useSelector((store: any) => store.caution)
  const dispatch = useDispatch()
  const [fields, setFields] = useState([])

  const onClose = () => {
    setVisible(false)
  }

  useEffect(() => {
  }, [])

  return (
    <Drawer
      title={'Détails de contrat'}
      width={750}
      onClose={onClose}
      open={visible}
      bodyStyle={{
        paddingBottom: 80,
      }}
      className="ContractsDetails"
    >
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Card title="Informations">
          <>
            {ContractForm(modify,setModify)}
            {!modify && (
              <div style={{ width: '100%', textAlign: 'right' }}>
                <Button
                  className="btnAnnuler"
                  onClick={() => {
                    setModify(true)
                  }}
                  style={{ marginRight: '10px' }}
                >
                  Modifier
                </Button>
              </div>
            )}
          </>
        </Card>
        < ProCard
        title = "Plus de détail"
        collapsible
        bordered
        defaultCollapsed
        
      >
        <Tabs
            defaultActiveKey="1"
            type="card"
            items={[
              {
                label: 'Client',
                key: '1',
                children: ClientForm(false),
              },
              {
                label: 'Vehicule',
                key: '2',
                children: VehiculeForm(false),
              },
              {
                label: 'Factures',
                key: '3',
                children: ClientForm(false),
              },
            ]}
          />
      </ ProCard >
      </Space>
    </Drawer>
  )
}

export default CautionDetails
