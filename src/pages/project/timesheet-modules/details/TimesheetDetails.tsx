import React, { useEffect, useState } from 'react'
import { Button, Table, Card, Typography, Tag, Row, Col, Space } from 'antd'
import * as XLSX from 'xlsx/xlsx.mjs'
import Stat from './Stat'
import ChartsTest from '@/pages/project/timesheet-modules/details/ChartsTest'
import { ISheet } from '@/features/timesheet/timesheetSlice'
import type { ColumnsType } from 'antd/es/table';
const { Title } = Typography

const TimesheetDetails:React.FC<{ detail:ISheet, filtred:boolean }>=({ detail, filtred }) =>{
  const [data, setData] = useState(detail.details)
  interface IDetailSheet {
    id: number;
    projet: string;
    tache: string;
    typeTache: string;
    nbrHeures: number;
    date: string;
}
  const columns:ColumnsType<IDetailSheet> = [
    {
      title: 'Projet',
      dataIndex: 'projet',
      key: 0,
    },
    {
      title: 'Tâche',
      dataIndex: 'tache',
      responsive:["sm"],
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
      responsive:["sm"],
    },
    {
      title: "Date",
      dataIndex: 'date',
      key: 4,
    },
  ]
  const handleOnExport = () => {
    let data = detail.details
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
      <Table<IDetailSheet>
        // bordered
        columns={columns}
        dataSource={data}
        size="middle"
        pagination={
          detail.details.length <= 6
            ? false
            : {
                size: 'small',
                pageSize: 6,
              }
        }
        style={{marginBottom:"10px"}}
      />
      <Row gutter={[10, 10]} >
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Card>
           <ChartsTest sheets={detail.details} filtred={filtred}/> 
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
        <Card style={{height:325}}>
          <Stat sheets={detail.details} filtred={filtred}/>
        </Card>
        </Col>
      </Row>
    </Card>
  )
}

export default TimesheetDetails
