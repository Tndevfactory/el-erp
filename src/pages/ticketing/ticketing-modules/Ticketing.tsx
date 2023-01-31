import { Breadcrumb, Button, Card, Select, Space, Tag, Typography } from "antd";
import React, { useRef, useState } from "react";
import { ProTable, ProColumns } from "@ant-design/pro-components";
import AddTicket from "./AddTicket";
import ShowTicket from "./ShowTicket";
const { Title, Link } = Typography;
const { Option } = Select;
export const employees = [
  {
    key:0,
    designation:"Wael Machlouch"
  },
  {
    key:1,
    designation:"Nidhal chalbia"
  },
  {
    key:2,
    designation:"Mohamed Chawki"
  },
  {
    key:3,
    designation:"Emna Ahmadi"
  },
]
export const etats = [
  {
    key: 0,
    designation: "Ouvert",
  },
  {
    key: 1,
    designation: "Encours",
  },
  {
    key: 2,
    designation: "Résolut",
  },
  {
    key: 3,
    designation: "Cloturer",
  },
];
export const types = [
  {
    key: 0,
    designation: "R&D",
  },
  {
    key: 1,
    designation: "DAF",
  },
  {
    key: 2,
    designation: "RH",
  },
  {
    key: 3,
    designation: "Sécurité",
  },
  {
    key: 4,
    designation: "Logistique",
  },
];
export const priorites = [
  {
    key: 0,
    designation: "Faible",
  },
  {
    key: 1,
    designation: "Moyenne",
  },
  {
    key: 2,
    designation: "Urgent",
  },
  {
    key: 3,
    designation: "Très urgent",
  },
];
export const data = [
  {
    ref: "Ref1",
    titre: "Titre 2",
    description: "C'est une petite description...",
    responsable: "Bassem Soua",
    assigne_a: "Wael Machlouch",
    date: "12-01-2023",
    etat: 0,
    priorite: 1,
    type: 1,
  },
  {
    ref: "Ref2",
    titre: "Titre 2",
    description: "C'est une petite description...",
    responsable: "Bassem Soua",
    assigne_a: "Nidhal chalbia",
    date: "12-01-2023",
    etat: 1,
    priorite: 2,
    type: 0,
  },
  {
    ref: "Ref3",
    titre: "Titre 3",
    description: "C'est une petite description...",
    responsable: "Bassem Soua",
    assigne_a: "Wael Machlouch",
    date: "12-01-2023",
    etat: 2,
    priorite: 3,
    type: 3,
  },
  {
    ref: "Ref1",
    titre: "Titre 4",
    description: "C'est une petite description...",
    responsable: "Bassem Soua",
    assigne_a: "Wael Machlouch",
    date: "12-01-2023",
    etat: 3,
    priorite: 0,
    type: 2,
  },
];

