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
import TimesheetDetails from "./TimesheetDetails";
import * as XLSX from "xlsx/xlsx.mjs";
const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const sheet = [
  {
    key: 0,
    entreprise: "TAC-TIC",
    employe: "Bassem Soua",
    nbrHeures: "28h",
  },
  {
    key: 1,
    entreprise: "TAC-TIC",
    employe: "Wael Machlouch",
    nbrHeures: "30h",
  },
  {
    key: 2,
    entreprise: "TAC-TIC",
    employe: "Amira Riahi",
    nbrHeures: "24h",
  },
  {
    key: 3,
    employe: "Asma Manaii",
    entreprise: "Smart Skills",
    nbrHeures: "32h",
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
      dataIndex: "nbrHeures",
      key: 2,
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
              } 
              else {
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
  const handleOnExport = () => {
    let data=sheet
    data.map((item, index) =>{
    delete item.key}
  );
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(data)
    ws["!cols"] = [
      {wpx: 120 },
      {wpx: 180},
      {wpx: 80},
    ];
    XLSX.utils.book_append_sheet(wb, ws, "TimeSheet");
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
              <Space size={100}>
                <Title level={4}>Timesheet</Title>
                <Space size="large">
                  <Space>
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
                        setData(x.filter((data) => e==="Toutes"?true:data.entreprise === e));
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
              <Button type="primary" onClick={handleOnExport}>
                Exporter excel
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
              expandable={{
                expandedRowRender: (record) => (
                  <div
                    className="flex justify-center"
                  >
                    <div style={{ width: "80%" }}>
                      <TimesheetDetails detail={record}/>
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
