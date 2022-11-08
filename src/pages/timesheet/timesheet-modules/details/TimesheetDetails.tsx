import React, { useEffect, useState } from 'react'
import { Button, Table, Card, Typography, Tag, Row, Col, Space } from 'antd'
import * as XLSX from 'xlsx/xlsx.mjs'
import Stat from './Stat'
import ChartsTest from '@/pages/timesheet/timesheet-modules/details/ChartsTest'
const { Title } = Typography
function TimesheetDetails({ detail }) {
  const [data, setData] = useState(detail.detail)
  const columns = [
    {
      title: 'Projet',
      dataIndex: 'projet',
      key: 0,
    },
    {
      title: 'Tâche',
      dataIndex: 'tache',
      key: 1,
    },
    {
      title: 'Type de tâche',
      dataIndex: 'typeTache',
      render: (typeTache: string) => (
        <Tag
          color={
            typeTache === 'développement'
              ? 'blue'
              : typeTache === 'Conception'
              ? 'green'
              : typeTache === 'test'
              ? 'gold'
              : ''
          }
        >
          {typeTache}
        </Tag>
      ),
      key: 2,
    },
    {
      title: "Nombre d'heures",
      dataIndex: 'nbrHeures',
      render: (data) => <>{data}h</>,
      key: 3,
    },
    {
      title: "Date",
      dataIndex: 'date',
      key: 4,
    },
  ]
  const handleOnExport = () => {
    let data = detail.detail
    data.map((item, index) => {
      delete item.id
    })
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(data)
    ws['!cols'] = [{ wpx: 150 }, { wpx: 180 }, { wpx: 80 }]
    XLSX.utils.book_append_sheet(wb, ws, detail.employe)
    XLSX.writeFile(wb, 'sheet' + detail.employe.replace(/ /g, '') + '.xlsx')
  }
  return (
    <Card
      title={<Title level={5}>{detail.employe}</Title>}
      bordered={false}
      extra={
        <Button type="primary" onClick={handleOnExport}>
          Exporter détail excel
        </Button>
      }
    >
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Table
        // bordered
        columns={columns}
        dataSource={data}
        size="middle"
        pagination={
          detail.detail.length <= 6
            ? false
            : {
                size: 'small',
                pageSize: 6,
              }
        }
      />
      <Row>
        <Col span={12}>
          <ChartsTest sheets={detail.detail}/>
        </Col>
        <Col span={12}>
          <Stat sheets={detail.detail}/>
        </Col>
      </Row>
      </Space>
    </Card>
  )
}

export default TimesheetDetails
