import React, { useEffect, useState } from "react";
import "../../../style/modules/Caution.less";
import {
  Button,
  Space,
  Breadcrumb,
  Card,
  Col,
  Row,
  Typography,
  Divider,
  Popconfirm,
  Tabs,
  Badge,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { ProTable, TableDropdown, ProColumns } from '@ant-design/pro-components';
import { useDispatch, useSelector } from "react-redux";
import { IVehicule } from "@/features/flotte/vehicule/flotteVehiculeSlice";
import AddVehicule from "./AddVehicule";
import DetailVehicule from "./DetailVehicule";
import moment from "moment";
const { Title } = Typography;

const Vehicules: React.FC = () => {
  const dispatch = useDispatch();
  var { vehicules } = useSelector((store: any) => store.flotteVehicule);

  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [vehicule, setVehicule] = useState<IVehicule>();
  const [refresh, forceRefresh] = useState(0);
  const [modify, setModify] = useState(false)

  const columns: ProColumns<IVehicule>[] = [
    {
      title: "Immatriculation",
      dataIndex: "immatriculation",
      key: "immatriculation",
    },
    {
      title: "Marque",
      dataIndex: "marque",
      key: "marque",
    },
    {
      title: "Modèle",
      dataIndex: "modele",
      key: "modele",
    },
    {
      title: "Puissance fiscale",
      dataIndex: "puissance_fiscale",
      render: (code) => <a>{code}</a>,
      key: "puissance_fiscale",
      // search:false,
      valueType: 'digit',
    },
    {
      title: "Puissance cylindrée",
      dataIndex: "puissance_cylindrée",
      render: (code) => <a>{code}</a>,
      key: "puissance_cylindrée",
      // search:false,
      valueType: 'digit',
    },
    {
      title: "Echéance de taxe",
      dataIndex: "echeance_taxe",
      responsive: ["xl"],
      key: 6,
      search:false,
      sorter: (a, b) =>
        moment(a.echeance_taxe, "DDMMYYYY").valueOf() -
        moment(b.echeance_taxe, "DDMMYYYY").valueOf(),
    },
    {
      title: "Echéance de l'assurance",
      dataIndex: "echeance_assurance",
      key: 7,
      search:false,
      responsive: ["xl"],
      render: (date)=><>{date}</>,
      sorter: (a, b) =>
        moment(a.echeance_assurance, "DDMMYYYY").valueOf() -
        moment(b.echeance_assurance, "DDMMYYYY").valueOf(),
    },
    {
      title: "Echéance de visite",
      dataIndex: "echeance_visite",
      responsive: ["xl"],
      key: 8,
      search:false,
      sorter: (a, b) =>
      moment(a.echeance_visite, "DDMMYYYY").valueOf() -
      moment(b.echeance_visite, "DDMMYYYY").valueOf(),
    },
    {
      title: 'Action',
      valueType: 'option',
      key: 'option',
      render: (text,vehicule) => (
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
  const Table = (etat: string)=>(

    <ProTable<IVehicule>
    columns={columns}
    cardBordered
    columnsState={{
      persistenceKey: 'pro-table-singe-demos',
      persistenceType: 'localStorage',
      onChange(value) {
        console.log('value: ', value);
      },
    }}
    search={{
      labelWidth: "auto",
    }}
    options={{
      setting: {
        listsHeight: 400,
      },
    }}
    pagination={{
      pageSize: 4,
      onChange: (page) => console.log(page),
      
    }}
    headerTitle="Liste de véhicules"
    request={async (params) => {
      console.log(`request params:`, params);
      var dataFilter
      if(etat==="all") dataFilter=vehicules
      else if (etat==="contrat") dataFilter=vehicules.filter((item)=>item.puissance_fiscale>4)
      else dataFilter=vehicules.filter((item)=>item.puissance_fiscale<=4)
      if(params.immatriculation) dataFilter=dataFilter.filter((item)=>item.immatriculation.toString().toUpperCase().search(params.immatriculation.toString().toUpperCase())===-1?false:true);
      if(params.marque) dataFilter=dataFilter.filter((item)=>item.marque.toString().toUpperCase().search(params.marque.toString().toUpperCase())===-1?false:true);
      if(params.modele) dataFilter=dataFilter.filter((item)=>item.modele.toString().toUpperCase().search(params.modele.toString().toUpperCase())===-1?false:true);
      if(params.puissance_fiscale) dataFilter=dataFilter.filter((item)=>item.puissance_fiscale.toString().toUpperCase().search(params.puissance_fiscale.toString().toUpperCase())===-1?false:true);
      if(params.puissance_cylindrée) dataFilter=dataFilter.filter((item)=>item.puissance_cylindrée.toString().toUpperCase().search(params.puissance_cylindrée.toString().toUpperCase())===-1?false:true);
      return {
        data: dataFilter,
        success: true,
      };
    }}
    toolBarRender={() => [
      <Button
      type="primary"
      icon={<PlusOutlined/>}
      onClick={() => {
        setVisibleForm(true);
      }}
    >
      Ajouter une véhicule
    </Button>
    ]}
  />
  )
  const [data, setData] = useState([]);
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
          >
            <Tabs
              defaultActiveKey="1"
              onChange={() => {}}
              items={[
                {
                  label: <Space><>Tout les véhicules</><Badge count={6} showZero color='#CACFD2' /></Space >,
                  key: "1",
                  children: Table("all"),
                },
                {
                  label: <Space><>Véhicules sous contrat</><Badge count={2} showZero color='#CACFD2' /></Space >,
                  key: "2",
                  children: Table("contrat")
                },
                {
                  label: <Space><>Véhicules disponibles</><Badge count={4} showZero color='#CACFD2' /></Space >,
                  key: "3",
                  children: Table("dispo")
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
