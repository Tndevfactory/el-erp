import React, { useEffect, useState } from "react";
import pdfImage from "@/assets/pdfImage.png";
import { Table, Space, Tooltip, Tag, Upload, UploadFile, Image } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import type { ColumnsType } from 'antd/es/table';
import { getProlongations, IProlongation } from "@/features/finance/caution/prolongationCaution";
const { Dragger } = Upload;
const ListeProlongation:React.FC<{cautionId:number}>=({ cautionId })=> {
  const dispatch = useDispatch();
  const [prolongations, setProlongations] = useState<IProlongation[]>()
  const [isLoading, setLoading] = useState(false)
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "0",
      name: "cahier_de_charges.pdf",
      status: "done",
    },
    {
      uid: "1",
      name: "avis_de_caution.pdf",
      status: "done",
    },
  ]);
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
      title: "Fichiers",
      key: 2,
      render:() => (
        <Space size="small">
        <Tooltip title={"fichier1"}>
        <Image src={pdfImage} width={25} preview={false} onClick={()=>{}}/>
        </Tooltip>
        <Tooltip title={"fichier2"}>
        <Image src={pdfImage} width={25} preview={false} onClick={()=>{}}/>
        </Tooltip>
      </Space>
      )
    },
    {
      title: "Etat",
      key: 3,
      render: (record) => (
          <Tag
            color={
              record.etat_id=== 3
              ? "blue"
              : record.etat_id === 1
              ? "gold"
              : record.etat_id === 2
              ? "red"
              : record.etat_id === 4
              ? "blue"
              : record.etat_id === 5
              ? "green"
              : record.etat_id === 6
              ? "green":""
            }
          >
            {record.prolongation_etat.etat}
          </Tag>
        ),
    },
    // {
    //   title: "Action",
    //   key: "10",
    //   width: "15%",
    //   render: (prolongation,data) =>
    //     prolongation.etat_id === 1 && (
    //       <Space size="small">
    //         <Tooltip title="Approuver">
    //           <CheckOutlined style={{ color: "#52BE80" }} onClick={() => {}} />
    //         </Tooltip>
    //         <Tooltip title="Refuser">
    //           <CloseOutlined style={{ color: 
    //             "#E74C3C" }} onClick={() => {}} />
    //         </Tooltip>
    //       </Space>
    //     ),
    // },
  ];
  useEffect(()=>{
    setLoading(true)
    dispatch(getProlongations())
    .unwrap()
    .then((originalPromiseResult) => {
      setProlongations(originalPromiseResult.data.filter(item=>item.caution_id===cautionId && item.etat_id===5))
      setLoading(false)
    })
    .catch((rejectedValueOrSerializedError) => {
      // handle error here
    });
  },[])
  return (
    <div className="ProlongationListe">
      <Table
        columns={columns}
        dataSource={prolongations}
        pagination={false}
        loading={isLoading}
      />
    </div>
  );
}

export default ListeProlongation;
