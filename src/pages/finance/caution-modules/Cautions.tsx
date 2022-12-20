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
  Statistic,
  Select,
  DatePicker,
  Input,
} from "antd";
import {
  ProTable,
  TableDropdown,
  ProColumns,
} from "@ant-design/pro-components";
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
  getCautions,
} from "@/features/finance/caution/cautionSlice";
import ListeProlongation from "./ListeProlongation";
import type { ColumnsType } from "antd/es/table";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
const { Paragraph, Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";
const Cautions: React.FC = ()=>{
  const dispatch = useDispatch();

  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [update, setUpdate] = useState(false);
  const [prolongation, setProlongation] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleDetails, setVisibleDetails] = useState(false);
  type PickerType = "date" | "week" | "month" | "quarter" | "year";
  const [typeDate, setTypeDate] = useState<PickerType>("week");
  const [date, setDate] = useState<string[]>(null);
  const [caution, setCaution] = useState<ICaution>();
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
  const customWeekStartEndFormat: DatePickerProps["format"] = (value) =>
  `${dayjs(value).startOf("week").format(dateFormat)} ~ ${dayjs(value)
    .endOf("week")
    .format(dateFormat)}`;
  const columns: ProColumns<ICaution>[] = [
    {
      title: "Nom du Projet ",
      key: "Nom_Projet",
      render: (x,caution) => <>{caution.projet.designation}</>
    },
    {
      title: "Demandeur",
      dataIndex: "Demandeur",
      key: "Demandeur",
      // responsive: ["xxl"],
    },
    {
      title: "type de caution",
      key: 2,
      search: false,
      render: (x,caution) => (
        <Tag
          color={
            caution.id === 1
              ? "blue"
              : caution.id === 2
              ? "gold"
              : caution.id === 3
              ? "green"
              : "red"
          }
        >
          {caution.caution_nature.designation}
        </Tag>
      ),
      filters: [
        {
          text: "Provisoire-CSP",
          value: 1,
        },
        {
          text: "Retenue de Garantie",
          value: 2,
        },
        {
          text: "Définitive-CSP",
          value: 3,
        },
        {
          text: "Avance",
          value: 4,
        },
      ],
      onFilter: (value, record) => record.caution_nature_id
       === value,
    },
    {
      title: "Date de début ",
      key: 3,
      render:(_,caution)=><>{moment(new Date(caution.created_at)).format(dateFormat)}</>,
      // responsive: ["xxl"],
      search: false,
      sorter: (a, b) =>
        moment(a.created_at, "YYYY-MM-DD HH:mm:ss" ).valueOf() -
        moment(b.created_at, "YYYY-MM-DD HH:mm:ss").valueOf(),
    },
    // {
    //   title: "Client",
    //   key: "Client",
    //   dataIndex: "Client",
    //   width: "15%",
    //   responsive: ["sm"],
    // },
    {
      title: "Montant",
      key: 5,
      search: false,
      dataIndex: "Montant",
      render: (_, caution) => (
        <Statistic value={caution.montant} precision={3} style={{}} />
      ),
      responsive: ["xl"],
      // width:"7%",
      sorter: (a, b) => a.montant - b.montant,
    },
    {
      title: "Durée",
      key: 6,
      search: false,
      render: (_, caution) => (
        <Space size="small">
          {caution.period_valid}
          {caution?.prolongation?.length !== 0 && (
            <Tooltip title="Voir liste prolongations">
              <MdMoreTime
                style={{ cursor: "pointer" }}
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
      // responsive: ["xxl"],
      render: (_, caution) => (
        <Tag color={caution.eps === 1 ? "geekblue" : "volcano"}>
          {caution.eps === 1? "EPS" : "Compte courant"}
        </Tag>
      ),
      filters: [
        {
          text: "EPS",
          value: 1,
        },
        {
          text: "Compte courant",
          value: 0,
        },
      ],
      onFilter: (value, record) => record.eps === value,
    },
    {
      title: "Date d'échéance ",
      key: 8,
      // dataIndex: "DateE",
      responsive: ["md"],
      render: (x,caution) => <>{caution.DateE}</>,
      sorter: (a, b) => {
        return (
          moment(a.DateE, dateFormat).valueOf() -
          moment(b.DateE, dateFormat).valueOf()
        );
      },
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        return (
          <Space direction="horizontal">
            <Select value={typeDate} onChange={setTypeDate}>
              <Option value="date">Intervalle</Option>
              <Option value="week">Semaine</Option>
              <Option value="month">Mois</Option>
              {/* <Option value="quarter">Quarter</Option>
              <Option value="year">Year</Option> */}
            </Select>
            {typeDate === "date" ? (
              <RangePicker
                style={{minWidth:"145px"}}
                onChange={(e, dateString) => {
                  console.log(dateString);
                  setDate(dateString);
                }}
                format={dateFormat}
              />
            ) : typeDate === "week" ? (
              <DatePicker
                style={{minWidth:"145px"}}
                picker={typeDate}
                format={customWeekStartEndFormat}
                onChange={(e, dateString) => {
                  console.log(dateString);
                  setDate([dateString.substring(0, 10),dateString.substring(13, 23)])
                }}
              />
            ) : (
              <DatePicker
                picker={typeDate}
                format={"MM/YYYY"}
                onChange={(e, dateString) => {
                  console.log(dateString);
                  setDate([dateString])

                }}
              />
            )}
          </Space>
        );
      },
    },
    // {
    //   title: "Etat",
    //   key: 9,
    //   dataIndex: "Etat_main_levée",
    //   // width:"7%",
    //   search: false,
    //   render: (_, caution) => (
    //     <Tag
    //       color={
    //         caution.Etat_main_levée === "Fermée"
    //           ? "blue"
    //           : caution.Etat_main_levée === "En attente"
    //           ? "gold"
    //           : caution.Etat_main_levée === "En cours"
    //           ? "green"
    //           : "red"
    //       }
    //     >
    //       {caution.Etat_main_levée}
    //     </Tag>
    //   ),
    //   filters: [
    //     {
    //       text: "Fermée",
    //       value: "Fermée",
    //     },
    //     {
    //       text: "En cours",
    //       value: "En cours",
    //     },
    //     {
    //       text: "En attente",
    //       value: "En attente",
    //     },
    //   ],
    //   onFilter: (value, record) => record.Etat_main_levée === value,
    // },
    {
      title: "Action",
      valueType: "option",
      key: "10",
      render: (_, caution) => (
        <Space size="small">
          <a
            onClick={() => {
              setCaution(caution)
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
  const [data, setData] = useState<ICaution[]>();
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

  const handleGetCautions=(): Promise < ICaution[] > => 
    dispatch(getCautions())
    .unwrap()
    .then((originalPromiseResult) => {
      return originalPromiseResult.data.map((item, index) =>
      Object.assign({}, item, {
        DateE: moment(
          moment(item.created_at,"YYYY-MM-DD HH:mm:ss").valueOf() + 86400000 * item.period_valid
        ).format("DD/MM/YYYY"),
        key: index.toString(),
      })
    );
    })
    .catch((rejectedValueOrSerializedError) => {
      console.log(rejectedValueOrSerializedError);
      return []
    });
  
  useEffect(() => {
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
            title={<Title level={4}>Gestion des cautions</Title>}
            bordered={false}
          >
            <ProTable<ICaution>
              headerTitle="Liste de cautions"
              // rowClassName={(record, index) =>
              //   record.Etat_main_levée === "En attente"
              //     ? "table-row-en-attente"
              //     : record.Etat_main_levée === "En cours" &&
              //       moment(record.DateE, dateFormat).diff(moment(), "days") <=
              //         10
              //     ? "table-row-warning"
              //     : "nothing"
              // }
              search={{
                labelWidth: "auto",
              }}
              cardBordered
              columnsState={{
                persistenceKey: "pro-table-singe-demos",
                persistenceType: "localStorage",
                // onChange(value) {
                //   console.log("value: ", value);
                // },
              }}
              columns={columns}
              onReset={() => {
                setData(null);
              }}
              request={async (params) => {
                console.log(`request params:`, params);
                var dataFilter =await handleGetCautions( ); 
                if (params.Nom_Projet)
                  dataFilter = dataFilter.filter((item) =>
                    item.projet.designation.toString()
                      .toUpperCase()
                      .search(params.Nom_Projet.toString().toUpperCase()) === -1
                      ? false
                      : true
                  );
                // if (params.Demandeur)
                //   dataFilter = dataFilter.filter((item) =>
                //     item.Demandeur.toString()
                //       .toUpperCase()
                //       .search(params.Demandeur.toString().toUpperCase()) === -1
                //       ? false
                //       : true
                //   );
                // if (params.Client)
                //   dataFilter = dataFilter.filter((item) =>
                //     item.Client.toString()
                //       .toUpperCase()
                //       .search(params.Client.toString().toUpperCase()) === -1
                //       ? false
                //       : true
                //   );
                if (date !== null)
                    typeDate==="month"?
                    dataFilter = dataFilter.filter(
                      (item) =>
                      item.DateE.search(date[0])!==-1
                    )
                    :dataFilter = dataFilter.filter(
                    (item) =>
                      moment(item.DateE, dateFormat).valueOf() <=
                        moment(date[1], dateFormat).valueOf() &&
                      moment(item.DateE, dateFormat).valueOf() >=
                        moment(date[0], dateFormat).valueOf()
                  );
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
                  <div className="flex justify-center">
                    <div style={{ width: "60%", margin: "15px" }}>
                      <ListeProlongation prolongation={record.prolongation} />
                    </div>
                  </div>
                ),
                rowExpandable: (record) => record?.prolongation?.length !== 0,
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
                </Button>,
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
