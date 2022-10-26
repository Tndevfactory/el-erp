import React from "react";
import { Divider, Table, Space, Tooltip } from "antd";
import {
    CheckOutlined,
    CloseOutlined,
  } from "@ant-design/icons";
import moment from "moment";

const columns = [
  {
    title: "Référence",
    key: 0,
    dataIndex: "Référence",
  },
  {
    title: "Durée",
    key: 1,
    dataIndex: "Durée",
  },
  {
    title: "Nouvelle date d'échéance",
    key: 2,
    dataIndex: "DateE",
  },
  {
    title: "Action",
    key: "10",
    width: "15%",
    render: (prolongation) => (
     prolongation.Etat==="En attente"&&
      <Space size="small">
        <Tooltip title="Approuver">
        <CheckOutlined style={{color:"#52BE80"}} onClick={()=>{}}/>
        </Tooltip>
        <Tooltip title="Rejeter">
        <CloseOutlined style={{color:"#E74C3C"}} onClick={()=>{}}/>
        </Tooltip>
      </Space>
    ),
  },
];
function ListeProlongation({prolongation}) {
  return (
    <div className="ProlongationListe">
      <Table columns={columns} dataSource={prolongation} pagination={false} />
    </div>
  );
}

export default ListeProlongation;
