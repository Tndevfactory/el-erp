import {Form, Row, Col, Switch, Card, InputNumber} from 'antd'
import React from 'react'

const KilometrageContarct = () => {
    const styleInputNumber: React.CSSProperties = {
        width: '100%',
      }
  return (
    <Form layout="vertical" hideRequiredMark disabled>
    <Row gutter={16}>
      <Col span={8}>
        <Form.Item
          //   name="code_client"
          label="Kilométrage inclus"
        >
          <InputNumber style={styleInputNumber} defaultValue={6000}/>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          //   name="designation"
          label="Périodicité"
        >
          <InputNumber style={styleInputNumber} defaultValue={1}/>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          //   name="code_client"
          label="A facturer"
        >
          <Switch checked />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={8}>
        <Form.Item
          //   name="designation"
          label="Prix du km supplémentaire"
        >
          <InputNumber style={styleInputNumber} defaultValue={0.28}/>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          //   name="designation"
          label="TVA "
        >
          <InputNumber style={styleInputNumber} defaultValue={20} formatter={(value) => `${value}%`}/>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          //   name="designation"
          label="TTC "
        >
          <InputNumber style={styleInputNumber} defaultValue={0.34}/>
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={8}>
        <Form.Item
          //   name="designation"
          label="Prix du km minoritaire"
        >
          <InputNumber style={styleInputNumber}/>
        </Form.Item>
      </Col>
    </Row>
  </Form>
  )
}

export default KilometrageContarct