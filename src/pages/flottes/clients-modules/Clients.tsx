import React, { useEffect, useState } from "react";
import "../../../style/modules/Caution.less";
import {
  Button,
  Space,
  Table,
  Input,
  Breadcrumb,
  Card,
  Col,
  Row,
  Typography,
  Divider,
  Popconfirm
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { ProTable, TableDropdown, ProColumns } from '@ant-design/pro-components';

import moment from "moment";
import CreateClient from "./CreateClient"; 
import ClientDetails from "./ClientDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  IClient
} from "@/features/flotte/client/flotteClientSlice";
const { Paragraph, Title } = Typography;

const Clients:React.FC=()=> {
  const dispatch = useDispatch();
  var { clients } = useSelector((store: any) => store.flotteClient);

  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [client, setClient] = useState<IClient>();
  const [refresh, forceRefresh] = useState(0);
  const [modify, setModify] = useState(false)

  const columns: ProColumns<IClient>[] = [
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
    },
    {
      title: "Numéro de téléphone",
      dataIndex: "telephone",
      render:(code)=>(<a>+216{code}</a>),
      key: "telephone",
    },
    {
      title: 'Action',
      valueType: 'option',
      key: 'option',
      render: (text, client, _, action) => [
        <Space size="small">
        <a
          onClick={() => {
            setClient(client)
            setVisibleDetails(true);
          }}
        >
          <EyeOutlined/>
        </a>
        <Divider type="vertical" />
        <a
          onClick={() => {
            setClient(client)
            setModify(true)
            setVisibleDetails(true);
          }}
        >
         <EditOutlined/>
        </a>
        <Divider type="vertical" />
        <a>

          <Popconfirm
                  title="voulez-vous vraiment supprimer ce client ?"
                  onConfirm={() => {
          
                  }}
                  okText="Oui"
                  cancelText="Non"
                >
          <DeleteOutlined/>
                </Popconfirm>
        </a>
      </Space>
      ],
    },
  ];
  const obj = {
    visible: visibleForm,
    setVisible: setVisibleForm,
    forceRefresh: forceRefresh,
  };
  const detailsObj = {
    visible: visibleDetails,
    setVisible: setVisibleDetails,
    client: client,
    modify:modify, 
    setModify:setModify,
    forceRefresh: forceRefresh,
  };
  useEffect(() => {
  }, [refresh]);

  return (
    <div className="Cautions">
      <Breadcrumb separator=">" className="mt-5">
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Gestion des clients</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="mt-5" gutter={[12, 24]}>
        <Col xs={24}>
          <Card
            title={<Title level={4}>Gestion des clients</Title>}
            bordered={false}
          >
    <ProTable<IClient>
      columns={columns}
      cardBordered
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      search={{
        labelWidth: "auto",
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      pagination={{
        pageSize: 4,
        onChange: (page) => console.log(page),
      }}
      headerTitle="Liste de clients"
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
        <Button
        type="primary"
        icon={<PlusOutlined/>}
        onClick={() => {
          setVisibleForm(true);
        }}
      >
        Ajouter un client
      </Button>
      ]}
    />
          </Card>
        </Col>
      </Row>
      <CreateClient {...obj}></CreateClient>
      <ClientDetails {...detailsObj}></ClientDetails>
    </div>
  );
}

export default Clients;
