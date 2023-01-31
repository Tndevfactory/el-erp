import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  TimePicker,
} from 'antd'
import React from 'react'
import dayjs from 'dayjs'
import moment from 'moment/moment'
import { useState } from 'react'
const { Option } = Select
const AddEvent = ({ isModalAddOpen, setIsModalAddOpen, setEvents, events }) => {
  const [form] = Form.useForm()
  const [date, setDate] = useState(null)
  const [heure, setHeure] = useState(null)
  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().subtract(1, 'day').endOf('day')
  }
  //select search and sort
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
  const filterSort = (optionA, optionB) =>
    (optionA?.label ?? '')
      .toLowerCase()
      .localeCompare((optionB?.label ?? '').toLowerCase())
  return (
    <Modal
      title="Ajouter Evenement"
      centered
      open={isModalAddOpen}
      okText="Ajouter"
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            console.log(date)
            console.log(heure)
            setEvents(
              [...events,{
                title: values.nature,
            start: moment(date+" "+heure).format("YYYY-MM-DD HH:mm"),
            end: moment(date+" "+heure).format("YYYY-MM-DD HH:mm"),
                state: 1,
                color: '#faad14',
          }]
          );
            setIsModalAddOpen(false)
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
      cancelText="Annuler"
      onCancel={() => {
        setIsModalAddOpen(false)
        form.resetFields()
        setDate(null)
        setHeure(null)
      }}
    >
      <Form
        className="mt-5"
        layout="vertical"
        // onFinish={onFinish}
        requiredMark={false}
        form={form}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="prenom"
              label="Prénom"
              rules={[{ required: true }]}
            >
              <Input placeholder="Prénom" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="nom" label="Nom" rules={[{ required: true }]}>
              <Input placeholder="Nom" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="CIN"
              label="CIN"
              rules={[
                { required: true },
                () => ({
                  validator(_, e) {
                    if (
                      e.length === 0 ||
                      (e.replaceAll(' ', '').length === 8 &&
                        parseInt(e.replaceAll(' ', '')))
                    ) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Invalide CIN'))
                  },
                }),
              ]}
            >
              <Input placeholder="CIN" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="telephone"
              label="Téléphone"
              rules={[
                { required: true },
                () => ({
                  validator(_, e) {
                    if (
                      e.length === 0 ||
                      (e.replaceAll(' ', '').length === 8 &&
                        parseInt(e.replaceAll(' ', '')))
                    ) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Invalide numéro'))
                  },
                }),
              ]}
            >
              <Input addonBefore="+216" placeholder="Numéro" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="date" label="Date" rules={[{ required: true }]}>
              <DatePicker
                format={'YYYY-MM-DD'}
                className="w-full"
                disabledDate={disabledDate}
                onChange={(e,dateString)=>{setDate(dateString)}}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="heure" label="Heure" rules={[{ required: true }]}>
              <TimePicker
                className="w-full"
                showSecond={false}
                format="HH:mm"
                onChange={(e,dateString)=>{setHeure(dateString)}}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="nature"
              label="Nature"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                filterOption={filterOption}
                filterSort={filterSort}
                placeholder="Nature"

              >
                <Option key={0} value="Consultation" label="Consultation">
                  Consultation
                </Option>
                <Option key={1} value="Opération" label="Opération">
                  Opération
                </Option>
                <Option key={2} value="Rendez-vous" label="Rendez-vous">
                  Rendez-vouz
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="lieu" label="Lieu" rules={[{ required: true }]}>
              <Select
                showSearch
                filterOption={filterOption}
                filterSort={filterSort}
                placeholder="Lieu"
              >
                <Option key={0} value="Cabinet" label="Cabinet">
                  Cabinet
                </Option>
                <Option key={1} value="Hospital" label="Hospital">
                  Hospital
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item name="remarque" label="Remarque">
              <Input.TextArea placeholder="Remarque..." />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default AddEvent
