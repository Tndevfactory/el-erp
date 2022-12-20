import React, { useState, useEffect} from 'react'
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
    Popconfirm,
    Avatar,
    Tag,
    Tooltip
  } from "antd";
  import {
    ProTable,
    TableDropdown,
    ProColumns,
  } from "@ant-design/pro-components";
  import {
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    PlusOutlined,
  } from "@ant-design/icons";
  import { useDispatch, useSelector } from "react-redux";
import CreateSession from './CreateSession';
import { ISession } from '@/features/RessourcesHumaines/formation/sessionSlice';
import DetailSession from './DetailSession';
  const { Paragraph, Title } = Typography;
const Sessions : React.FC = () => {
    const dispatch = useDispatch();
    var { windowWidth } = useSelector((store: any) => store.ui);
    var { sessions } = useSelector((store: any) => store.session);
    const [visibleForm, setVisibleForm] = useState(false);
    const [visibleDetails, setVisibleDetails] = useState(false);
    const [refresh, forceRefresh] = useState(0);
    const [modify, setModify] = useState(false);
    const [session, setSession] = useState<ISession>();
    console.log(sessions)
    const columns : ProColumns<ISession>[]= [
      {
        title: "Désignation",
        dataIndex: "designation",
        key: "designation",
        filters: true,
        onFilter: true,
      },
      {
        title: "Domaine",
        dataIndex: "domaine",
        key: "domaine",
      },
      {
        title: "Sujet",
        dataIndex: "sujet",
        key: "sujet",
        search:false,
        responsive:["xl"]
      },
      {
        title: "Participation",
        dataIndex: "participation",
        key: "participation",
        search:false,
        render:(_, session) => (
          <Tag color={session.participation==="Présentielle"?"blue":session.participation==="A distance"?"":"green"}>
            {session.participation}
          </Tag>
        )
      },
      {
        title: "Participants",
        dataIndex: "participants",
        key: "participants",
        search:false,
        render:(_, session) => (
          <Avatar.Group
          maxCount={windowWidth > 620 ?3:2}
        >
          {session.participants.map(item =>
          <Tooltip title={item.label}>
          <Avatar src={item.img} />
          </Tooltip>
          )}
        </Avatar.Group>
        )
      },
      {
        title: "Date début",
        key: "date_debut",
        dataIndex: "date_debut",
        responsive: ["md"],
        search: false,
      },
      {
        title: "Date fin",
        key: "date_fin",
        dataIndex: "date_fin",
        responsive: ["lg"],
        search: false,
      },
      {
        title: "Action",
        valueType: "option",
        key: "option",
        render: (text, session, _, action) => [
          windowWidth > 620 ? (
            <Space size="small">
              <a
                onClick={() => {
                  setSession(session);
                  setVisibleDetails(true);
                }}
              >
                <EyeOutlined />
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  setSession(session);
                  setModify(true);
                  setVisibleDetails(true);
                }}
              >
                <EditOutlined />
              </a>
              <Divider type="vertical" />
              <a>
                <Popconfirm
                  title="voulez-vous vraiment supprimer cette session ?"
                  onConfirm={() => {}}
                  okText="Oui"
                  cancelText="Non"
                >
                  <DeleteOutlined />
                </Popconfirm>
              </a>
            </Space>
          ) : (
            <TableDropdown
              key=" actionGroup "
              menus={[
                {
                  key: "0",
                  name: "Détail",
                  onClick: () => {
                    setSession(session);
                    setVisibleDetails(true);
                  },
                },
                {
                  key: "1",
                  name: "Modifier",
                  onClick: () => {
                    setSession(session);
                    setModify(true);
                    setVisibleDetails(true);
                  },
                },
                { key: "2", name: "Supprimer" },
              ]}
            />
          ),
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
        session: session,
        modify: modify,
        setModify: setModify,
        forceRefresh: forceRefresh,
      };
  return (
    <div> 
              <Breadcrumb separator=">" className="mt-5">
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Ressources humaines</Breadcrumb.Item>
        <Breadcrumb.Item href="">Sessions</Breadcrumb.Item>
      </Breadcrumb>
      <Card
            className=' mt-5'
            title={<Title level={4}>Gestion de sessions</Title>}
            bordered={false}
          >
            <ProTable<ISession>
              columns={columns}
              cardBordered
              columnsState={{
                persistenceKey: "pro-table-singe-demos",
                persistenceType: "localStorage",
                onChange(value) {
                  console.log("value: ", value);
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
              headerTitle="Liste de sessions"
              request={async (params) => {
                console.log(`request params:`, params);
                var dataFilter = sessions;
                return {
                  data: dataFilter,
                  success: true,
                };
              }}
              toolBarRender={() => [
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setVisibleForm(true);
                  }}
                >
                  Ajouter une session
                </Button>,
              ]}
            />
          </Card>
    <CreateSession {...obj}/>
    <DetailSession {...detailsObj}/>
    </div>
  )
}

export default  Sessions