const Ticketing = () => {
  const tableRef = useRef<any>();
  const [visible, setVisible] = useState(false);
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [ticket, setTicket] = useState({});
  const [tickets, setTickets] = useState(data);
  const [type, setType] = useState(null);
  const [assigne, setAssigne] = useState(null);
  //select search and sort
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const filterSort = (optionA, optionB) =>
    (optionA?.label ?? "")
      .toLowerCase()
      .localeCompare((optionB?.label ?? "").toLowerCase());
  const columns: ProColumns<any>[] = [
    // {
    //   title: "Référence ",
    //   key: "Référence",
    //   dataIndex: "ref",
    //   search: false,
    // },
    {
      title: "Titre ",
      key: "titre",
      dataIndex: "titre",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      search: false,
      responsive: ["xl"],
    },
    {
      title: "Responsable",
      key: "responsable",
      dataIndex: "responsable",
      search: false,
      responsive: ["md"],
    },
    {
      title: "Assigné à",
      key: "assigne_a",
      dataIndex: "assigne_a",
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        return (
          <Select
            placeholder="Choisir Type"
            showSearch
            filterOption={filterOption}
            filterSort={filterSort}
            onChange={(e) => {setAssigne(e)}}
          >
            {employees.map((item) => (
              <Option key={item.key} value={item.key} label={item.designation}>
                {item.designation}
              </Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: "Etat",
      key: "etat",
      dataIndex: "etat",
      search: false,
      render: (_, ticket) => (
        <Tag
          color={
            _ === 0
              ? ""
              : _ === 1
              ? "blue"
              : _ === 2
              ? "orange"
              : _ === 3
              ? "green"
              : ""
          }
        >
          {etats.filter((item) => item.key === _)[0].designation}
        </Tag>
      ),
      filters: [
        {
          text: "Ouvert",
          value: 0,
        },
        {
          text: "Encours",
          value: 1,
        },
        {
          text: "Résolut",
          value: 2,
        },
        {
          text: "Cloturer",
          value: 3,
        },
      ],
      onFilter: (value, record) => record.etat === value,
    },
    {
      title: "Priorité",
      key: "priorite",
      dataIndex: "priorite",
      search: false,
      render: (_, ticket) => (
        <Tag
          color={
            _ === 0
              ? "lime"
              : _ === 1
              ? "yellow"
              : _ === 2
              ? "orange"
              : _ === 3
              ? "red"
              : ""
          }
        >
          {priorites.filter((item) => item.key === _)[0].designation}
        </Tag>
      ),
      filters: [
        {
          text: "Faible",
          value: 0,
        },
        {
          text: "Moyenne",
          value: 1,
        },
        {
          text: "Urgent",
          value: 2,
        },
        {
          text: "Très urgent",
          value: 3,
        },
      ],
      onFilter: (value, record) => record.priorite === value,
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      render: (_, ticket) => (
        <>{types.filter((item) => item.key === _)[0].designation}</>
      ),
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        return (
          <Select
            placeholder="Choisir Type"
            showSearch
            filterOption={filterOption}
            filterSort={filterSort}
            onChange={(e) => {setType(e)}}
          >
            {types.map((item) => (
              <Option key={item.key} value={item.key} label={item.designation}>
                {item.designation}
              </Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      responsive: ["lg"],
      search: false,
    },
    {
      title: "Action",
      valueType: "option",
      key: "10",
      render: (_, ticket) => (
        <Space size="small">
          <Link
            onClick={() => {
              setTicket(ticket);
              setVisibleDetails(true);
            }}
          >
            Détails...
          </Link>
        </Space>
      ),
    },
  ];
  //   const handleGetTickets = (): Promise<any[]> => [{}];
  return (
    <div>
      <Breadcrumb separator=">" className="mt-5">
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Gestion des Tecketing</Breadcrumb.Item>
      </Breadcrumb>
      <Card
        className="mt-5"
        title={<Title level={4}>Gestion de ticketing</Title>}
        bordered={false}
      >
        <ProTable<any>
          actionRef={tableRef}
          headerTitle="Liste des Tickets"
          search={{
            labelWidth: "auto",
          }}
          cardBordered
          columnsState={{
            persistenceKey: "pro-table-singe-demos",
            persistenceType: "localStorage",
            // onChange(value) {
            //   console.log("value: ", value);
            // },
          }}
          columns={columns}
          onReset={() => { setType(null); setAssigne(null)}}
          request={async (params) => {
            console.log(`request params:`, params);
            // var dataFilter = await handleGetTickets();
            var dataFilter = tickets;
            if (params.titre)
              dataFilter = dataFilter.filter((item) =>
                item.titre
                  .toUpperCase()
                  .search(params.titre.toString().toUpperCase()) === -1
                  ? false
                  : true
              );
              if (assigne !== null)
              dataFilter = dataFilter.filter(
                    (item) =>
                      item.assigne_a===employees.filter(x => x.key===assigne)[0].designation
                  );
                  if (type !== null)
                  dataFilter = dataFilter.filter(
                        (item) =>
                          item.type===type
                      );
            return {
              data: dataFilter,
              success: true,
            };
          }}
          pagination={{
            size: "small",
            pageSize: 7,
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              onClick={() => {
                setVisible(true);
              }}
            >
              Ajouter un Ticket
            </Button>,
          ]}
        />
      </Card>
      <ShowTicket
        visible={visibleDetails}
        setVisible={setVisibleDetails}
        ticket={ticket}
      />
      <AddTicket
        visible={visible}
        setVisible={setVisible}
        tickets={tickets}
        setTickets={setTickets}
        tableRef={tableRef}
      />
    </div>
  );
};

export default Ticketing;
