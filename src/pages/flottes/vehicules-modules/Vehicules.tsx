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
  Popconfirm,
  Tabs,
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { IVehicule } from "@/features/flotte/vehicule/flotteVehiculeSlice";
import type { ColumnsType } from "antd/es/table";
import AddVehicule from "./AddVehicule";
import DetailVehicule from "./DetailVehicule";
import moment from "moment";
const { Paragraph, Title } = Typography;

function Vehicules() {
  const dispatch = useDispatch();
  var { vehicules } = useSelector((store: any) => store.flotteVehicule);

  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  let [search, setSearch] = useState("");
  const [vehicule, setVehicule] = useState({});
  const [refresh, forceRefresh] = useState(0);
  const [modify, setModify] = useState(false)

  const columns: ColumnsType<IVehicule> = [
    {
      title: "Immatriculation",
      dataIndex: "immatriculation",
      key: 0,
      render: (code) => <a>{code}</a>,
      filterDropdown: (
        <div style={{ display: "flex" }}>
          <Input
            onChange={(e) => {
              let x = vehicules;
              setSearch(e.target.value);
              setData(
                x.filter((data) =>
                  data.immatriculation.toUpperCase().search(search.toUpperCase())  === -1
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
              let x = vehicules;
              setData(
                x.filter((data) =>
                  data.immatriculation.toUpperCase().search(search.toUpperCase())  === -1
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
      title: "Marque",
      dataIndex: "marque",
      key: 1,
      filterDropdown: (
        <div style={{ display: "flex" }}>
          <Input
            onChange={(e) => {
              setSearch(e.target.value);
              let x = vehicules;
              setData(
                x.filter((data) =>
                  data.marque
                    .toUpperCase()
                    .search(e.target.value.toUpperCase()) === -1
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
              let x = vehicules;
              setData(
                x.filter((data) =>
                  data.marque
                    .toUpperCase()
                    .search(search.toUpperCase()) === -1
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
      title: "Modèle",
      dataIndex: "modele",
      key: 3,
      filterDropdown: (
        <div style={{ display: "flex" }}>
          <Input
            onChange={(e) => {
              let x = vehicules;
              setSearch(e.target.value);
              setData(
                x.filter((data) =>
                  data.modele.toUpperCase().search(search.toUpperCase()) === -1
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
              let x = vehicules;
              setData(
                x.filter((data) =>
                  data.modele.toUpperCase().search(search.toUpperCase()) === -1 ? false : true
                )
              );
            }}
          />
        </div>
      ),
    },
    {
      title: "Puissance fiscale",
      dataIndex: "puissance_fiscale",
      render: (code) => <a>{code}</a>,
      key: 4,
      filterDropdown: (
        <div style={{ display: "flex" }}>
          <Input
            onChange={(e) => {
              let x = vehicules;
              setSearch(e.target.value);
              setData(
                x.filter((data) =>
                  data.puissance_fiscale.toString().search(e.target.value) === -1
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
              let x = vehicules;
              setData(
                x.filter((data) =>
                  data.puissance_fiscale.toString().search(search) === -1
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
      title: "Puissance cylindrée",
      dataIndex: "puissance_cylindrée",
      render: (code) => <a>{code}</a>,
      key: 5,
      filterDropdown: (
        <div style={{ display: "flex" }}>
          <Input
            onChange={(e) => {
              let x = vehicules;
              setSearch(e.target.value);
              setData(
                x.filter((data) =>
                  data.puissance_cylindrée.toString().search(e.target.value) === -1
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
              let x = vehicules;
              setData(
                x.filter((data) =>
                  data.puissance_cylindrée.toString().search(search) === -1
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
      title: "Echéance de taxe",
      dataIndex: "echeance_taxe",
      responsive: ["xl"],
      key: 6,
      sorter: (a, b) =>
        moment(a.echeance_taxe, "DDMMYYYY").valueOf() -
        moment(b.echeance_taxe, "DDMMYYYY").valueOf(),
    },
    {
      title: "Echéance de l'assurance",
      dataIndex: "echeance_assurance",
      key: 7,
      responsive: ["xl"],
      sorter: (a, b) =>
        moment(a.echeance_assurance, "DDMMYYYY").valueOf() -
        moment(b.echeance_assurance, "DDMMYYYY").valueOf(),
    },
    {
      title: "Echéance de visite",
      dataIndex: "echeance_visite",
      responsive: ["xl"],
      key: 8,
      sorter: (a, b) =>
      moment(a.echeance_visite, "DDMMYYYY").valueOf() -
      moment(b.echeance_visite, "DDMMYYYY").valueOf(),
    },
    {
      title: "Action",
      key: "10",
      render: (vehicule) => (
        <Space size="small">
          <a
            onClick={() => {
              setVehicule(vehicule);
              setVisibleDetails(true);
            }}
          >
            <EyeOutlined />
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setVehicule(vehicule);
              setModify(true)
              setVisibleDetails(true);
            }}
          >
            <EditOutlined />
          </a>
          <Divider type="vertical" />
          <a>
            <Popconfirm
              title="voulez-vous vraiment supprimer cette véhicule ?"
              onConfirm={() => {}}
              okText="Oui"
              cancelText="Non"
            >
              <DeleteOutlined />
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
  const createObj = {
    visible: visibleForm,
    setVisible: setVisibleForm,
    forceRefresh: forceRefresh,
  };
  const detailsObj = {
    visible: visibleDetails,
    setVisible: setVisibleDetails,
    vehicule: vehicule,
    modify:modify,
    setModify:setModify,
    forceRefresh: forceRefresh,
  };

  useEffect(() => {
    setData(vehicules);
  }, [refresh]);

  return (
    <div className="Cautions">
      <Breadcrumb separator=">" className="mt-5">
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Gestion des véhicules</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="mt-5" gutter={[12, 24]}>
        <Col xs={24}>
          <Card
            title={<Title level={4}>Gestion des véhicules</Title>}
            bordered={false}
            extra={
              <Button
                type="primary"
                onClick={() => {
                  setVisibleForm(true);
                }}
              >
                Ajouter une véhicule
              </Button>
            }
          >
            <Tabs
              defaultActiveKey="1"
              onChange={() => {}}
              items={[
                {
                  label: `Tout les véhicules`,
                  key: "1",
                  children: (
                    <Table
                      columns={columns}
                      dataSource={data}
                      pagination={{
                        size: "small",
                        pageSize: 7,
                      }}
                    />
                  ),
                },
                {
                  label: `Véhicules sous contrat`,
                  key: "2",
                  children: (
                    <Table
                      columns={columns}
                      dataSource={data.filter(
                        (item) => item.puissance_fiscale <= 4
                      )}
                      pagination={{
                        size: "small",
                        pageSize: 7,
                      }}
                    />
                  ),
                },
                {
                  label: `Véhicules disponibles`,
                  key: "3",
                  children: (
                    <Table
                      columns={columns}
                      dataSource={data.filter(
                        (item) => item.puissance_fiscale > 4
                      )}
                      pagination={{
                        size: "small",
                        pageSize: 7,
                      }}
                    />
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
      <AddVehicule {...createObj}/>
      <DetailVehicule {...detailsObj}/>

    </div>
  );
}

export default Vehicules;
