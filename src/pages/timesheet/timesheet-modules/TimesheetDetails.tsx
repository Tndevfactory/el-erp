import React, { useState } from "react";
import { Button, Table, Card, Typography } from "antd";
import * as XLSX from "xlsx/xlsx.mjs";
const { Title } = Typography;
const sheet = [
  {
    id: 0,
    projet: "MSA",
    tache: "Authentification",
    nbrHeures: "8h",
  },
  {
    id: 1,
    projet: "MSA",
    tache: "Gestion de fichiers",
    nbrHeures: "8h",
  },
  {
    id: 2,
    projet: "ERP",
    tache: "Gestion de cautions",
    nbrHeures: "8h",
  },
];
function TimesheetDetails({ detail }) {
  const [data, setData] = useState(sheet);
  const columns = [
    {
      title: "Projet",
      dataIndex: "projet",
      key: 0,
    },
    {
      title: "Tâche",
      dataIndex: "tache",
      key: 1,
    },
    {
      title: "Nombre d'heures",
      dataIndex: "nbrHeures",
      key: 2,
    },
  ];
  const handleOnExport = () => {
    let data = sheet;
    data.map((item, index) => {
      delete item.id;
    });
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(data);
    ws["!cols"] = [{ wpx: 150 }, { wpx: 180 }, { wpx: 80 }];
    XLSX.utils.book_append_sheet(wb, ws, detail.employe);
    XLSX.writeFile(wb, "sheet" + detail.employe.replace(/ /g, "") + ".xlsx");
  };
  return (
    <Card
      title={<Title level={5}>{detail.employe}</Title>}
      bordered={false}
      extra={
        <Button type="primary" onClick={handleOnExport}>
          Exporter détail excel
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={
          sheet.length <= 6
            ? false
            : {
                size: "small",
                pageSize: 6,
              }
        }
      />
    </Card>
  );
}

export default TimesheetDetails;
