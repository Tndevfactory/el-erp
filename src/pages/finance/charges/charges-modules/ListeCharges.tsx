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
      title: "Titre",
      dataIndex: "titre_frais",
      render: (code) => <a>{code}</a>,
      key: "titre_frais",
    },

    {
      title: "Montant",
      dataIndex: "montant_frais",
      responsive: ["md"],
      key: "montant_frais",
    },
    {
      title: "Date",
      key: "date_frais",
      dataIndex: "date_frais",
      responsive: ["xl"],
      search: false,
      sorter: (a, b) =>
        moment(a.date_frais, "DDMMYYYY").valueOf() -
        moment(b.date_frais, "DDMMYYYY").valueOf(),
    },
    {
      title: "Projet ",
      key: "titre_projet",
      dataIndex: "titre_projet",
      responsive: ["xl"],
      search: false,
    },
    {
      title: "Statut remboursement",
      key: "status_remboursement_frais",
      dataIndex: "status_remboursement_frais",
      search: false,
      render: (_, charge) => (
        <Tag
          color={
            charge.status_remboursement_frais == "En cours de traitement"
              ? "blue"
              : charge.status_remboursement_frais == "Rejeté"
              ? "red"
              : charge.status_remboursement_frais == "Traité"
              ? "green"
              : charge.status_remboursement_frais == "Complement d'information"
              ? "gold"
              : "red"
          }
        >
          <span style={{ cursor: "pointer" }}>
            {charge.status_remboursement_frais}
          </span>
        </Tag>
      ),
      filters: [
        {
          text: "en cours de traitement",
          value: "en cours de traitement",
        },
        {
          text: "complement d'information",
          value: "complement d'information",
        },
        {
          text: "non accepté",
          value: "non accepté",
        },
        {
          text: "effectué",
          value: "effectué",
        },
      ],
      onFilter: (value, record) => record.status_remboursement_frais === value,
    },

    {
      title: "Action",
      valueType: "option",
      key: "option",
      render: () =>
        windowWidth > 620 ? (
          <Space size="small">
            {/* <a
              onClick={() => {
                setModify(false);
                setVisibleDetails(true);
              }}
            >
              <EyeOutlined />
            </a>
            <Divider type="vertical" /> */}
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
            title={<Title level={4}>Gestion des frais</Title>}
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
