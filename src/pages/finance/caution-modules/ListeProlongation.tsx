import React, { useEffect, useState } from "react";
import { Divider, Table, Space, Tooltip, Tag } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import type { ColumnsType } from 'antd/es/table';
import { getProlongations, IProlongation } from "@/features/finance/caution/prolongationCaution";
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
    title: "Date d'échéance",
    key: 2,
    dataIndex: "DateE",
    render:()=><>12/02/2023</>
  },
  {
    title: "A faire avant",
    key: 2,
    dataIndex: "DateE",
    render:()=><>12/02/2023</>
  },
  {
    title: "Etat",
    key: 3,
    render: (record) => (
        <Tag
          color={
            record.etat_id === 2
              ? "green"
              : "gold"
          }
        >
          {record.prolongation_etat.etat}
        </Tag>
      ),
  },
  {
    title: "Action",
    key: "10",
    width: "15%",
    render: (prolongation) =>
      prolongation.etat_id === 1 && (
        <Space size="small">
          {/* <a style={{ color: "#52BE80" }}>Approuver</a>
          <a style={{ color: "#E74C3C" }}>Refuser</a> */}
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
const ListeProlongation:React.FC<{cautionId:number}>=({ cautionId })=> {
  const dispatch = useDispatch();
  const [prolongations, setProlongations] = useState<IProlongation[]>()
  const [isLoading, setLoading] = useState(false)
  useEffect(()=>{
    setLoading(true)
    dispatch(getProlongations())
    .unwrap()
    .then((originalPromiseResult) => {
      setProlongations(originalPromiseResult.data.filter(item=>item.caution_id===cautionId))
      setLoading(false)
    })
    .catch((rejectedValueOrSerializedError) => {
      // handle error here
    });
  },[])
  return (
    <div className="ProlongationListe">
      <Table
        // rowClassName={(record, index) =>
        //   record.etat === "En attente" ? "table-row-en-attente" : "nothing"
        // }
        columns={columns}
        dataSource={prolongations}
        pagination={false}
        loading={isLoading}
      />
    </div>
  );
}

export default ListeProlongation;
