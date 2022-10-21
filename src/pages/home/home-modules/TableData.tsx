import React, { useState } from "react";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import {
  Table,
  Layout,
  Menu,
  MenuProps,
  Space,
  Avatar,
  AutoComplete,
  Input,
  Dropdown,
  Button,
  Badge,
  Card,
  Row,
  Col,
  Grid,
  Tag,
  Typography,
  Breadcrumb,
  Statistic,
  Progress,
  BackTop,
  Steps,
  Divider,
  Checkbox,
} from "antd";

function TableData() {
  //table
  interface DataType {
    key: string;
    country: string;
    site: string;
    space: string;
    position: string;
    indice: string;
    date: string;
    level: string;
  }

  const columns = [
    {
      title: "Country",
      dataIndex: "country",
      key: "country",

      sorter: (a, b) => a.country.length - b.country.length,
    },
    {
      title: "Sites",
      dataIndex: "site",
      key: "site",
      sorter: (a, b) => a.site.length - b.site.length,
    },
    {
      title: "Spaces",
      dataIndex: "space",
      key: "space",
      sorter: (a, b) => a.space.length - b.space.length,
      render: (text) => <a href={text}>{text}</a>,
    },

    {
      title: "Positions",
      key: "position",
      dataIndex: "position",
      sorter: (a, b) => a.position.length - b.position.length,
      render: (v) => (
        <span
          className={`  text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ${
            v < 50
              ? "bg-green-400 text-white "
              : v == 50
              ? "bg-amber-400 text-gray-900"
              : "bg-gray-400 text-white"
          }`}
        >
          {v}
        </span>
      ),
    },

    {
      title: "Indices",
      dataIndex: "indice",
      key: "indice",
      sorter: (a, b) => a.indice.length - b.indice.length,
    },
    {
      title: "Last Event",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: "Alert level",
      key: "level",
      dataIndex: "level",
      sorter: (a, b) => a.level.length - b.level.length,
      render: (v) => (
        <span
          className={`  text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ${
            v === "critical"
              ? "bg-red-400 text-white "
              : v === "medium"
              ? "bg-amber-400 text-gray-900"
              : "bg-green-400 text-white"
          }`}
        >
          {v}
        </span>
      ),
    },
  ];
  /* .filter((i) => i.hidden !== true) */
  const [columnsTable, setColumnsTable] = useState(columns);

  const dataTable: DataType[] = [
    {
      key: "1",
      country: "UAE",
      site: "AL AIN",
      space: "AIN",
      position: "A",
      indice: " temperature",
      date: "2022-11-01",
      level: "critical",
    },
    {
      key: "2",
      country: "TUNISIA",
      site: "TUNIS",
      space: "NABEUL",
      position: "C",
      indice: "proximity",
      date: "2022-11-08",
      level: "low",
    },
    {
      key: "3",
      country: "UAE",
      site: "ABU DHABI",
      space: "ABU DHABI",
      position: "D",
      indice: "temperature",
      date: "2022-11-09",
      level: "medium",
    },
  ];
  //end table

  //drop down

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              1st menu item
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.aliyun.com"
            >
              2nd menu item
            </a>
          ),
        },
        {
          key: "3",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.luohanacademy.com"
            >
              3rd menu item
            </a>
          ),
        },
      ]}
    />
  );

  const onChange = (checkedValues: CheckboxValueType[]) => {
    //  console.log("checked = ", checkedValues);

    const newColumnTable = columns.filter(
      (v) => !checkedValues.includes(v.dataIndex)
    );
    setColumnsTable(newColumnTable);
  };
  const [openSelectColumn, setOpenSelectColumn] = useState(false);
  return (
    <div className="bg-white drop-shadow">
      <div className="bg-white h-10">
        <div className="relative   mb-10   inline-block">
          <Button
            className="mb-10 
           text-gray-500 bg-white-400  w-32 flex flex-col
            absolute top-1 left-1 hover:text-blue-500  "
            onClick={() => setOpenSelectColumn(true)}
          >
            Select columns
          </Button>
          <div
            className={` ${
              openSelectColumn ? "" : "hidden"
            } drop-shadow p-3 bg-white w-32 flex flex-col  z-10  absolute bottom-0 left-1   `}
          >
            <Button
              onClick={() => setOpenSelectColumn(false)}
              className="text-gray-800 w-2 h-5 flex justify-center items-center self-end text-xs"
            >
              X
            </Button>
            <Checkbox.Group
              style={{ width: "10%" }}
              onChange={onChange}
              className="bg-blue-white"
            >
              <Row>
                {columns.map((item, i) => (
                  <Col key={i} span={24}>
                    <Checkbox value={item.dataIndex}>{item.dataIndex}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </div>
        </div>
      </div>

      <Table columns={columnsTable} dataSource={dataTable} />
    </div>
  );
}

export default TableData;
