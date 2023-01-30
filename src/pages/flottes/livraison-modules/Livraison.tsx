import React, {useEffect, useState} from 'react'
import {
    ProFormCheckbox,
    ProFormDatePicker,
    ProFormRadio,
    ProFormText,
    QueryFilter,
  } from '@ant-design/pro-components';
  import {
    Breadcrumb,
    Card,
    Col,
    Row,
    Typography,
  } from "antd";
  import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { IClient } from '@/features/flotte/client/flotteClientSlice';
import Test from './Test';
  const { Paragraph, Title } = Typography;
  
const columns: ProColumns<IClient>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: "Code client",
    dataIndex: "code_client",
    key: 0,
    ellipsis: true,
  },
  {
    title: "Désignation",
    dataIndex: "designation",
    key: "designation",
    filters: true,
    onFilter: true,
    ellipsis: true,
    // renderFormItem:((item,form) => (<></>)),
    // valueType: 'select',
    // valueEnum: {
    //   all: { text: 'Tout'},
    //   open: {
    //     text: 'Error',
    //     status: 'Error',
    //   },
    //   closed: {
    //     text: 'Success',
    //     status: 'Success',
    //     disabled: true,
    //   },
    //   processing: {
    //     text: 'Processing',
    //     status: 'Processing',
    //   },
    // },
    
  },
  {
    disable: true,
    title: "Numéro de téléphone",
    dataIndex: "telephone",
    render:(code)=>(<a>+216{code}</a>),
    key: "telephone",
    // search: false,

    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    // render: (_, record) => (
    //   <Space>
    //     {record.labels.map(({ name, color }) => (
    //       <Tag color={color} key={name}>
    //         {name}
    //       </Tag>
    //     ))}
    //   </Space>
    // ),
  },

  // {
  //   title: 'Date',
  //   key: 'showTime',
  //   dataIndex: 'created_at',
  //   valueType: 'date',
  //   sorter: true,
  //   hideInSearch: true,
  // },
  // {
  //   title: 'date',
  //   dataIndex: 'created_at',
  //   valueType: 'dateRange',
  //   hideInTable: true,
  //   search: {
  //     transform: (value) => {
  //       return {
  //         startTime: value[0],
  //         endTime: value[1],
  //       };
  //     },
  //   },
  // },
  {
    title: 'Action',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          // action?.startEditable?.(record.id);
        }}
      >
        edit
      </a>,
      // <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
      //   查看
      // </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: 'copy' },
          { key: 'delete', name: 'delete' },
        ]}
      />,
    ],
  },
];

const Livraison = () => {
  var { clients } = useSelector((store: any) => store.flotteClient);
  // const actionRef = useRef<ActionType>();
  const [data, setData] = useState([]) 
  useEffect(() => {
    setData(clients);
  }, []);
  return (
    <div className="Cautions">
    <Breadcrumb separator=">" className="mt-5">
      <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
      <Breadcrumb.Item href="">Gestion des livraisons</Breadcrumb.Item>
    </Breadcrumb>
    <Row className="mt-5" gutter={[12, 24]}>
      <Col xs={24}>
        <Card
          title={<Title level={4}>Gestion des livraisons</Title>}
          bordered={false}
        >
    <ProTable<IClient>
      columns={columns}
      // actionRef={actionRef}
      cardBordered
      // editable={{
      //   type: 'multiple',
      // }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          // console.log('value: ', value);
        },
      }}
      // rowKey="id"
      search={{
        labelWidth: "auto",
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      pagination={{
        pageSize: 5,
        // onChange: (page) => console.log(page),
      }}
      // dateFormatter="string"
      headerTitle="Liste de livraisons"
      request={async (params) => {
        console.log(`request params:`, params);
        var dataFilter=clients
        if(params.code_client) dataFilter=dataFilter.filter((item)=>item.code_client.toString().toUpperCase().search(params.code_client.toString().toUpperCase())===-1?false:true);
        if(params.telephone) dataFilter=dataFilter.filter((item)=>item.telephone.toString().toUpperCase().search(params.telephone.toString().toUpperCase())===-1?false:true);
        if(params.designation) dataFilter=dataFilter.filter((item)=>item.designation.toString().toUpperCase().search(params.designation.toString().toUpperCase())===-1?false:true);
        return {
          data: dataFilter,
          success: true,
        };
      }}
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          Ajouter
        </Button>
      ]}
    />
    {/* <Test/> */}
        </Card>
      </Col>
    </Row>
  </div>
  )
}

export default Livraison