import React, { useState } from 'react'
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
  Divider,
} from 'antd'
import { InboxOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { addCaution } from '../../../features/caution/cautionSlice'
import FormItem from 'antd/lib/form/FormItem'
const { Option } = Select
const { Dragger } = Upload

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
function AddVehicule({ visible, setVisible, forceRefresh }) {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [modeleForm] = Form.useForm()
  const [marqueForm] = Form.useForm()
  const [typeCarburantForm] = Form.useForm()
  const [eps, setEps] = useState(0)
  const [marque, setMarque] = useState('1')
  const [marques, setMarques] = useState([
    {
      value: '1',
      label: 'FIAT',
    },
    {
      value: '2',
      label: 'KIA',
    },
    {
      value: '3',
      label: 'HYUNDAI',
    },
    {
      value: '4',
      label: 'VOLKSWAGEN',
    },
  ])
  const [modeles, setModeles] = useState([
    {
      value: '1',
      marque:'1',
      label: 'Panda',
    },
    {
      value: '2',
      marque:'4',
      label: 'Golf 6',
    },
    {
      value: '3',
      marque:'3',
      label: 'I20',
    },
    {
      value: '4',
      marque:'2',
      label: 'Picanto',
    },
  ])
  const [typeCarburants, setTypeCarburants]= useState([{
    value:'1',
    label:'Essence'
  },{
    value:'2',
    label:'Diesel'
  },{
    value:'3',
    label:'Electrique'
  }])
  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
    form.resetFields()
  }

  const addMarque = (values) => {
    setMarques([
      ...marques,
      { value: Math.random().toString(), label: values.marque.toUpperCase() },
    ])
    marqueForm.resetFields()
  }

  const addModele = (values) => {
    setModeles([
      ...modeles,
      { value: Math.random().toString(), label: values.modele, marque:marque },
    ])
    modeleForm.resetFields()
  }
  const addTypeCarburant = (values) => {
    setTypeCarburants([
      ...typeCarburants,
      { value: Math.random().toString(), label: values.label },
    ])
    typeCarburantForm.resetFields()
  }

  //select search and sort
  const filterOption=(input, option) =>  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
  const filterSort=(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())

  
  const handleSubmit = (values) => {
    dispatch(
      addCaution({
        id: Math.random(),
        Nom_Projet: values.name,
        Demandeur: values.Demandeur,
        type_caution: values.type,
        DateD: moment(values.dateTime._d).format('DD/MM/YYYY'),
        Client: values.client,
        Montant: values.montant,
        ligne: values.ligne,
        Frais_mois: 20,
        Durée: values.Durée,
        Etat_main_levée: 'En attente',
        Observation: values.Observation,
      }),
    )
    forceRefresh(Math.random())
    setVisible(false)
    console.log(values)
  }
  return (
    <Drawer
      title="Ajouter une véhicule"
      width={720}
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
                  message: 'Veuillez entrer le numero de Chassis',
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
                  message: 'Veuillez entrer la marque',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Marque"
                optionFilterProp="children"
                filterOption={filterOption}
                filterSort={filterSort}
                options={marques}
                onSelect={(e) => {
                  setMarque(e)
                  form.setFields([
                    {
                      name: ['modele'],
                      value: modeles.filter(item => item.marque===e)[0].value,
                    },
                  ])
                }}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Form
                    form={marqueForm}
                      style={{ marginBottom: '-20px' }}
                      onFinish={addMarque}
                    >
                      <Space style={{ padding: '0 8px 4px' }}>
                        <FormItem name="marque" style={{ width: '260px' }}>
                          <Input
                            placeholder="Nouvelle marque"
                            style={{ width: '260px' }}
                          />
                        </FormItem>
                        <FormItem>
                          <Button
                            type="primary"
                            htmlType="submit"
                            icon={<PlusOutlined />}
                          />
                        </FormItem>
                      </Space>
                    </Form>
                  </>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="modele"
              label="Modèle"
              rules={[
                {
                  required: true,
                  message: 'Veuillez entrer le modèle',
                },
              ]}
            >
              <Select
              disabled={!form.getFieldValue("marque")}
                placeholder="Modèle"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Form
                      fields={[
                        {
                          name: ['marque'],
                          value: marque,
                        },
                      ]}
                      form={modeleForm}
                      style={{ marginBottom: '-20px' }}
                      onFinish={addModele}
                    >
                      <Space style={{ padding: '0 8px 4px' }}>
                        <FormItem name="marque">
                          <Select disabled options={marques} />
                        </FormItem>
                        <FormItem name="modele">
                          <Input placeholder="Modèle" />
                        </FormItem>
                        <FormItem>
                          <Button
                            type="primary"
                            htmlType="submit"
                            icon={<PlusOutlined />}
                            onClick={() => {}}
                          />
                        </FormItem>
                      </Space>
                    </Form>
                  </>
                )}
                options={modeles.filter(item => item.marque===marque)}
              />
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
                  message: 'Veuillez entrer la puissance fiscale',
                },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
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
                  message: 'Veuillez entrer la puissance cylindrée',
                },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
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
                  message: 'Veuillez entrer la Type du carburant',
                },
              ]}
            >
               <Select
                showSearch
                placeholder="Type du carburant"
                optionFilterProp="children"
                filterOption={filterOption}
                filterSort={filterSort}
                options={typeCarburants}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Form
                    form={typeCarburantForm}
                      style={{ marginBottom: '-20px' }}
                      onFinish={addTypeCarburant}
                    >
                      <Space style={{ padding: '0 8px 4px' }}>
                        <FormItem name="label" style={{ width: '260px' }}>
                          <Input
                            placeholder="Nouvelle type carburant"
                            style={{ width: '260px' }}
                          />
                        </FormItem>
                        <FormItem>
                          <Button
                            type="primary"
                            htmlType="submit"
                            icon={<PlusOutlined />}
                          />
                        </FormItem>
                      </Space>
                    </Form>
                  </>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="kilometrage_initial"
              label="kilométrage initial"
              rules={[
                {
                  required: true,
                  message: 'Veuillez entrer le kilométrage initial',
                },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
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
                  message: 'Veuillez entrer le nombre de places',
                },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
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
                style={{ width: '100%' }}
                format={'DD/MM/YYYY'}
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
                style={{ width: '100%' }}
                format={'DD/MM/YYYY'}
                placement="topLeft"
                onChange={(value, dateString: string) => {}}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="echeance_technique"
              label="Echéance de visite technique"
              rules={[
                {
                  required: true,
                  message:
                    "Veuillez entrer la date d'echéance de visite technique",
                },
              ]}
            >
              <DatePicker
                style={{ width: '100%' }}
                format={'DD/MM/YYYY'}
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
                  message: 'Please choose the type',
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
                  Merci d'attacher les fiches de taxe, d'assurance et de visite
                  technique
                </p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button
            className="btnAnnuler"
            htmlType="reset"
            style={{ marginRight: '10px' }}
          >
            Annuler
          </Button>
          <Button type="primary" className="btnModofier" htmlType="submit">
            Envoyer
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default AddVehicule
