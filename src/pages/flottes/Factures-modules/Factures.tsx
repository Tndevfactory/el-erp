import { ProList } from "@ant-design/pro-components";
import { Badge, Button, Space, DatePicker } from "antd";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
const { RangePicker } = DatePicker;
const dataSource = [
  {
    name: "Facture N°1541",
    desc: "xxxxxx",
    status: "impayée",
    date: "13/12/2022",
  },
  {
    name: "Facture N°1542",
    desc: "xxxxxx",
    status: "payée",
    date: "14/11/2022",
  },
  {
    name: "Facture N°1543",
    desc: "xxxxxx",
    status: "payée",
    date: "15/10/2022",
  },
  {
    name: "Facture N°1544",
    desc: "xxxxxx",
    status: "payée",
    date: "14/09/2022",
  },
  {
    name: "Facture N°1545",
    desc: "xxxxxx",
    status: "payée",
    date: "15/08/2022",
  },
];

const renderBadge = (count: number, active = false) => {
  return (
    <Badge
      count={count}
      style={{
        marginBlockStart: -2,
        marginInlineStart: 4,
        color: active ? "#1890FF" : "#999",
        backgroundColor: active ? "#E6F7FF" : "#eee",
      }}
    />
  );
};

const Factures : React.FC = ()=>{
  const [activeKey, setActiveKey] = useState<React.Key | undefined>("tab1");
  var { windowWidth } = useSelector((store: any) => store.ui);
  const [data,setData]= useState(dataSource)
  return (
    <ProList<any>
      rowKey="name"
      dataSource={data}
      metas={{
        title: {
          dataIndex: "name",
        },
        description: {
          dataIndex: "desc",
        },
        content: {
          render: (_, facture) => (
            windowWidth>620&&
            <Space size="large">
              <div style={{width:"80px"}}>
                <div style={{ color: "#00000073" }}>Status</div>
                <Badge  color={facture.status === "impayée"?"red":"#52c41a"} text={facture.status} />
              </div>
              <div>
                <div style={{ color: "#00000073" }}>Date</div>
                <div style={{ color: "#000000D9" }}>{facture.date}</div>
              </div>
            </Space>
          ),
        },
        actions: {
          render: (text, row) => [
            <a
              href={row.html_url}
              target="_blank"
              rel="noopener noreferrer"
              key="link"
            >
              Détail
            </a>,
          ],
        },
      }}
      pagination={{
        pageSize: 3,
        size: "small",
      }}
      // showActions="hover"
      toolbar={{
        menu: {
          activeKey,
          items: [
            {
              key: "tab1",
              label: (
                <span onClick={()=>{setData(dataSource)}}>
                  Toutes les factures{renderBadge(5, activeKey === "tab1")}
                </span>
              ),
            },
            {
              key: "tab2",
              label: (
                <span onClick={()=>{setData(dataSource.filter(item => item.status==='impayée'))}}>
                  Les factures impayées{renderBadge(1, activeKey === "tab2")}
                </span>
              ),
            },
          ],
          onChange(key) {
            setActiveKey(key);
          },
        },
        actions: [
          <Space>
            <DatePicker
              picker="month"
              onChange={(e, dateString) => {
                console.log(e);
              }}
            />
            <Button icon={<SearchOutlined />} type="primary" />
          </Space>,
        ],
      }}
    />
  );
};

export default Factures;