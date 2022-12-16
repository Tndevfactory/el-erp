import React, { useEffect, useState } from 'react'
import {
  Button,
  Table,
  Card,
  Typography,
  Modal,
  Row,
  Col,
  Space,
  Tooltip,
  Avatar,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Select,
} from 'antd'
import * as XLSX from 'xlsx/xlsx.mjs'
import { RiTeamFill } from 'react-icons/ri'
import { TbTool } from 'react-icons/tb'
import { HiCode } from 'react-icons/hi'
import { TbTestPipe } from 'react-icons/tb'
import { MdMoreTime } from 'react-icons/md'
import moment from 'moment'
const { Option } = Select
const { Title } = Typography
function TaskTimesheet({ detail }) {
  const [data, setData] = useState(detail)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const columns = [
    { 
      title: 'Employe',
      render: (sheet) => (
        <Tooltip title={sheet.employe}>
          <Avatar src={sheet.photo} />
        </Tooltip>
      ),
      key: 0,
    },
    {
      title: 'Type de tâche',
      dataIndex: 'typeTache',
      render: (typeTache: string) =>
        typeTache === 'Test' ? (
          <Tooltip title="Test">
            {' '}
            <TbTestPipe />
          </Tooltip>
        ) : typeTache === 'Réunion' ? (
          <Tooltip title="Réunion">
            <RiTeamFill />
          </Tooltip>
        ) : typeTache === 'Fix error' ? (
          <Tooltip title="Fix error">
            <TbTool />
          </Tooltip>
        ) : (
          <Tooltip title="Développement">
            <HiCode />
          </Tooltip>
        ),
      key: 2,
    },
    {
      title: 'Tâche',
      dataIndex: 'titre',
      key: 1,
    },
    {
      title: "Nombre d'heures",
      dataIndex: 'nbrHeures',
      render: (data) => <>{data}h</>,
      key: 3,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 4,
    },
    {
      title: 'Action',
      key: 5,
      render: (data) =>
        data.employe == 'Bassem Soua' && (
          <Tooltip title="Supprimer">
            <a style={{ color: '#E74C3C' }}>X</a>
          </Tooltip>
        ),
    },
  ]

  return (
    <div>
      <Space>
        <Title level={5}>TimeSheet</Title>
        <Tooltip title="Ajouter">
          <MdMoreTime
            style={{ marginBottom: '6px', cursor: 'pointer' }}
            onClick={() => {
              setIsModalOpen(true)
            }}
          />
        </Tooltip>
      </Space>
      <Table
        // bordered
        columns={columns}
        dataSource={data}
        showHeader={false}
        size="small"
        pagination={
          detail.length <= 6
            ? false
            : {
                size: 'small',
                pageSize: 6,
              }
        }
      />
      <Modal
        title="Ajouter timesheet"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width={700}
        centered
        footer={[
          <Button key="back" onClick={() => {}}>
            Annuler
          </Button>,
          <Button key="submit" type="primary">
            Ajouter
          </Button>,
        ]}
      >
        <Form name="horizontal_login" layout="vertical" onFinish={() => {}}>
          <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              name="date"
              rules={[
                {
                  required: true,
                  message: "Please choose the type",
                },
              ]}
            >
                          <DatePicker
              format={'DD/MM/YYYY'}
              onChange={(value, dateString: string) => {}}
            />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="durée"
              rules={[
                {
                  required: true,
                  message: "Please select an owner",
                },
              ]}
            >
              <InputNumber placeholder="Durée" style={{width:"100%"}}/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please choose the type",
                },
              ]}
            >
              <Select defaultValue="Développement">
              <Option key={0} value="Développement">
                Développement
              </Option>
              <Option key={1} value="Conception">
                Conception
              </Option>
              <Option key={2} value="Test">
                Test
              </Option>
              <Option key={3} value="Réunion">
                Réunion
              </Option>
            </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="information"
              rules={[
                {
                  required: true,
                  message: "Please select an owner",
                },
              ]}
            >
              <Input placeholder="Information" />
            </Form.Item>
          </Col>
        </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default TaskTimesheet
