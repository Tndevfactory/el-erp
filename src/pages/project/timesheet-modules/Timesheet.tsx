import React, { useEffect, useState } from "react";
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
  Select,
  DatePicker,
} from "antd";
import {
  ProTable,
  TableDropdown,
  ProColumns,
} from "@ant-design/pro-components";
import { SearchOutlined } from "@ant-design/icons";
import type { DatePickerProps } from "antd";
import moment from "moment";
import TimesheetDetails from "./details/TimesheetDetails";
import { useDispatch, useSelector } from "react-redux";
import { getTimesheets, ISheet } from "@/features/timesheet/timesheetSlice";
import * as XLSX from "xlsx/xlsx.mjs";
import { getAllProjects, getProjects } from "@/features/project/projectSlice";
import { getEntreprises, IEntreprise } from "@/features/entreprise/entrepriseSlice";
import dayjs from "dayjs";
import { getEmployees } from "@/features/users/userSlice";
const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
type PickerType = "date" | "week" | "month" | "quarter" | "year";
const dateFormat = "YYYY-MM-DD";
const Timesheet: React.FC = () => {
  const dispatch = useDispatch();
  const [typeDate, setTypeDate] = useState<PickerType>("date");
  const [date, setDate] = useState<string[]>(["2023-01-15","2023-01-23"]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [entreprise, setEntreprise] = useState<number>(null);
  const [employee, setEmployee] = useState<number>(null);
  const [project, setProject] = useState<number>(null);
  const [entreprises, setEntreprises] = useState<IEntreprise[]>([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [data, setData] = useState<ISheet[]>([])
  //select search and sort
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const filterSort = (optionA, optionB) =>
    (optionA?.label ?? "")
      .toLowerCase()
      .localeCompare((optionB?.label ?? "").toLowerCase());
  const columns: ProColumns<ISheet>[] = [
    {
      title: "Date",
      key: "direction",
      hideInTable: true,
      dataIndex: "direction",
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => (
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
              onChange={(e, dateString) => {
                setDate(dateString);
              }}
              format={dateFormat}
            />
          ) : typeDate === "week" ? (
            <DatePicker
              picker={typeDate}
              format={customWeekStartEndFormat}
              onChange={(e, dateString) => {
                setDate([
                  dateString.substring(0, 10),
                  dateString.substring(13, 23), 
                ]);
              }}
            />
          ) : (
            <DatePicker
              picker={typeDate}
              format={customMonthStartEndFormat}
              onChange={(e, dateString) => {
                setDate([
                  dateString.substring(0, 10),
                  dateString.substring(13, 23), 
                ]);
              }}
            />
          )}
        </Space>
      ),
    },
    {
      title: "Entreprise ",
      dataIndex: "entreprise",
      key: "entreprise",
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        return (
          <Select
            showSearch
            allowClear
            placeholder="Choisir un entreprise"
            filterOption={filterOption}
            filterSort={filterSort}
            onSelect={(e) => {
              setEntreprise(e);
            }}
            onClear={() => {
              setEntreprise(null);
            }}
          >
            {entreprises
              // ?.filter((item) =>
              //   project
              //     ? item.id ===
              //       projects.filter(
              //         (x) => x.departement.entreprise_id === project
              //       )[0]?.departement.entreprise_id
              //     : true
              // )
              .map((item) => (
                <Option key={item.id} value={item.id} label={item.designation}>
                  {item.designation}
                </Option>
              ))}
          </Select>
        );
      },
    },
    {
      title: "Projet",
      key: "projet",
      hideInTable: true,
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        return (
          <Select
            showSearch
            placeholder="Choisir un projet"
            filterOption={filterOption}
            filterSort={filterSort}
            allowClear
            onSelect={(e) => {
              setProject(e);
            }}
            onClear={() => {
              setProject(null);
            }}
          >
            {projects
              // ?.filter((item) =>
              //   entreprise
              //     ? item.departement.entreprise_id === entreprise
              //     : true
              // )
              .map((item) => (
                <Option key={item.id} value={item.id} label={item.designation}>
                  {item.designation}
                </Option>
              ))}
          </Select>
        );
      },
    },
    {
      title: "Employe ",
      dataIndex: "employe",
      key: "employe",
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        return (
          <Select
            showSearch
            allowClear
            placeholder="Choisir un employer"
            filterOption={filterOption}
            filterSort={filterSort}
            onSelect={(e) => {
              setEmployee(e);
            }}
            onClear={() => {
              setEmployee(null);
            }}
          >
            {employees
              ?.filter((item) => true)
              .map((item) => (
                <Option key={item.id} value={item.id} label={item.user.name}>
                  {item.user.name}
                </Option>
              ))}
          </Select>
        );
      },
    },
    {
      title: "Nombre d'heures",
      key: 2,
      search: false,
      render: (_, data) => {
        let sum = 0;
        data.details?.map((item) => {
          sum += item.nbrHeures;
        });
        return <>{sum}h</>;
      },
    },
    {
      title: "Action",
      valueType: "option",
      key: "option",
      render: (_, data) => (
        <Space size="small">
          <a
            onClick={() => {
              if (expandedRowKeys.indexOf(data.key) === -1) {
                setExpandedRowKeys([...expandedRowKeys, data.key]);
              } else {
                setExpandedRowKeys(
                  expandedRowKeys.filter((item) => item !== data.key)
                );
              }
            }}
          >
            Détails
          </a>
        </Space>
      ),
    },
  ];
  const weekFormat = "DD/MM/YY";
  const customWeekStartEndFormat: DatePickerProps["format"] = (value) =>
    `${dayjs(value).startOf("week").format(dateFormat)} ~ ${dayjs(value)
      .endOf("week")
      .format(dateFormat)}`;
  const customMonthStartEndFormat: DatePickerProps["format"] = (value) =>
    `${dayjs(value).startOf("month").format(dateFormat)} ~ ${dayjs(value)
      .endOf("month")
      .format(dateFormat)}`;
  //export Excel
  const handleOnExport = () => {
    let sheets = data;
    sheets.map((item, index) => {
      let sum = 0;
      item.details?.map((x) => {
        sum += x.nbrHeures;
      });
      Object.assign(item, {
        nbrHeures: sum,
      });
      delete item.key;
      delete item.details;
    });
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(sheets);
    ws["!cols"] = [{ wpx: 120 }, { wpx: 180 }, { wpx: 60 }];

    XLSX.utils.book_append_sheet(wb, ws, "TimeSheet");
    XLSX.writeFile(wb, "TimeSheet.xlsx");
  };
  const handleOnExportPerEmploye = () => {
    let sheets = data;
    var wb = XLSX.utils.book_new(),
      ws = [];
    sheets.map((item, index) => {
      item.details?.map((x) => {
        delete x.id;
      });
      ws[index] = XLSX.utils.json_to_sheet(item.details);
      ws[index]["!cols"] = [{ wpx: 120 }, { wpx: 200 }, { wpx: 80 }];
      XLSX.utils.book_append_sheet(wb, ws[index], item.employe);
    });
    XLSX.writeFile(wb, "TimeSheet.xlsx");
  };

  const handleGetTimesheets = (): Promise<ISheet[]> =>
    dispatch(getTimesheets({
      project: project,
      entreprise:entreprise,
      employee: employee,
      date: date!==null?date:
      [dayjs().startOf("month").format(dateFormat),dayjs()
        .endOf("month")
        .format(dateFormat)],
    }))
    .unwrap()
    .then((originalPromiseResult) => {
      return originalPromiseResult.filter(item=>item).map((item, index) =>
      Object.assign({}, item, {
        key: Math.random().toString(),
      })
    );
    })
    .catch((rejectedValueOrSerializedError) => {
      console.log(rejectedValueOrSerializedError);
      return[]
    });
  
  useEffect(() => {
    dispatch(getAllProjects())
      .unwrap()
      .then((originalPromiseResult) => {
        setProjects(originalPromiseResult);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
    dispatch(getEntreprises())
      .unwrap()
      .then((originalPromiseResult) => {
        setEntreprises(originalPromiseResult.data);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
      dispatch(getEmployees())
      .unwrap()
      .then((originalPromiseResult) => {
        setEmployees(originalPromiseResult.data);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  }, []);
  return (
    <div className="Timesheet">
      <Breadcrumb separator=">" className="mt-5">
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Timesheet</Breadcrumb.Item>
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="mt-5" gutter={[12, 24]}>
        <Col xs={24}>
          <Card title={<Title level={4}>Timesheet</Title>} bordered={false}>
            <ProTable<ISheet>
              headerTitle="Liste de timesheets"
              columns={columns}
              onReset={() => {
                setProject(null);
                setEntreprise(null);
                setEmployee(null);
                setDate(["2023-01-15","2023-01-23"]);
              }}
              request={async (params) => {
                console.log(`request params:`, params);
                var dataFilter = await handleGetTimesheets();
                setData(dataFilter)
                return {
                  data: dataFilter,
                  success: true,
                };
              }}
              search={{
                labelWidth: "auto",
                // collapseRender:(collapsed)=><>{collapsed?<>Agrandir</>:<>Reduire</>}</>
              }}
              pagination={{
                size: "small",
                pageSize: 7,
              }}
              expandable={{
                expandedRowRender: (record) =>{
                  return(
                  <div className="flex justify-center">
                    <div style={{ width: "95%" }}>
                      <TimesheetDetails detail={record} filtred={project!==null}/>
                    </div>
                  </div>
                )},
                rowExpandable: (record) => record.entreprise.length !== 0,
                showExpandColumn: false,
                expandedRowKeys: expandedRowKeys,
              }}
              toolBarRender={() => [
                <Button type="primary" onClick={handleOnExport}>
                  Exporter
                </Button>,
                <Button type="primary" onClick={handleOnExportPerEmploye}>
                  Exporter par employe
                </Button>,
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Timesheet;
