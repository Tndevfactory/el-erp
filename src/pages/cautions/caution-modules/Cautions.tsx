import React, { useEffect, useState } from "react";
import "../../../style/modules/Caution.less";
import {
  Button,
  Space,
  Table,
  Input,
  Tag,
  Popconfirm,
  message,
  Affix,
  Breadcrumb,
  Card,
  Col,
  Row,
  Typography,
  Dropdown,
  Menu,
  Checkbox,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  MoreOutlined,
  EditOutlined,
  InboxOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  CheckOutlined,
  AimOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
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
  const [sortByDateE, setSortByDateE] = useState(0);
  const [sortByDateD, setSortByDateD] = useState(0);
  const [sortByMontant, setSortByMontant] = useState(0);
  let [search, setSearch] = useState("");
  let [searchBy, setSearchBy] = useState("");
  const [filter, setFilter] = useState<string[]>([]);

  const [caution, setCaution] = useState({});
  const [refresh, forceRefresh] = useState(0);
  const confirm = (e): void => {
    console.log(e);
    message.success("Click on Yes");
  };

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
  const columns: ColumnsType<ICaution> = [
    {
      title: "Nom du Projet ",
      dataIndex: "Nom_Projet",
      key: 0,
      filterDropdown: (
        <div style={{ display: "flex" }}>
          <Input
            onChange={(e) => {
              setSearch(e.target.value);
              let x = cautions;
              setData(
                x.filter((data) =>
                  data.Nom_Projet.toUpperCase().search(
                    e.target.value.toUpperCase()
                  ) === -1
                    ? false
                    : true
                )
              );
              if (search !== "") setSearchBy("Nom du projet");
            }}
          ></Input>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => {
              let x = cautions;
              setData(
                x.filter((data) =>
                  data.Nom_Projet.toUpperCase().search(search.toUpperCase()) ===
                  -1
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
      title: "Demandeur",
      dataIndex: "Demandeur",
      key: 1,
      responsive: ["xxl"],
      filterDropdown: (
        <div style={{ display: "flex" }}>
          <Input
            onChange={(e) => {
              setSearch(e.target.value);
              let x = cautions;
              setData(
                x.filter((data) =>
                  data.Demandeur.toUpperCase().search(
                    e.target.value.toUpperCase()
                  ) === -1
                    ? false
                    : true
                )
              );
              if (search !== "") setSearchBy("Demandeur");
            }}
          ></Input>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => {
              let x = cautions;
              setData(
                x.filter((data) =>
                  data.Demandeur.toUpperCase().search(search.toUpperCase()) ===
                  -1
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
      title: "type de caution ",
      dataIndex: "type_caution",
      key: 2,
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
      onHeaderCell: (column) => {
        return {
          onClick: () => {
            if (sortByDateD === 2) setSortByDateD(0);
            else {
              setSortByDateD(sortByDateD + 1);
              setSortByMontant(0);
              setSortByDateE(0);
            }
          },
        };
      },
      sorter: (a, b) =>
        moment(a.DateD, "DDMMYYYY").valueOf() -
        moment(b.DateD, "DDMMYYYY").valueOf(),
    },
    {
      title: "Client",
      key: 4,
      dataIndex: "Client",
      width: "15%",
      filterDropdown: (
        <div style={{ display: "flex" }}>
          <Input
            onChange={(e) => {
              setSearch(e.target.value);
              let x = cautions;
              setData(
                x.filter((data) =>
                  data.Client.toUpperCase().search(
                    e.target.value.toUpperCase()
                  ) === -1
                    ? false
                    : true
                )
              );
              if (search !== "") setSearchBy("Client");
            }}
          ></Input>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => {
              let x = cautions;
              setData(
                x.filter((data) =>
                  data.Client.toUpperCase().search(search.toUpperCase()) === -1
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
      title: "Montant",
      key: 5,
      dataIndex: "Montant",
      responsive: ["xl"],
      // width:"7%",
      onHeaderCell: (column) => {
        return {
          onClick: () => {
            if (sortByMontant === 2) setSortByMontant(0);
            else {
              setSortByMontant(sortByMontant + 1);
              setSortByDateD(0);
              setSortByDateE(0);
            }
          },
        };
      },
      sorter: (a, b) => a.Montant - b.Montant,
    },
    {
      title: "Durée",
      key: 6,
      render: (caution) => (
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
      responsive: ["xxl"],
      render: (ligne: string) => (
        <Tag color={ligne === "EPS" ? "geekblue" : "volcano"}>{ligne}</Tag>
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
      dataIndex: "DateE",
      responsive: ["md"],
      onHeaderCell: (column) => {
        return {
          onClick: () => {
            if (sortByDateE === 2) setSortByDateE(0);
            else {
              setSortByDateE(sortByDateE + 1);
              setSortByMontant(0);
              setSortByDateD(0);
            }
          },
        };
      },
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
      render: (Etat_main_levée: string) => (
        <Tag
          color={
            Etat_main_levée === "Fermée"
              ? "blue"
              : Etat_main_levée === "En attente"
              ? "gold"
              : Etat_main_levée === "En cours"
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
      onFilter: (value, record) => record.Etat_main_levée === value,
    },
    {
      title: "Action",
      key: "10",
      render: (caution) => (
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
  const handleOpenChange = (flag: boolean) => {
    setOpenSelectMenu(flag);
  };
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
              <Space size={100}>
                <Title level={4}>Gestion des cautions</Title>
                <Space size={50}>
                  {search !== "" && (
                    <div>
                      <span style={{ color: "#909497" }}>Filtrer par : </span>
                      {searchBy === "Demandeur" ? (
                        <Checkbox value="A" checked>
                          Demandeur
                        </Checkbox>
                      ) : searchBy === "Client" ? (
                        <Checkbox value="B" checked>
                          Client
                        </Checkbox>
                      ) : (
                        <Checkbox value="C" checked>
                          Nom du projet
                        </Checkbox>
                      )}
                    </div>
                  )}

                  {(sortByDateE !== 0 ||
                    sortByDateD !== 0 ||
                    sortByMontant !== 0) && (
                    <div>
                      <span style={{ color: "#909497" }}>Trier par : </span>
                      {sortByDateE !== 0 && (
                        <Checkbox value="A" checked={true}>
                          Date d'échéance{" "}
                          {sortByDateE === 1 ? (
                            <ArrowUpOutlined />
                          ) : (
                            <ArrowDownOutlined />
                          )}
                        </Checkbox>
                      )}
                      {sortByDateD !== 0 && (
                        <Checkbox value="B" checked={true}>
                          Date de début{" "}
                          {sortByDateD === 1 ? (
                            <ArrowUpOutlined />
                          ) : (
                            <ArrowDownOutlined />
                          )}
                        </Checkbox>
                      )}
                      {sortByMontant !== 0 && (
                        <Checkbox value="C" checked={true}>
                          Montant{" "}
                          {sortByMontant === 1 ? (
                            <ArrowUpOutlined />
                          ) : (
                            <ArrowDownOutlined />
                          )}
                        </Checkbox>
                      )}
                    </div>
                  )}
                </Space>
              </Space>
            }
            bordered={false}
            extra={
              <Button
                type="primary"
                onClick={() => {
                  setVisibleForm(true);
                }}
              >
                Demander une caution
              </Button>
            }
          >
            <Table
              rowClassName={(record, index) =>
                record.Etat_main_levée === "En attente"
                  ? "table-row-en-attente"
                  : record.Etat_main_levée === "En cours" &&
                    moment(record.DateE, "DDMMYYYY").diff(moment(), "days") <=
                      10
                  ? "table-row-warning"
                  : "nothing"
              }
              columns={columns}
              dataSource={data}
              pagination={{
                size: "small",
                pageSize: 7,
              }}
              expandable={{
                expandedRowRender: (record) => (
                  <div
                    style={{ textAlign: "center" }}
                    className="flex justify-center"
                  >
                    <div style={{ width: "60%" }}>
                      <ListeProlongation prolongation={record.Prolongations} />
                    </div>
                  </div>
                ),
                rowExpandable: (record) => record?.Prolongations?.length !== 0,
                showExpandColumn: false,
                expandedRowKeys: expandedRowKeys,
              }}
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
