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
  const { Title } = Typography
const Entretien:React.FC = () => {  
  const [form] = Form.useForm();
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
    Entretien
  </Title>
  <Card style={styleCard}>
    <Form layout="vertical" form={form} hideRequiredMark disabled>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="entretien_inclus"
            label="Entretien inclus"
          >
            <Switch checked />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <Form.Item
              name="entretien_mecanique"
            label="Entretien mécanique"
          >
            <Switch checked/>
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <Form.Item
              name="entretien_pneumatique"
            label="Entretien pneumatique"
          >
            <Switch checked />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <Form.Item
              name="entretien_grue"
            label="Entretien grue"
          >
            <Switch checked />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <Form.Item
              name="entretien_hayon"
            label="Entretien hayon"
          >
            <Switch checked={false}/>
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <Form.Item
              name="entretien_bras"
            label="Entretien bras "
          >
            <Switch checked={false}/>
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <Form.Item
              name="entretien_frigo"
            label="Entretien frigo "
          >
            <Switch checked={false}/>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </Card></div>
  )
}

export default Entretien