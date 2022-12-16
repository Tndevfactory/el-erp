import React, { useEffect, useState } from 'react'
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
  DatePicker,
} from 'antd'
const { Title } = Typography

const Assurances:React.FC = () => {
  const [form] = Form.useForm()
  const [refresh, forceRefresh] = useState(0)
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
  useEffect(() => {}, [refresh])
  return (
    <div>
      <Title level={5} style={styleTitle}>
        Assurances
      </Title>
      <Card style={styleCard}>
        <Form layout="vertical" form={form} hideRequiredMark disabled>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="assurance_tiers" label="Assurance tiers">
                <Switch
                  onChange={(e) => {
                    forceRefresh(Math.random())
                    // if (!e) form.setFieldValue('franchise_tiers', '')
                  }}
                  checked
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="franchise_tiers" label="Franchise tiers">
                <InputNumber<string>
                  style={styleInputNumber}
                  defaultValue={'500'}
                  step="0.01"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="assurance_dommage" label="Assurance Dommage">
                <Switch
                //   onChange={() => {
                //     forceRefresh(Math.random())
                //   }}
                  checked
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="franchise_dommage" label="Franchise Dommage">
                <InputNumber<string>
                  style={styleInputNumber}
                  defaultValue={'1500'}
                  step="0.01"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="assurance_vol" label="Assurance vol">
                <Switch
                //   onChange={() => {
                //     forceRefresh(Math.random())
                //   }}
                  checked
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="franchise_vol" label="Franchise vol">
                <InputNumber<string>
                  style={styleInputNumber}
                  defaultValue={'1500'}
                  step="0.01"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="assurance_perte_financiere"
                label="Assurance perte financière"
              >
                <Switch
                //   onChange={() => {
                //     forceRefresh(Math.random())
                //   }}
                  checked={false}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="franchise_perte_financiere"
                label="Franchise perte financière"
              >
                <InputNumber
                  style={styleInputNumber}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  )
}

export default Assurances
