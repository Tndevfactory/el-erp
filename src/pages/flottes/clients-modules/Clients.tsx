import React, { useEffect, useState } from "react";
import "../../../style/modules/Caution.less";
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
  Divider,
  Popconfirm
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import moment from "moment";
import CreateClient from "./CreateClient";
import ClientDetails from "./ClientDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  IClient
} from "@/features/flotte/client/flotteClientSlice";
import type { ColumnsType } from "antd/es/table";
// import UpdateClient from "./UpdateClient";
const { Paragraph, Title } = Typography;

function Clients() {
  const dispatch = useDispatch();
  var { clients } = useSelector((store: any) => store.flotteClient);

  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleDetails, setVisibleDetails] = useState(false);
  // const [visibleUpdate, setVisibleUpdate] = useState(false);
  let [search, setSearch] = useState("");
  const [client, setClient] = useState({});
  const [refresh, forceRefresh] = useState(0);
  const [modify, setModify] = useState(false)

  const columns: ColumnsType<IClient> = [
    {
      title: "Code client",
      dataIndex: "code_client",
      key: 0,
      render:(code)=>(<a>{code}</a>),
      filterDropdown: (
        <div style={{ display: "flex" }}>
          <Input
            onChange={(e) => {
              let x = clients;
              setSearch(e.target.value)
              setData(
                x.filter((data) =>
                  data.code_client.toString().search(
                    e.target.value
                  ) === -1
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
              let x = clients;
              setData(
                x.filter((data) =>
                  data.code_client.toString().search(
                    search
                  ) === -1
                    ? false
                    : true
                )
              );
            }}
          />
        </div>
      ),
    },
    {
      title: "Désignation",
      dataIndex: "designation",
      key: 1,
      filterDropdown: (
        <div style={{ display: "flex" }}>
          <Input
            onChange={(e) => {
              setSearch(e.target.value);
              let x = clients;
              setData(
                x.filter((data) =>
                  data.designation.toUpperCase().search(
                    e.target.value.toUpperCase()
                  ) === -1
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
              let x = clients;
              setData(
                x.filter((data) =>
                  data.designation.toUpperCase().search(search.toUpperCase()) ===
                  -1
                    ? false
                    : true
                )
              );
            }}
          />
        </div>
      ),
    },
    {
      title: "Numéro de téléphone",
      dataIndex: "telephone",
      render:(code)=>(<a>+216{code}</a>),
      key: 2,
      filterDropdown: (
        <div style={{ display: "flex" }}>
          <Input
            onChange={(e) => {
              let x = clients;
              setSearch(e.target.value)
              setData(
                x.filter((data) =>
                  data.telephone.toString().search(
                    e.target.value
                  ) === -1
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
              let x = clients;
              setData(
                x.filter((data) =>
                  data.telephone.toString().search(
                    search
                  ) === -1
                    ? false
                    : true
                )
              );
            }}
          />
        </div>
      ),
    },
    {
      title: "Code dossier",
      dataIndex: "code_dossier",
      render:(code)=>(<a>{code}</a>),
      key: 3,
      filterDropdown: (
        <div style={{ display: "flex" }}>
          <Input
            onChange={(e) => {
              let x = clients;
              setSearch(e.target.value)
              setData(
                x.filter((data) =>
                  data.code_dossier.toString().search(
                    e.target.value
                  ) === -1
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
              let x = clients;
              setData(
                x.filter((data) =>
                  data.code_dossier.toString().search(
                    search
                  ) === -1
                    ? false
                    : true
                )
              );
            }}
          />
        </div>
      ),
    },
  
    {
      title: "Action",
      key: "10",
      render: (client) => (
        <Space size="small">
          <a
            onClick={() => {
              setClient(client)
              setVisibleDetails(true);
            }}
          >
            <EyeOutlined/>
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setClient(client)
              setModify(true)

              setVisibleDetails(true);
            }}
          >
           <EditOutlined/>
          </a>
          <Divider type="vertical" />
          <a>

            <Popconfirm
                    title="voulez-vous vraiment supprimer ce client ?"
                    onConfirm={() => {
            
                    }}
                    okText="Oui"
                    cancelText="Non"
                  >
            <DeleteOutlined/>
                  </Popconfirm>
          </a>

        </Space>
      ),
    },
  ];
  const [openSelectMenu, setOpenSelectMenu] = useState(false);
  const [data, setData] = useState([]);
  const handleOpenChange = (flag: boolean) => {
    setOpenSelectMenu(flag);
  };
  const handleCloseCaution = (id) => {
    forceRefresh(Math.random());
  };
  const obj = {
    visible: visibleForm,
    setVisible: setVisibleForm,
    forceRefresh: forceRefresh,
  };
  const detailsObj = {
    visible: visibleDetails,
    setVisible: setVisibleDetails,
    client: client,
    modify:modify, 
    setModify:setModify,
    forceRefresh: forceRefresh,
  };
  // const updateObj = {
  //   visible: visibleUpdate,
  //   setVisible: setVisibleUpdate,
  //   client: client,
  //   forceRefresh: forceRefresh,
  // };
  useEffect(() => {
    setData(clients);
  }, [refresh]);

  return (
    <div className="Cautions">
      <Breadcrumb separator=">" className="mt-5">
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Gestion des clients</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="mt-5" gutter={[12, 24]}>
        <Col xs={24}>
          <Card
            title={<Title level={4}>Gestion des clients</Title>}
            bordered={false}
            extra={
              <Button
                type="primary"
                onClick={() => {
                  setVisibleForm(true);
                }}
              >
                Ajouter un client
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
            />
          </Card>
        </Col>
      </Row>
      <CreateClient {...obj}></CreateClient>
      <ClientDetails {...detailsObj}></ClientDetails>
      {/* <UpdateClient {...updateObj}/> */}
    </div>
  );
}

export default Clients;
