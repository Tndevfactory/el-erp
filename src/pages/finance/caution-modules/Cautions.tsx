import React, { useEffect, useRef, useState } from "react";
import "../../../style/modules/Caution.less";

import {
  Button,
  Space,
  Tag,
  Breadcrumb,
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Statistic,
  Select,
  DatePicker,
  Tabs,
  Badge,
} from "antd";
import { ProTable, ProColumns } from "@ant-design/pro-components";
import { MdMoreTime } from "react-icons/md";
import moment from "moment";
import { Console } from "console";
import CautionForm from "./CautionForm";
import CautionDetails from "./CautionDetails";
import { useDispatch, useSelector } from "react-redux";
import { ICaution, getCautions } from "@/features/finance/caution/cautionSlice";
import ListeProlongation from "./prolongation/ListeProlongation";
import type { ColumnsType } from "antd/es/table";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
const { Paragraph, Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";

const Cautions: React.FC = () => {
  const dispatch = useDispatch();
  const tableRef = useRef<any>();
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleDetails, setVisibleDetails] = useState(false);
  type PickerType = "date" | "week" | "month" | "quarter" | "year";
  const [typeDate, setTypeDate] = useState<PickerType>("week");
  const [date, setDate] = useState<string[]>(null);
  const [caution, setCaution] = useState<ICaution>();
  const [cautions, setCautions] = useState<ICaution[]>();
  const [refresh, forceRefresh] = useState(0);

  const customWeekStartEndFormat: DatePickerProps["format"] = (value) =>
    `${dayjs(value).startOf("week").format(dateFormat)} ~ ${dayjs(value)
      .endOf("week")
      .format(dateFormat)}`;
  const columns: ProColumns<ICaution>[] = [
    {
      title: "Entreprise ",
      key: "entreprise",
      dataIndex: "entreprise_name",
    },
    {
      title: "Nom du Projet ",
      key: "Nom_Projet",
      render: (x, caution) => <>{caution.projet.designation}</>,
    },
    {
      title: "type de caution",
      key: 2,
      search: false,
      render: (x, caution) => (
        <Tag
          color={
            caution.type_id === 1
              ? "blue"
              : caution.type_id === 2
              ? "gold"
              : caution.type_id === 3
              ? "green"
              : "red"
          }
        >
          {caution.caution_type.type}
        </Tag>
      ),
    },
    {
      title: "A faire avant",
      key: 31,
      render: (_, caution) => (
        <>{moment(new Date(caution.date_max_retour)).format(dateFormat)}</>
      ),
      responsive: ["xxl"],
      search: false,
      sorter: (a, b) =>
        moment(a.date_max_retour, "YYYY-MM-DD HH:mm:ss").valueOf() -
        moment(b.date_max_retour, "YYYY-MM-DD HH:mm:ss").valueOf(),
    },
    {
      title: "Date de d??but ",
      key: 3,
      render: (_, caution) => (
        <>{moment(new Date(caution.created_at)).format(dateFormat)}</>
      ),
      responsive: ["xxl"],
      search: false,
      sorter: (a, b) =>
        moment(a.created_at, "YYYY-MM-DD HH:mm:ss").valueOf() -
        moment(b.created_at, "YYYY-MM-DD HH:mm:ss").valueOf(),
    },
    {
      title: "Client",
      key: "Client",
      dataIndex: "tier_name",
      responsive: ["sm"],
    },
    {
      title: "Montant",
      key: 5,
      search: false,
      dataIndex: "Montant",
      render: (_, caution) => (
        <Statistic value={caution.montant} precision={3} />
      ),
      responsive: ["xl"],
      sorter: (a, b) => a.montant - b.montant,
    },
    {
      title: "Dur??e",
      key: 6,
      search: false,
      render: (_, caution) => (
        <Space size="small">
          {caution.period_valid}
          {caution.etat_id === 6 && (
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
      responsive: ["xxl"],
      render: (_, caution) => (
        <Tag color={caution.eps === 1 ? "geekblue" : "volcano"}>
          {caution.eps === 1 ? "EPS" : "Compte courant"}
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
      title: "Date d'??ch??ance ",
      key: 8,
      // dataIndex: "DateE",
      responsive: ["md"],
      render: (x, caution) => <>{caution.DateE}</>,
      sorter: (a, b) => {
        return (
          moment(a.DateE, dateFormat).valueOf() -
          moment(b.DateE, dateFormat).valueOf()
        );
      },
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        return (
          <div>
            <Select
              value={typeDate}
              onChange={setTypeDate}
              style={{ width: "37%", marginRight: "3%" }}
            >
              <Option value="date">Intervalle</Option>
              <Option value="week">Semaine</Option>
              <Option value="month">Mois</Option>
              {/* <Option value="quarter">Quarter</Option>
              <Option value="year">Year</Option> */}
            </Select>
            {typeDate === "date" ? (
              <RangePicker
                style={{ width: "60%" }}
                onChange={(e, dateString) => {
                  // console.log(dateString);
                  setDate(dateString);
                }}
                format={dateFormat}
              />
            ) : typeDate === "week" ? (
              <DatePicker
                style={{ width: "60%" }}
                picker={typeDate}
                format={customWeekStartEndFormat}
                onChange={(e, dateString) => {
                  // console.log(dateString);
                  setDate([
                    dateString.substring(0, 10),
                    dateString.substring(13, 23), 
                  ]);
                }}
              />
            ) : (
              <DatePicker
                style={{ width: "60%" }}
                picker={typeDate}
                format={"MM/YYYY"}
                onChange={(e, dateString) => {
                  // console.log(dateString);
                  setDate([dateString]);
                }}
              />
            )}
          </div>
        );
      },
    },
    {
      title: "Etat",
      key: 9,
      dataIndex: "Etat_main_lev??e",
      // width:"7%",
      search: false,
      render: (_, caution) => (
        <Tag
          color={
            caution.etat_id === 3 ||
            caution.etat_id === 4 ||
            caution.etat_id === 9
              ? "blue"
              : caution.etat_id === 1
              ? "gold"
              : caution.etat_id === 2
              ? "red"
              : caution.etat_id === 5 || caution.etat_id === 6
              ? "green"
              : caution.etat_id === 7
              ? ""
              : "gold"
          }
        >
          {caution.caution_etat.etat}
        </Tag>
      ),
    },
    {
      title: "Action",
      valueType: "option",
      key: "10",
      render: (_, caution) => (
        <Space size="small">
          <a
            onClick={() => {
              setCaution(caution);
              setVisibleDetails(true);
            }}
          >
            D??tails
          </a>
        </Space>
      ),
    },
  ];

  const obj = {
    visible: visibleForm,
    setVisible: setVisibleForm,
    tableRef: tableRef,
  };
  const detailsObj = {
    visible: visibleDetails,
    setVisible: setVisibleDetails,
    caution: caution,
    tableRef: tableRef,
    cautions: cautions,
  };
  const handleGetCautions = (): Promise<ICaution[]> =>
    dispatch(getCautions())
      .unwrap()
      .then((originalPromiseResult) => {
        setCautions(originalPromiseResult.data);
        return originalPromiseResult.data.map((item, index) =>
          Object.assign({}, item, {
            DateE: moment(
              moment(item.created_at, "YYYY-MM-DD HH:mm:ss").valueOf() +
                86400000 * item.period_valid
            ).format("DD/MM/YYYY"),
            key: index.toString(),
            dureeAfterProlongation: 15,
          })
        );
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
        return [];
      });

  const Table = (etat: number) => (
    <ProTable<ICaution>
      actionRef={tableRef}
      headerTitle="Liste de cautions"
      rowClassName={(record, index) =>
        (record.etat_id === 9 &&
          localStorage.getItem("role") === "commerciale") ||
        ((record.etat_id === 1 || record.etat_id === 8) &&
          localStorage.getItem("role") === "chef") ||
        ((record.etat_id === 3 || record.etat_id === 4) &&
          localStorage.getItem("role") === "daf")
          ? "table-row-en-attente"
          : // record.Etat_main_lev??e === "En cours" &&
          moment(record.DateE, dateFormat).diff(moment(), "days") <= 10
          ? "table-row-warning"
          : "nothing"
      }
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
        setDate(null);
      }}
      request={async (params) => {
        console.log(`request params:`, params);
        var dataFilter = await handleGetCautions();
        if (etat)
          dataFilter = dataFilter.filter((item) => item.etat_id === etat);
        if (params.entreprise)
          dataFilter = dataFilter.filter((item) =>
            item.entreprise_name
              .toString()
              .toUpperCase()
              .search(params.entreprise.toString().toUpperCase()) === -1
              ? false
              : true
          );
        if (params.Nom_Projet)
          dataFilter = dataFilter.filter((item) =>
            item.projet.designation
              .toString()
              .toUpperCase()
              .search(params.Nom_Projet.toString().toUpperCase()) === -1
              ? false
              : true
          );
        if (params.Client)
          dataFilter = dataFilter.filter((item) =>
            item.tier_name
              .toString()
              .toUpperCase()
              .search(params.Client.toString().toUpperCase()) === -1
              ? false
              : true
          );
        if (date !== null)
          typeDate === "month"
            ? (dataFilter = dataFilter.filter(
                (item) => item.DateE.search(date[0]) !== -1
              ))
            : (dataFilter = dataFilter.filter(
                (item) =>
                  moment(item.DateE, dateFormat).valueOf() <=
                    moment(date[1], dateFormat).valueOf() &&
                  moment(item.DateE, dateFormat).valueOf() >=
                    moment(date[0], dateFormat).valueOf()
              ));
        return {
          data: dataFilter,
          success: true,
        };
      }}
      pagination={{
        size: "small",
        pageSize: 7,
      }}
      // expandable={{
      //   expandedRowRender: (record) => (
      //     <div className="flex justify-center">
      //       <div style={{ width: "60%", margin: "15px" }}>
      //         <ListeProlongation cautionId={record.id} />
      //       </div>
      //     </div>
      //   ),
      //   rowExpandable: (record) => record?.prolongations?.length !== 0,
      //   showExpandColumn: false,
      //   expandedRowKeys: expandedRowKeys,
      // }}
      toolBarRender={() =>
        (localStorage.getItem("role") === "commerciale" ||
          localStorage.getItem("role") === "daf") && [
          <Button
            type="primary"
            onClick={() => {
              setVisibleForm(true);
            }}
          >
            Demander une caution
          </Button>,
        ]
      }
    />
  );

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
            <Tabs
              defaultActiveKey="1"
              onChange={() => {}}
              items={[
                {
                  label: (
                    <Space>
                      <>Tout les cautions</>
                      <Badge
                        count={cautions?.length}
                        showZero
                        style={{ backgroundColor: "#CACFD2" }}
                      />
                    </Space>
                  ),
                  key: "1",
                  children: Table(0),
                },
                {
                  label: (
                    <Space>
                      <>Demandes</>
                      <Badge
                        count={
                          cautions?.filter((item) => item.etat_id === 1).length
                        }
                        showZero
                        style={{ backgroundColor: "#CACFD2" }}
                      />
                    </Space>
                  ),
                  key: "2",
                  children: Table(1),
                },
                {
                  label: (
                    <Space>
                      <>En cours DAF</>
                      <Badge
                        count={
                          cautions?.filter((item) => item.etat_id === 3).length
                        }
                        showZero
                        style={{ backgroundColor: "#CACFD2" }}
                      />
                    </Space>
                  ),
                  key: "3",
                  children: Table(3),
                },
                {
                  label: (
                    <Space>
                      <>En cours Banque</>
                      <Badge
                        count={
                          cautions?.filter((item) => item.etat_id === 4).length
                        }
                        showZero
                        style={{ backgroundColor: "#CACFD2" }}
                      />
                    </Space>
                  ),
                  key: "4",
                  children: Table(4),
                },
                {
                  label: (
                    <Space>
                      <>Ferm??es</>
                      <Badge
                        count={
                          cautions?.filter((item) => item.etat_id === 5).length
                        }
                        showZero
                        style={{ backgroundColor: "#CACFD2" }}
                      />
                    </Space>
                  ),
                  key: "5",
                  children: Table(5),
                },
                {
                  label: (
                    <Space>
                      <>Refus??es</>
                      <Badge
                        count={
                          cautions?.filter((item) => item.etat_id === 6).length
                        }
                        showZero
                        style={{ backgroundColor: "#CACFD2" }}
                      />
                    </Space>
                  ),
                  key: "6",
                  children: Table(2),
                },
                {
                  label: (
                    <Space>
                      <>Enregistr??es</>
                      <Badge
                        count={
                          cautions?.filter((item) => item.etat_id === 7).length
                        }
                        showZero
                        style={{ backgroundColor: "#CACFD2" }}
                      />
                    </Space>
                  ),
                  key: "7",
                  children: Table(7),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
      <CautionForm {...obj}></CautionForm>
      <CautionDetails {...detailsObj}></CautionDetails>
    </div>
  );
};

export default Cautions;
