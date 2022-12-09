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
import { ProTable, TableDropdown, ProColumns } from '@ant-design/pro-components';
import { SearchOutlined } from "@ant-design/icons";
import type { DatePickerProps } from "antd";
import moment from "moment";
import TimesheetDetails from "./details/TimesheetDetails";
import { useDispatch, useSelector } from "react-redux";
import { ISheet } from "@/features/timesheet/timesheetSlice";
import * as XLSX from "xlsx/xlsx.mjs";
const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
type PickerType = "date" | "week" | "month" | "quarter" | "year";
const dateFormat = "DD/MM/YYYY";
const Timesheet:React.FC=()=> {
  var { sheets } = useSelector((store: any) => store.timesheet);
  // console.log(sheets)
  const [search, setSearch] = useState("");
  const [typeDate, setTypeDate] = useState<PickerType>("date");
  const [date, setDate] = useState<string[]>();
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const columns: ProColumns<ISheet>[] = [
    {
      title : 'Date' , 
      key : 'direction' , 
      hideInTable : true , 
      dataIndex : 'direction' , 
      renderFormItem : ( item , { type , defaultRender , ... rest } , form ) => (         
      <Space direction="horizontal">
      <Select value={typeDate} onChange={setTypeDate}>
        <Option value="date">Intervalle</Option>
        <Option value="week">Semaine</Option>
        <Option value="month">Mois</Option>
        {/* <Option value="quarter">Quarter</Option>
        <Option value="year">Year</Option> */}
      </Select>
      {typeDate === "date" ? (
        <RangePicker onChange={(e, dateString)=>{setDate(dateString)}} format={dateFormat}/>
      ) : 
      typeDate === "week" ? (
        <DatePicker
          picker={typeDate}
          format={customWeekStartEndFormat}
          onChange={(e, dateString)=>{console.log(e)}}
        />
      ) : (
        <DatePicker picker={typeDate} format={dateFormat} onChange={(e,dateString)=>{console.log(dateString)}} />
      )}
    </Space>) ,
    } ,
    {
      title: "Entreprise ",
      dataIndex: "entreprise",
      key: "entreprise",
      // filters: [
      //   {
      //     text: "TAC-TIC",
      //     value: "TAC-TIC",
      //   },
      //   {
      //     text: "Smart Skills",
      //     value: "Smart Skills",
      //   },
      // ],
      // onFilter: (value, record) => record.entreprise === value,

      valueType : 'select' , 
      valueEnum : {   
        0:"TAC-TIC",
        1: "Smart Skills",
      } ,
    },
    {
      title: "Employe ",
      dataIndex: "employe",
      key: "employe",
    },
    {
      title: "Nombre d'heures",
      key: 2,
      search:false,
      render: (_,data) => {
        let sum = 0;
        data.detail.map((item) => {
          sum += item.nbrHeures;
        });
        return <>{sum}h</>;
      },
    },
    {
      title: "Action",
      valueType: 'option',
      key: "option",
      render: (_,data) => (
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
    `${moment().startOf("week").format(weekFormat)} ~ ${moment()
      .endOf("week")
      .format(weekFormat)}`;
  //export Excel
  const handleOnExport = () => {
    let data = sheets;
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
    let data = sheets;
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
                <Title level={4}>Timesheet</Title>
            }
            bordered={false}
          >
            <ProTable<ISheet>
              headerTitle="Liste de timesheets"
              columns={columns}
              request={async (params) => {
                console.log(`request params:`, params);
                var dataFilter=sheets
                if(params.employe) dataFilter=dataFilter.filter((item)=>item.employe.toString().toUpperCase().search(params.employe.toString().toUpperCase())===-1?false:true);
                // if(params.telephone) dataFilter=dataFilter.filter((item)=>item.telephone.toString().toUpperCase().search(params.telephone.toString().toUpperCase())===-1?false:true);
                // if(params.designation) dataFilter=dataFilter.filter((item)=>item.designation.toString().toUpperCase().search(params.designation.toString().toUpperCase())===-1?false:true);
                return {
                  data: dataFilter,
                  success: true,
                };
              }}
              search={{
                labelWidth: "auto",
              }}
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
              toolBarRender={() => [
                <Button type="primary" onClick={handleOnExport}>
                  Exporter
                </Button>,
                <Button type="primary" onClick={handleOnExportPerEmploye}>
                  Exporter par employe
                </Button>
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Timesheet;
