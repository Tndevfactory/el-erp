import React from "react";
import { Divider, Table, Space, Tooltip, Tag } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import moment from "moment";
import { IProlongation } from "@/features/finance/caution/cautionSlice";
import type { ColumnsType } from 'antd/es/table';
const columns : ColumnsType<IProlongation>= [
  {
    title: "Référence",
    key: 0,
    dataIndex: "reference",
    responsive:["sm"]
  },
  {
    title: "Durée",
    key: 1,
    dataIndex: "duree",
    responsive:["sm"]
  },
  {
    title: "Nouvelle date d'échéance",
    key: 2,
    dataIndex: "DateE",
  },
  {
    title: "Etat",
    key: 3,
    dataIndex: "etat",
    render: (Etat: string) => (
        <Tag
          color={
            Etat === "Approuver"
              ? "green"
              : "gold"
          }
        >
          {Etat}
        </Tag>
      ),
  },
  {
    title: "Action",
    key: "10",
    width: "15%",
    render: (prolongation) =>
      prolongation.Etat === "En attente" && (
        <Space size="small">
          <Tooltip title="Approuver">
            <CheckOutlined style={{ color: "#52BE80" }} onClick={() => {}} />
          </Tooltip>
          <Tooltip title="Rejeter">
            <CloseOutlined style={{ color: "#E74C3C" }} onClick={() => {}} />
          </Tooltip>
        </Space>
      ),
  },
];
const ListeProlongation:React.FC<{prolongation:IProlongation[]}>=({ prolongation })=> {
  return (
    <div className="ProlongationListe">
      <Table
        rowClassName={(record, index) =>
          record.etat === "En attente" ? "table-row-en-attente" : "nothing"
        }
        columns={columns}
        dataSource={prolongation}
        pagination={false}
      />
    </div>
  );
}

export default ListeProlongation;
