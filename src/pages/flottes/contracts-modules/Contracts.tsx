import React, { useEffect, useState } from "react";
import "../../../style/modules/Caution.less";
import {
  Button,
  Space,
  Table,
  Input,
  Tag,
  message,
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
} from "@ant-design/icons";
import { MdMoreTime } from "react-icons/md";
import moment from "moment";
import { Console } from "console";
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
  

  const columns: ColumnsType<IContract> = [
    {
      title: "Code dossier",
      dataIndex: "code_dossier",
      render:(code)=>(<a>{code}</a>),
      key: 0,
      filterDropdown: (
        <div style={{ display: "flex" }}>
          <Input
            onChange={(e) => {
              let x = contracts;
              setSearch(e.target.value)
              setData(
                x.filter((data) =>
                  data.code_dossier.toString().search(
                    e.target.value
                  ) === -1
                    ? false
                    : true
                )
              );
            }}
          ></Input>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => {
              let x = contracts;
              setData(
                x.filter((data) =>
                  data.code_dossier.toString().search(
                    search
                  ) === -1
                    ? false
                    : true
                )
              );
            }}
          />
        </div>
      ),
    },
    {
      title: "Code client",
      dataIndex: "code_client",
      responsive: ["md"],
      render:(code)=>(<a>{code}</a>),
      key: 1,
      filterDropdown: (
        <div style={{ display: "flex" }}>
          <Input
            onChange={(e) => {
              let x = contracts;
              setSearch(e.target.value)
              setData(
                x.filter((data) =>
                  data.code_client.toString().search(
                    e.target.value
                  ) === -1
                    ? false
                    : true
                )
              );
            }}
          ></Input>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => {
              let x = contracts;
              setData(
                x.filter((data) =>
                  data.code_client.toString().search(
                    search
                  ) === -1
                    ? false
                    : true
                )
              );
            }}
          />
        </div>
      ),
    },
    
    {
      title: "Date établissement",
      key: 3,
      dataIndex: "date_etablissement",
      responsive: ["xl"],
      sorter: (a, b) =>
        moment(a.date_etablissement, "DDMMYYYY").valueOf() -
        moment(b.date_etablissement, "DDMMYYYY").valueOf(),
    },
    {
      title: "Date de fin prévue",
      key: 4,
      dataIndex: "date_fin_prevue",
      sorter: (a, b) =>
        moment(a.date_fin_prevue, "DDMMYYYY").valueOf() -
        moment(b.date_fin_prevue, "DDMMYYYY").valueOf(),
    },
    {
      title: "Nature échéance",
      key: 9,
      dataIndex: "nature_echeance",
      render: (Etat_main_levée: string) => (
        <Tag
          color={
            Etat_main_levée === "annuelle"
              ? "blue"
              : Etat_main_levée === "trimestrielle"
              ? "gold"
              : Etat_main_levée === "mensuel"
              ? "green"
              : "red"
          }
        >
          {Etat_main_levée}
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
      onFilter: (value, record) => record.nature_echeance === value,
    },
    
    {
      title: "Dernière règlement",
      key: 8,
      dataIndex: "derniere_reglement",
      sorter: (a, b) => {
        return (
          moment(a.derniere_reglement, "DDMMYYYY").valueOf() -
          moment(b.derniere_reglement, "DDMMYYYY").valueOf()
        );
      },
    },

    {
      title: "Action",
      key: "10",
      render: (caution) => (
        <Space size="small">
          <a
            onClick={() => {
              setVisibleDetails(true);
            }}
          >
            <EyeOutlined/>
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setVisibleDetails(true);
            }}
          >
           <EditOutlined/>
          </a>
          <Divider type="vertical" />
          <a
          >
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
  };
  useEffect(() => {
    setData(contracts);
  }, [refresh]);

  return (
    <div className="Caution">
      <Breadcrumb separator=">" className="mt-5">
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Gestion des contrats LLD</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="mt-5" gutter={[12, 24]}>
        <Col xs={24}>
          <Card
            title={<Title level={4}>Gestion des contrats LLD</Title>}
            bordered={false}
            extra={
              <Button
                type="primary"
                onClick={() => {
                  setVisibleForm(true);
                }}
              >
                Ajouter un contrat
              </Button>
            }
          >
            <Table
              columns={columns}
              dataSource={data}
              pagination={{
                size: "small",
                pageSize: 7,
              }}
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
