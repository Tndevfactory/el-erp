import React, { useState } from "react";
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

import { SearchOutlined } from "@ant-design/icons";
import type { DatePickerProps } from "antd";
import moment from "moment";
import TimesheetDetails from "./details/TimesheetDetails";
import * as XLSX from "xlsx/xlsx.mjs";
const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const sheet = [
  {
    key: 0,
    entreprise: "TAC-TIC",
    employe: "Bassem Soua",
    detail: [
      {
        id: 0,
        projet: "GIP",
        tache: "Authentification",
        typeTache: "développement",
        nbrHeures: 8,
        date:"29/10/2022"
      },
      {
        id: 1,
        projet: "MSA",
        tache: "Gestion de fichiers",
        typeTache: "Conception",
        nbrHeures: 8,
        date:"31/10/2022"
      },
      {
        id: 2,
        projet: "ERP",
        tache: "Gestion de cautions",
        typeTache: "Conception",
        nbrHeures: 3,
        date:"01/11/2022"
      },
      {
        id: 2,
        projet: "EW",
        tache: "Gestion des espace",
        typeTache: "Conception",
        nbrHeures: 5,
        date:"01/11/2022"
      },
    ],
  },
  {
    key: 1,
    entreprise: "TAC-TIC",
    employe: "Wael Machlouch",
    detail: [
      {
        id: 0,
        projet: "MSA",
        typeTache: "développement",
        tache: "Authentification",
        nbrHeures: 8,
        date:"01/11/2022"
      },
      {
        id: 1,
        projet: "EW",
        tache: "Gestion de sites",
        typeTache: "développement",
        nbrHeures: 6,
        date:"30/10/2022"
      },
      {
        id: 5,
        projet: "ERP",
        tache: "gestion de projet",
        typeTache: "développement",
        nbrHeures: 4,
        date:"02/11/2022"
      },

      {
        id: 7,
        projet: "CIOK",
        tache: "réunion",
        typeTache: "réunion",
        nbrHeures: 2,
        date:"29/10/2022"
      },
      {
        id: 3,
        projet: "ERP",
        tache: "TimeSheet",
        typeTache: "développement",
        nbrHeures: 6,
        date:"29/10/2022"
      },
      {
        id: 4,
        projet: "EW",
        tache: "Maps",
        typeTache: "développement",
        nbrHeures: 6,
        date:"02/11/2022"
      },
      // {
      //   id: 8,
      //   projet: "EW",
      //   tache: "Maps",
      //   typeTache: "développement",
      //   nbrHeures: 6,
      //   date:"30/11/2022"
      // },
      {
        id: 10,
        projet: "CIOK",
        tache: "Maps",
        typeTache: "développement",
        nbrHeures: 4,
        date:"30/12/2022"
      },
      {
        id: 2,
        projet: "ERP",
        tache: "Gestion de cautions",
        typeTache: "développement",
        nbrHeures: 2,
        date:"30/10/2022"
      },
    ],
  },
  {
    key: 2,
    entreprise: "TAC-TIC",
    employe: "Amira Riahi",
    detail: [
      {
        id: 0,
        projet: "EW",
        tache: "Authentification",
        typeTache: "test",
        nbrHeures: 8,
        date:"30/10/2022"
      },
    ],
  },
  {
    key: 3,
    employe: "Asma Manaii",
    entreprise: "Smart Skills",
    detail: [
      {
        id: 0,
        projet: "MSA",
        tache: "Cautions",
        typeTache: "other",
        nbrHeures: 8,
        date:"01/11/2022"
      },
    ],
  },
];
type PickerType = "date" | "week" | "month" | "quarter" | "year";
function Timesheet() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(sheet);
  const [type, setType] = useState<PickerType>("week");
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const tableSearch = () => (
    <div style={{ display: "flex" }}>
      <Input
        onChange={(e) => {
          setSearch(e.target.value);
          let x = sheet;
          setData(
            x.filter((data) =>
              data.employe
                .toUpperCase()
                .search(e.target.value.toUpperCase()) === -1
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
          let x = sheet;
          setData(
            x.filter((data) =>
              data.employe.toUpperCase().search(search.toUpperCase()) === -1
                ? false
                : true
            )
          );
        }}
      />
    </div>
  );
  const columns = [
    {
      title: "Entreprise ",
      dataIndex: "entreprise",
      key: 0,
      filters: [
        {
          text: "TAC-TIC",
          value: "TAC-TIC",
        },
        {
          text: "Smart Skills",
          value: "Smart Skills",
        },
      ],
      onFilter: (value, record) => record.entreprise === value,
    },
    {
      title: "Employe ",
      dataIndex: "employe",
      key: 1,
      filterDropdown: tableSearch(),
    },
    {
      title: "Nombre d'heures",
      key: 2,
      render: (data) => {
        let sum = 0;
        data.detail.map((item) => {
          sum += item.nbrHeures;
        });
        return <>{sum}h</>;
      },
    },
    {
      title: "Action",
      key: "10",
      render: (data) => (
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
    `${moment(value).startOf("week").format(weekFormat)} ~ ${moment(value)
      .endOf("week")
      .format(weekFormat)}`;
  //export Excel
  const handleOnExport = () => {
    let data = sheet;
    data.map((item, index) => {
      delete item.key;
      delete item.detail;
    });
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(data);
    ws["!cols"] = [{ wpx: 120 }, { wpx: 180 }, { wpx: 80 }];

    XLSX.utils.book_append_sheet(wb, ws, "TimeSheet");
    XLSX.writeFile(wb, "TimeSheet.xlsx");
  };
  const handleOnExportPerEmploye = () => {
    let data = sheet;
    var wb = XLSX.utils.book_new(),
      ws = [];
    data.map((item, index) => {
      item.detail.map((x) => {
        delete x.id;
      });
      ws[index] = XLSX.utils.json_to_sheet(item.detail);
      ws[index]["!cols"] = [{ wpx: 120 }, { wpx: 200 }, { wpx: 80 }];
      XLSX.utils.book_append_sheet(wb, ws[index], item.employe);
    });
    XLSX.writeFile(wb, "TimeSheet.xlsx");
  };

  return (
    <div className="Timesheet">
      <Breadcrumb separator=">" className="mt-5">
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Timesheet</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="mt-5" gutter={[12, 24]}>
        <Col xs={24}>
          <Card
            title={
              <Space size={50}>
                <Title level={4}>Timesheet</Title>
                <Space size="large">
                  <Space >
                    <Title level={5} type="secondary">
                      {" "}
                      Entreprise :
                    </Title>
                    <Select
                      placeholder="Entreprise"
                      showSearch
                      filterOption={(input, option) =>
                        (option!.children as unknown as string)
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      onSelect={(e) => {
                        let x = sheet;
                        setData(
                          x.filter((data) =>
                            e === "Toutes" ? true : data.entreprise === e
                          )
                        );
                      }}
                    >
                      {[
                        { entreprise: "Toutes" },
                        { entreprise: "TAC-TIC" },
                        { entreprise: "Smart Skills" },
                      ]?.map((entreprise) => (
                        <Option
                          key={entreprise.entreprise}
                          value={entreprise.entreprise}
                        >
                          {entreprise.entreprise}
                        </Option>
                      ))}
                    </Select>
                  </Space>
                  <Space>
                    <Title level={5} type="secondary">
                      {" "}
                      Projet :
                    </Title>
                    <Select
                      placeholder="Projet"
                      showSearch
                      filterOption={(input, option) =>
                        (option!.children as unknown as string)
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      onSelect={(e) => {
                        if(e==="Toutes"){
                          setData(sheet)
                        }else{
                          var x = sheet;
                          x.map((item)=>{
                            item.detail=item.detail.filter((subItem)=>subItem.projet===e)
                          })
                          setData(
                            x.filter((data) =>
                              data.detail.length!==0?true:false
                            )
                          );
                        }
                      }}
                    >
                      {[
                        { projet: "Toutes" },
                        { projet: "MSA" },
                        { projet: "ERP" },
                        { projet: "EW" },
                        { projet: "GIP" },
                      ]?.map((item) => (
                        <Option key={item.projet} value={item.projet}>
                          {item.projet}
                        </Option>
                      ))}
                    </Select>
                  </Space>
                  <Space>
                    <Title level={5} type="secondary">
                      Date :
                    </Title>
                    <Select value={type} onChange={setType}>
                      <Option value="date">Date</Option>
                      <Option value="week">Week</Option>
                      <Option value="month">Month</Option>
                      <Option value="quarter">Quarter</Option>
                      <Option value="year">Year</Option>
                    </Select>
                    {type === "date" ? (
                      <RangePicker />
                    ) : type === "week" ? (
                      <DatePicker
                        picker={type}
                        format={customWeekStartEndFormat}
                        onChange={() => {}}
                      />
                    ) : (
                      <DatePicker picker={type} onChange={() => {}} />
                    )}
                  </Space>
                </Space>
              </Space> 
            }
            bordered={false}
            extra={
              <Space style={{marginLeft:'10px'}}>
                <Button type="primary" onClick={handleOnExport}>
                  Exporter
                </Button>
                <Button type="primary" onClick={handleOnExportPerEmploye}>
                  Exporter par employe
                </Button>
              </Space>
            }
          >
            <Table
              // bordered
              columns={columns}
              dataSource={data}
              // size="middle"
              pagination={{
                size: "small",
                pageSize: 7,
              }}
              expandable={{
                expandedRowRender: (record) => (
                  <div className="flex justify-center">
                    <div style={{ width: "80%" }}>
                      <TimesheetDetails detail={record} />
                    </div>
                  </div>
                ),
                rowExpandable: (record) => record.entreprise.length !== 0,
                showExpandColumn: false,
                expandedRowKeys: expandedRowKeys,
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Timesheet;
