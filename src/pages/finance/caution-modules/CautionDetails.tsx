import React, { useEffect, useState, useRef } from "react";
import {
  UploadProps,
  Button,
  Space,
  Drawer,
  Input,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Popconfirm,
  message,
  Popover,
  InputNumber,
  Upload,
  Divider,
  Typography,
} from "antd";
import { QuestionCircleOutlined, InboxOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  addDuration,
  deleteCaution,
  updateCaution,
  CautionApprove,
  IProlongation,
} from "@/features/caution/cautionSlice";
import { getOneCaution, closeCaution } from "@/features/caution/cautionSlice";
import ListeProlongation from "./ListeProlongation";

const { Dragger } = Upload;
const { Option } = Select;
const { Title } = Typography;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
    } else if (status === "error") {
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const CautionDetails: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  forceRefresh: React.Dispatch<React.SetStateAction<number>>;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  prolongation: IProlongation[];
  setProlongation: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  visible,
  setVisible,
  forceRefresh,
  update,
  setUpdate,
  prolongation,
  setProlongation,
}) => {
  var { caution } = useSelector((store: any) => store.caution);
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);
  const showDrawer = () => {
    setVisible(true);
  };
  const drawerEndRef = useRef(null);
  const drawerTopRef = useRef(null);

  const scrollToBottom = () => {
    drawerEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToTop = () => {
    drawerTopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onClose = () => {
    setVisible(false);
    setUpdate(false);
    setProlongation(false);
    scrollToTop();
  };

  useEffect(() => {
    if (visible) {
      setFields([
        {
          name: ["nomProjet"],
          value: caution.Nom_Projet,
        },
        {
          name: ["demandeur"],
          value: caution.Demandeur,
        },
        {
          name: ["type"],
          value: caution.type_caution,
        },
        {
          name: ["client"],
          value: caution.Client,
        },
        {
          name: ["montant"],
          value: caution.Montant,
        },
        {
          name: ["dateD"],
          value: moment(caution.DateD, "DD/MM/YYYY"),
        },
        {
          name: ["durée"],
          value: update
            ? caution.Durée
            : caution.DuréeAdditionnelle && caution.Durée
            ? `${caution.Durée} (${caution.DuréeAdditionnelle} jours additionnels)`
            : caution.Durée,
        },
        {
          name: ["ligne"],
          value: caution.ligne,
        },
        {
          name: ["Etat_main_levée"],
          value: caution.Etat_main_levée,
        },
        {
          name: ["dateE"],
          value: moment(
            moment(
              moment(caution.DateD, "DDMMYYYY").valueOf() +
                86400000 * caution.Durée
            ).format("DD/MM/YYYY"),
            "DD/MM/YYYY"
          ),
        },
        {
          name: ["Date_réception_PV_définitif"],
          value:
            caution.Date_réception_PV_définitif &&
            moment(caution.Date_réception_PV_définitif, "DD/MM/YYYY"),
        },
        {
          name: ["observation"],
          value: caution.Observation && caution.Observation,
        },
      ]);
    }
    setTimeout(() => {
      if (prolongation) scrollToBottom();
    }, 200);
  }, [caution, update, prolongation]);
  const handleUpdate = (values) => {
    console.log(values);
    console.log(caution.id);
    dispatch(
      updateCaution({
        id: caution.id,
        caution: {
          Nom_Projet: values.nomProjet,
          Demandeur: values.demandeur,
          type_caution: values.type,
          DateD: moment(values.dateD._d).format("DD/MM/YYYY"),
          Client: values.client,
          Montant: values.montant,
          Frais_mois: 20,
          Durée: values.durée,
          ligne: values.ligne,
          Etat_main_levée: values.Etat_main_levée,
          Date_réception_PV_définitif:
            values.Date_réception_PV_définitif &&
            moment(values.Date_réception_PV_définitif._d).format("DD/MM/YYYY"),
          Observation: null,
        },
      })
    );
    setUpdate(false);
    dispatch(getOneCaution({ id: caution.id }));
    forceRefresh(Math.random());
    message.success("Click on Yes");
  };
  const handleCloseCaution = () => {
    dispatch(closeCaution({ id: caution.id }));
    dispatch(getOneCaution({ id: caution.id }));
    forceRefresh(Math.random());
  };
  const handleAddDuration = (value) => {
    dispatch(
      addDuration({
        id: caution.id,
        DuréeAdditionnelle: value.duréeAdditionnelle,
      })
    );
    dispatch(getOneCaution({ id: caution.id }));
    forceRefresh(Math.random());
  };
  return (
    <Drawer
      title={update ? "Modifer la caution" : "Détails de caution"}
      className="CautionDetails"
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >
      <div ref={drawerTopRef} />
      <Form
        layout="vertical"
        fields={fields}
        hideRequiredMark
        onFinish={handleUpdate}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="nomProjet" label="Nom du Projet ">
              <Input disabled={!update} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="demandeur" label="Demandeur">
              <Select disabled={!update}>
                <Option value="Abdelmonam KOUKA">Abdelmonam KOUKA</Option>
                <Option value="Asma Manaii">Asma Manaii</Option>
                <Option value="Hiba GRAYAA">Hiba GRAYAA</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="type" label="type de caution ">
              <Select disabled={!update}>
                <Option value="Provisoire-CSP">Provisoire-CSP</Option>
                <Option value="Définitive-CSP">Définitive-CSP</Option>
                <Option value="Retenue de Garantie">Retenue de Garantie</Option>
                <Option value="Avance">Avance</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="client" label="Client">
              <Select disabled={!update}>
                <Option value="Ministère de la Jeunesse et des Sports">
                  Ministère de la Jeunesse et des Sports
                </Option>
                <Option value="Ministère de commerce et du Développement des Exportations">
                  Ministère de commerce et du Développement des Exportations
                </Option>
                <Option value="Société Régionale de Transport du Gouvernorat de Nabeul (SRTGN)">
                  Société Régionale de Transport du Gouvernorat de Nabeul
                  (SRTGN)
                </Option>
                <Option value="Institut National de la Météorologie-INM">
                  Institut National de la Météorologie-INM
                </Option>
                <Option value="L'Instance Tunisienne de l'Investissement">
                  L'Instance Tunisienne de l'Investissement
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="montant" label="Montant">
              <Input disabled={!update} suffix="dt" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="dateD" label="Date début">
              <DatePicker
                format={"DD/MM/YYYY"}
                style={{ width: "100%" }}
                placement="topLeft"
                disabled={!update}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="durée" label={<>Durée</>}>
              <Input disabled={!update} suffix="jours" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="dateE" label="Date d'échéance">
              <DatePicker
                format={"DD/MM/YYYY"}
                style={{ width: "100%" }}
                placement="topLeft"
                disabled={true}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="ligne" label="Ligne">
              <Select disabled={!update}>
                <Option value={"EPS"}>EPS</Option>
                <Option value={"Compte courant"}>Compte courant</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="Etat_main_levée" label="Etat de main levée">
              <Select disabled={!update}>
                <Option value={true} style={{ color: "#2ECC71" }}>
                  Fermée
                </Option>
                <Option value={false} style={{ color: "#F4D03F" }}>
                  En cours
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="observation" label="Observation">
              <Input.TextArea autoSize disabled={!update} />
            </Form.Item>
          </Col>
        </Row>
        {prolongation && (
          <div ref={drawerEndRef}>
            <Title level={4} style={{ color: "#3498DB" }}>
              Demande de prolongation
            </Title>
            <Form layout="vertical" hideRequiredMark onFinish={() => {}}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="refProlg" label="Référence demande">
                    <Input placeholder="Veuillez entrer la référence de prolongation" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Durée prolongation"
                    label="Durée par jour"
                    rules={[
                      {
                        required: true,
                        message: "Please choose the approver",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="Veuillez entrer la durée de prolongation"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="files"
                    label="Attachements"
                    rules={[
                      {
                        required: true,
                        message: "Please choose the type",
                      },
                    ]}
                  >
                    <Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Cliquez ou faites glisser le fichier dans cette zone
                        pour le télécharger
                      </p>
                      <p className="ant-upload-hint">
                        Merci d'attacher le fichier ..., ... et ...
                      </p>
                    </Dragger>
                  </Form.Item>
                </Col>
              </Row>
            </Form>{" "}
          </div>
        )}
        <Form.Item style={{ textAlign: "right" }}>
          {update ? (
            <Space>
              <Button className="btnAnnuler" onClick={() => setUpdate(false)}>
                Annuler
              </Button>
              <Button className="btnModofier" htmlType="submit">
                Mettre à jour
              </Button>
            </Space>
          ) : (
            <>
              {/* <Button hidden={true}>fake button</Button> */}
              {visible && prolongation && (
                <Space>
                  <Button
                    className="btnAnnuler"
                    onClick={() => setProlongation(false)}
                  >
                    Annuler
                  </Button>
                  <Button className="btnModofier">Confirmer</Button>
                </Space>
              )}
              {visible && caution.Etat_main_levée === "En attente" && (
                <Space>
                  <Button
                    className="btnFermer"
                    onClick={() => {
                      dispatch(CautionApprove({ id: caution.id }));
                      forceRefresh(Math.random());
                      onClose();
                    }}
                  >
                    Approuver
                  </Button>
                  <Button
                    className="btnModofier"
                    onClick={() => setUpdate(true)}
                  >
                    Modifier
                  </Button>
                  <Popconfirm
                    icon={
                      <QuestionCircleOutlined
                        style={{
                          color: "red",
                        }}
                      />
                    }
                    title="voulez-vous vraiment supprimer cette caution ?"
                    onConfirm={() => {
                      dispatch(deleteCaution({ id: caution.id }));
                      onClose();
                      forceRefresh(Math.random());
                      message.success("Click on Yes");
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button className="btnSupprimer">Supprimer</Button>
                  </Popconfirm>
                </Space>
              )}
              {visible &&
                caution.Etat_main_levée === "En cours" &&
                !prolongation && (
                  <Space>
                    <Button
                      className="btnProlonger"
                      onClick={() => {
                        setProlongation(!prolongation);
                      }}
                    >
                      Prolonger
                    </Button>
                    <Button className="btnFermer" onClick={handleCloseCaution}>
                      Fermer
                    </Button>
                  </Space>
                )}
            </>
          )}
        </Form.Item>
      </Form>
      {caution?.Prolongations?.length !== 0 && (
        <>
          <Divider>Liste de prolongation</Divider>
          <ListeProlongation prolongation={caution.Prolongations} />
        </>
      )}
    </Drawer>
  );
};

export default CautionDetails;
