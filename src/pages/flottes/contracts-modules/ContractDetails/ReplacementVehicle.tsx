import React from 'react'
import {
    Card,
    Typography,
    Form,
    Input,
    Col,
    Row,
    Switch,
    InputNumber,
    Select,
    DatePicker
  } from 'antd'
  import moment from "moment";
  const { Title } = Typography
const ReplacementVehicle:React.FC = () => {
    const styleTitle: React.CSSProperties = {
        marginLeft: '10px',
      }
      const styleCard: React.CSSProperties = {
        padding: '10px',
        marginBottom: '15px',
      }
      const styleInputNumber: React.CSSProperties = {
        width: '100%',
      }
  return (
    <div>      <Title level={5} style={styleTitle}>
    Véhicule de remplacement
  </Title>
  <Card style={styleCard}>
    <Form layout="vertical" hideRequiredMark disabled>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            //   name="designation"
            label="Vol"
          >
            <Switch checked/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            //   name="code_client"
            label="Catégorie"
            
          >
            <Select
            defaultValue="option1"
              options={[
                {
                  value: 'option1',
                  label: 'option1',
                },
                {
                  value: 'option2',
                  label: 'option2',
                },
                {
                  value: 'option3',
                  label: 'option3',
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            //   name="code_client"
            label="Durée"
          >
            <InputNumber<string>
              style={styleInputNumber}
              defaultValue={'5'}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            //   name="code_client"
            label="Délai"
          >
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            //   name="designation"
            label="Dommage"
          >
            <Switch />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            //   name="code_client"
            label="Catégorie "
          >
            <Select
              options={[
                {
                  value: 'option1',
                  label: 'option1',
                },
                {
                  value: 'option2',
                  label: 'option2',
                },
                {
                  value: 'option3',
                  label: 'option3',
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            //   name="code_client"
            label="Durée "
          >
            <InputNumber<string>
              style={styleInputNumber}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            //   name="code_client"
            label="Délai "
          >
            <DatePicker/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            //   name="designation"
            label="Panne"
          >
            <Switch />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            //   name="code_client"
            label="Catégorie"
          >
            <Select
              options={[
                {
                  value: 'option1',
                  label: 'option1',
                },
                {
                  value: 'option2',
                  label: 'option2',
                },
                {
                  value: 'option3',
                  label: 'option3',
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            //   name="code_client"
            label="Durée"
          >
            <InputNumber<string>
              style={styleInputNumber}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            //   name="code_client"
            label="Délai"
          >
            <DatePicker/>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </Card></div>
  )
}

export default ReplacementVehicle