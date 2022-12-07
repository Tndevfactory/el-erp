import React, { useEffect, useState } from "react";
import "../../../style/modules/Caution.less";
import {
  Button,
  Space,
  Tag,
  message,
  Breadcrumb,
  Card,
  Col,
  Row,
  Typography,
  Dropdown,
  Menu,
  Tooltip,
  Statistic
} from "antd";
import { ProTable, TableDropdown, ProColumns } from '@ant-design/pro-components';
import {
  DeleteOutlined,
  MoreOutlined,
  EditOutlined,
  InboxOutlined,
  CheckOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { MdMoreTime } from "react-icons/md";
import moment from "moment";
import { Console } from "console";
import CautionForm from "./CautionForm";
import CautionDetails from "./CautionDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneCaution,
  CautionApprove,
  ICaution,
  closeCaution,
} from "@/features/caution/cautionSlice";
import ListeProlongation from "./ListeProlongation";
import type { ColumnsType } from "antd/es/table";
const { Paragraph, Title } = Typography;

function Cautions() {
  const dispatch = useDispatch();
  var { cautions } = useSelector((store: any) => store.caution);
  cautions = cautions.map((item, index) =>
    Object.assign({}, item, {
      DateE: moment(
        moment(item.DateD, "DDMMYYYY").valueOf() + 86400000 * item.Durée
      ).format("DD/MM/YYYY"),
      key: index.toString(),
    })
  );
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [update, setUpdate] = useState(false);
  const [prolongation, setProlongation] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleDetails, setVisibleDetails] = useState(false);

  const [caution, setCaution] = useState({});
  const [refresh, forceRefresh] = useState(0);

  const menu = (caution) => (
    <Menu
      items={[
        {
          key: "0",
          label: (
            <a
              onClick={() => {
                dispatch(getOneCaution({ id: caution.id }));
                setVisibleDetails(true);
                setUpdate(true);
              }}
            >
              Modifier
            </a>
          ),
          icon: <EditOutlined />,
          disabled: caution.Etat_main_levée !== "En attente",
        },
        {
          key: "1",
          label: (
            <a
              onClick={() => {
                dispatch(CautionApprove({ id: caution.id }));
                forceRefresh(Math.random());
              }}
            >
              Approuver
            </a>
          ),
          icon: <CheckOutlined />,
          disabled: caution.Etat_main_levée !== "En attente",
        },
        {
          key: "2",
          label: (
            <a
              onClick={() => {
                dispatch(getOneCaution({ id: caution.id }));
                setVisibleDetails(true);
                setProlongation(true);
              }}
            >
              Prolonger
            </a>
          ),
          icon: <MdMoreTime />,
          disabled: caution.Etat_main_levée !== "En cours",
        },
        {
          key: "3",
          label: (
            <a
              onClick={() => {
                if (expandedRowKeys.indexOf(caution.key) === -1) {
                  setExpandedRowKeys([...expandedRowKeys, caution.key]);
                } else {
                  setExpandedRowKeys(
                    expandedRowKeys.filter((item) => item !== caution.key)
                  );
                }
              }}
            >
              Liste de prolongation
            </a>
          ),
          icon:
            expandedRowKeys.indexOf(caution.key) === -1 ? (
              <EyeOutlined />
            ) : (
              <EyeInvisibleOutlined />
            ),
          disabled: caution?.Prolongations?.length === 0,
        },
        {
          key: "4",
          danger: caution.Etat_main_levée === "En attente",
          label: "Supprimer",
          icon: <DeleteOutlined />,
          disabled: caution.Etat_main_levée !== "En attente",
        },
        {
          key: "5",
          danger: caution.Etat_main_levée === "En cours",
          label: <a onClick={() => handleCloseCaution(caution.id)}>Fermer</a>,
          icon: <InboxOutlined />,
          disabled: caution.Etat_main_levée !== "En cours",
        },
      ]}
    />
  );
  const columns: ProColumns<ICaution>[] = [
    {
      title: "Nom du Projet ",
      dataIndex: "Nom_Projet",
      key: "Nom_Projet",
    },
    {
      title: "Demandeur",
      dataIndex: "Demandeur",
      key: "Demandeur",
      responsive: ["xxl"],
    },
    {
      title: "type de caution ",
      dataIndex: "type_caution",
      key: 2,
      search: false,
      render: (type_caution) => (
        <Tag
          color={
            type_caution === "Provisoire-CSP"
              ? "blue"
              : type_caution === "Retenue de Garantie"
              ? "gold"
              : type_caution === "Définitive-CSP"
              ? "green"
              : "red"
          }
        >
          {type_caution}
        </Tag>
      ),
      filters: [
        {
          text: "Provisoire-CSP",
          value: "Provisoire-CSP",
        },
        {
          text: "Retenue de Garantie",
          value: "Retenue de Garantie",
        },
        {
          text: "Définitive-CSP",
          value: "Définitive-CSP",
        },
        {
          text: "Avance",
          value: "Avance",
        },
      ],
      onFilter: (value, record) => record.type_caution === value,
    },
    {
      title: "Date de début ",
      key: 3,
      dataIndex: "DateD",
      responsive: ["xxl"],
      search: false,
      sorter: (a, b) =>
        moment(a.DateD, "DDMMYYYY").valueOf() -
        moment(b.DateD, "DDMMYYYY").valueOf(),
    },
    {
      title: "Client",
      key: "Client",
      dataIndex: "Client",
      width: "15%",
    },
    {
      title: "Montant",
      key: 5,
      search: false,
      dataIndex: "Montant",
      render:((_,caution) =><Statistic value={caution.Montant} precision={3} style={{}}/>),
      responsive: ["xl"],
      // width:"7%",
      sorter: (a, b) => a.Montant - b.Montant,
    },
    {
      title: "Durée",
      key: 6,
      search: false,
      render: (_,caution) => (
        <Space size="small">
          {caution.Durée}
          {caution?.Prolongations?.length !== 0 && (
            <Tooltip title="Voir liste prolongations">
              <MdMoreTime
                style={{cursor:'pointer'}}
                onClick={() => {
                  if (expandedRowKeys.indexOf(caution.key) === -1) {
                    setExpandedRowKeys([...expandedRowKeys, caution.key]);
                  } else {
                    setExpandedRowKeys(
                      expandedRowKeys.filter((item) => item !== caution.key)
                    );
                  }
                }}
              />
            </Tooltip>
          )}
        </Space>
      ),
      responsive: ["xl"],
    },
    {
      title: "Ligne",
      key: 7,
      dataIndex: "ligne",
      search: false,
      responsive: ["xxl"],
      render:(_,caution) => (
        <Tag color={caution.ligne === "EPS" ? "geekblue" : "volcano"}>{caution.ligne}</Tag>
      ),
      filters: [
        {
          text: "EPS",
          value: "EPS",
        },
        {
          text: "Compte courant",
          value: "Compte courant",
        },
      ],
      onFilter: (value, record) => record.ligne === value,
    },
    {
      title: "Date d'échéance ",
      key: 8,
      search: false,
      dataIndex: "DateE",
      responsive: ["md"],
      sorter: (a, b) => {
        return (
          moment(a.DateE, "DDMMYYYY").valueOf() -
          moment(b.DateE, "DDMMYYYY").valueOf()
        );
      },
    },
    {
      title: "Etat",
      key: 9,
      dataIndex: "Etat_main_levée",
      // width:"7%",
      search: false,
      render: (_,caution) => (
        <Tag
          color={
            caution.Etat_main_levée === "Fermée"
              ? "blue"
              : caution.Etat_main_levée === "En attente"
              ? "gold"
              : caution.Etat_main_levée === "En cours"
              ? "green"
              : "red"
          }
        >
          {caution.Etat_main_levée}
        </Tag>
      ),
      filters: [
        {
          text: "Fermée",
          value: "Fermée",
        },
        {
          text: "En cours",
          value: "En cours",
        },
        {
          text: "En attente",
          value: "En attente",
        },
      ],
      onFilter: (value, record) => record.Etat_main_levée === value,
    },
    {
      title: "Action",
      valueType: 'option',
      key: "10",
      render: (_,caution) => (
        <Space size="small">
          <a
            onClick={() => {
              dispatch(getOneCaution({ id: caution.id }));
              setVisibleDetails(true);
            }}
          >
            Détails
          </a>
          <Dropdown overlay={menu(caution)} placement="bottom">
            <div style={{ paddingBottom: "5px" }}>
              <MoreOutlined onClick={(e) => e.preventDefault()} />
            </div>
          </Dropdown>
        </Space>
      ),
    },
  ];
  const [openSelectMenu, setOpenSelectMenu] = useState(false);
  const [data, setData] = useState([]);
  const handleCloseCaution = (id) => {
    dispatch(closeCaution({ id: id }));
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
  };
  useEffect(() => {
    setData(cautions);
  }, [refresh]);

  return (
    <div className="Cautions">
      <Breadcrumb separator=">" className="mt-5">
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Gestion des cautions</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="mt-5" gutter={[12, 24]}>
        <Col xs={24}>
          <Card
            title={
                <Title level={4}>Gestion des cautions</Title>
            }
            bordered={false}
          >
            <ProTable<ICaution>
                    headerTitle="Liste de cautions"
              rowClassName={(record, index) =>
                record.Etat_main_levée === "En attente"
                  ? "table-row-en-attente"
                  : record.Etat_main_levée === "En cours" &&
                    moment(record.DateE, "DDMMYYYY").diff(moment(), "days") <=
                      10
                  ? "table-row-warning"
                  : "nothing"
              }
              search={{
                labelWidth: "auto",
              }}
              cardBordered
              columnsState={{
                persistenceKey: 'pro-table-singe-demos',
                persistenceType: 'localStorage',
                onChange(value) {
                  console.log('value: ', value);
                },
              }}
              columns={columns}
              request={async (params) => {
                console.log(`request params:`, params);
                var dataFilter=cautions
                if(params.Nom_Projet) dataFilter=dataFilter.filter((item)=>item.Nom_Projet.toString().toUpperCase().search(params.Nom_Projet.toString().toUpperCase())===-1?false:true);
                if(params.Demandeur) dataFilter=dataFilter.filter((item)=>item.Demandeur.toString().toUpperCase().search(params.Demandeur.toString().toUpperCase())===-1?false:true);
                if(params.Client) dataFilter=dataFilter.filter((item)=>item.Client.toString().toUpperCase().search(params.Client.toString().toUpperCase())===-1?false:true);
                return {
                  data: dataFilter,
                  success: true,
                };
              }}
              pagination={{
                size: "small",
                pageSize: 7,
              }}
              expandable={{
                expandedRowRender: (record) => (
                  <div
                    className="flex justify-center"
                  >
                    <div style={{ width: "60%", margin:"15px" }}>
                      <ListeProlongation prolongation={record.Prolongations} />
                    </div>
                  </div>
                ),
                rowExpandable: (record) => record?.Prolongations?.length !== 0,
                showExpandColumn: false,
                expandedRowKeys: expandedRowKeys,
              }}
              toolBarRender={() => [
                <Button
                type="primary"
                onClick={() => {
                  setVisibleForm(true);
                }}
              >
                Demander une caution
              </Button>
              ]}
            />
          </Card>
        </Col>
      </Row>
      <CautionForm {...obj}></CautionForm>
      <CautionDetails {...detailsObj}></CautionDetails>
    </div>
  );
}

export default Cautions;
