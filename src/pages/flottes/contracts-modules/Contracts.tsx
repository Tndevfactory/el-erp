import React, { useEffect, useState } from "react";
import {
  Button,
  Space,
  Tag,
  Breadcrumb,
  Card,
  Col,
  Row,
  Typography,
  Divider,
  Popconfirm
} from "antd";
import { ProTable, TableDropdown, ProColumns } from '@ant-design/pro-components';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined
} from "@ant-design/icons";
import moment from "moment";
import CreateContract from "./CreateContract";
import ContarctDetails from "./ContarctDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  IContract
} from "@/features/flotte/contract/flotteContractSlice";
import type { ColumnsType } from "antd/es/table";
const { Paragraph, Title } = Typography;

function Contracts() {
  const dispatch = useDispatch();
  var { contracts } = useSelector((store: any) => store.flotteContract);
  const [update, setUpdate] = useState(false);
  const [prolongation, setProlongation] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleDetails, setVisibleDetails] = useState(false);
  let [search, setSearch] = useState("");
  const [caution, setCaution] = useState({});
  const [refresh, forceRefresh] = useState(0);
  const [modify, setModify]= useState(false)
  

  const columns: ProColumns<IContract>[] = [
    {
      title: "Code dossier",
      dataIndex: "code_dossier",
      render: (code) => <a>{code}</a>,
      key: "code_dossier",
    },
    {
      title: "Code client",
      dataIndex: "code_client",
      responsive: ["md"],
      key: "code_client",
    },

    {
      title: "Date établissement",
      key: "date_etablissement",
      dataIndex: "date_etablissement",
      responsive: ["xl"],
      search: false,
      sorter: (a, b) =>
        moment(a.date_etablissement, "DDMMYYYY").valueOf() -
        moment(b.date_etablissement, "DDMMYYYY").valueOf(),
    },
    {
      title: "Date de fin prévue",
      key: 4,
      search: false,
      dataIndex: "date_fin_prevue",
      sorter: (a, b) =>
        moment(a.date_fin_prevue, "DDMMYYYY").valueOf() -
        moment(b.date_fin_prevue, "DDMMYYYY").valueOf(),
    },
    {
      title: "Nature échéance",
      key: "nature_echeance",
      dataIndex: "nature_echeance",
      search:false,
      // valueType: "select",
      // valueEnum: {
      //   all: { text: "Tout" },
      //   annuelle: {
      //     text: "Annuelle",
      //     status: "annuelle",
      //   },
      //   trimestrielle: {
      //     text: "Trimestrielle",
      //     status: "trimestrielle",
      //   },
      //   mensuel: {
      //     text: "Mensuel",
      //     status: "mensuel",
      //   },
      // },
      render: (_, contrat) => (
        <Tag
          color={
            contrat.nature_echeance === "annuelle"
              ? "blue"
              : contrat.nature_echeance === "trimestrielle"
              ? "gold"
              : contrat.nature_echeance === "mensuel"
              ? "green"
              : "red"
          }
        >
          {contrat.nature_echeance}
        </Tag>
      ),
      filters: [
        {
          text: "Annuelle",
          value: "annuelle",
        },
        {
          text: "Trimestrielle",
          value: "trimestrielle",
        },
        {
          text: "Mensuel",
          value: "mensuel",
        },
      ],
      onFilter: (value, record) => record.nature_echeance === value,
    },
    {
      title: "Dernière règlement",
      key: "derniere_reglement",
      dataIndex: "derniere_reglement",
      search: false,
      sorter: (a, b) => {
        return (
          moment(a.derniere_reglement, "DDMMYYYY").valueOf() -
          moment(b.derniere_reglement, "DDMMYYYY").valueOf()
        );
      },
    },

    {
      title: 'Action',
      valueType: 'option',
      key: 'option',
      render: (caution) => (
        <Space size="small">
          <a
            onClick={() => {
              setModify(false)
              setVisibleDetails(true);
            }}
          >
            <EyeOutlined />
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setModify(true)
              setVisibleDetails(true);
            }}
          >
            <EditOutlined />
          </a>
          <Divider type="vertical" />
          <a>
            <Popconfirm
              title="voulez-vous vraiment supprimer ce contrat ?"
              onConfirm={() => {}}
              okText="Oui"
              cancelText="Non"
            >
              <DeleteOutlined />
            </Popconfirm>
          </a>
        </Space>
      ),
    },
  ];
  const [openSelectMenu, setOpenSelectMenu] = useState(false);
  const [data, setData] = useState([]);
  const handleOpenChange = (flag: boolean) => {
    setOpenSelectMenu(flag);
  };
  const handleCloseCaution = (id) => {
    forceRefresh(Math.random());
  };
  const obj = {
    visible: visibleForm,
    setVisible: setVisibleForm,
    forceRefresh: forceRefresh,
  };
  const detailsObj = {
    visible: visibleDetails,
    setVisible: setVisibleDetails,
    caution: caution,
    forceRefresh: forceRefresh,
    update: update,
    setUpdate: setUpdate,
    prolongation: prolongation,
    setProlongation: setProlongation,
    modify: modify, 
    setModify: setModify
  };
  useEffect(() => {
    setData(contracts);
  }, [refresh]);

  return (
    <div className="Contracts">
      <Breadcrumb separator=">" className="mt-5">
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Gestion des contrats LLD</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="mt-5" gutter={[12, 24]}>
        <Col xs={24}>
          <Card
            title={<Title level={4}>Gestion des contrats LLD</Title>}
            bordered={false}
          >
    <ProTable<IContract>
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
      headerTitle="Liste de contrats"
      request={async (params) => {
        console.log(`request params:`, params);
        var dataFilter=contracts
        if(params.code_client) dataFilter=dataFilter.filter((item)=>item.code_client.toString().toUpperCase().search(params.code_client.toString().toUpperCase())===-1?false:true);
        if(params.code_dossier) dataFilter=dataFilter.filter((item)=>item.code_dossier.toString().toUpperCase().search(params.code_dossier.toString().toUpperCase())===-1?false:true);
        // if(params.nature_echeance) dataFilter=dataFilter.filter((item)=>item.nature_echeance.toString().toUpperCase().search(params.nature_echeance.toString().toUpperCase())===-1?false:true);
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
        Ajouter un contrat
      </Button>
      ]}
    />
          </Card>
        </Col>
      </Row>
      <CreateContract {...obj}></CreateContract>
      <ContarctDetails {...detailsObj}></ContarctDetails>
    </div>
  );
}

export default Contracts;
