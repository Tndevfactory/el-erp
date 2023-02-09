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
  Popconfirm,
} from "antd";
import {
  ProTable,
  TableDropdown,
  ProColumns,
} from "@ant-design/pro-components";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Createharge from "./CreateCharge";
import UpdateCharge from "./UpdateCharge";
import { useDispatch, useSelector } from "react-redux";
import { ICharge } from "@/features/finance/charges/chargesSlice";
const { Title } = Typography;

function ListeCharge() {
  const dispatch = useDispatch();
  var { charges } = useSelector((store: any) => store.charges);
  var { windowWidth } = useSelector((store: any) => store.ui);
  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [refresh, forceRefresh] = useState(0);
  const [modify, setModify] = useState(false);

  const columns: ProColumns<ICharge>[] = [
    {
      title: "Code mission",
      dataIndex: "code_dossier",
      render: (code) => <a>{code}</a>,
      key: "code_dossier",
    },
    {
      title: "Code projet",
      dataIndex: "code_client",
      responsive: ["md"],
      key: "code_client",
    },

    {
      title: "Date de début",
      key: "date_etablissement",
      dataIndex: "date_etablissement",
      responsive: ["xl"],
      search: false,
      sorter: (a, b) =>
        moment(a.date_etablissement, "DDMMYYYY").valueOf() -
        moment(b.date_etablissement, "DDMMYYYY").valueOf(),
    },
    {
      title: "Date de fin",
      key: 4,
      search: false,
      dataIndex: "date_fin_prevue",
      sorter: (a, b) =>
        moment(a.date_fin_prevue, "DDMMYYYY").valueOf() -
        moment(b.date_fin_prevue, "DDMMYYYY").valueOf(),
    },
    {
      title: "Remboursement",
      key: "nature_echeance",
      dataIndex: "nature_echeance",
      search: false,
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
      title: "Date de règlement",
      key: "derniere_reglement",
      dataIndex: "derniere_reglement",
      search: false,
      responsive: ["sm"],
      sorter: (a, b) => {
        return (
          moment(a.derniere_reglement, "DDMMYYYY").valueOf() -
          moment(b.derniere_reglement, "DDMMYYYY").valueOf()
        );
      },
    },

    {
      title: "Action",
      valueType: "option",
      key: "option",
      render: () =>
        windowWidth > 620 ? (
          <Space size="small">
            <a
              onClick={() => {
                setModify(false);
                setVisibleDetails(true);
              }}
            >
              <EyeOutlined />
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                setModify(true);
                setVisibleDetails(true);
              }}
            >
              <EditOutlined />
            </a>
            <Divider type="vertical" />
            <a>
              <Popconfirm
                title="voulez-vous vraiment supprimer cette note de frais ?"
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
                  setModify(false);
                  setVisibleDetails(true);
                },
              },
              {
                key: "1",
                name: "Modifier",
                onClick: () => {
                  setModify(true);
                  setVisibleDetails(true);
                },
              },
              { key: "2", name: "Supprimer" },
            ]}
          />
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
    forceRefresh: forceRefresh,
    modify: modify,
    setModify: setModify,
  };
  useEffect(() => {
    setData(charges);
  }, [refresh]);

  return (
    <div className="Contracts">
      <Breadcrumb separator=">" className="mt-5">
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Finance</Breadcrumb.Item>
        <Breadcrumb.Item href="">Frais</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="mt-5" gutter={[12, 24]}>
        <Col xs={24}>
          <Card
            title={<Title level={4}>Gestion des frais et charges</Title>}
            bordered={false}
          >
            <ProTable<ICharge>
              columns={columns}
              cardBordered
              columnsState={{
                persistenceKey: "pro-table-singe-demos",
                persistenceType: "localStorage",
                onChange(value) {
                  // console.log("value: ", value);
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
                // onChange: (page) => console.log(page),
              }}
              headerTitle="Liste des frais"
              request={async (params) => {
                console.log(`request params:`, params);
                var dataFilter = charges;
                if (params.code_client)
                  dataFilter = dataFilter.filter((item) =>
                    item.code_client
                      .toString()
                      .toUpperCase()
                      .search(params.code_client.toString().toUpperCase()) ===
                    -1
                      ? false
                      : true
                  );
                if (params.code_dossier)
                  dataFilter = dataFilter.filter((item) =>
                    item.code_dossier
                      .toString()
                      .toUpperCase()
                      .search(params.code_dossier.toString().toUpperCase()) ===
                    -1
                      ? false
                      : true
                  );
                // if(params.nature_echeance) dataFilter=dataFilter.filter((item)=>item.nature_echeance.toString().toUpperCase().search(params.nature_echeance.toString().toUpperCase())===-1?false:true);
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
                  Note de frais
                </Button>,
              ]}
            />
          </Card>
        </Col>
      </Row>
      <Createharge {...obj}></Createharge>
      <UpdateCharge {...detailsObj}></UpdateCharge>
    </div>
  );
}

export default ListeCharge;
