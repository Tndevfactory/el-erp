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
  Radio,
} from "antd";
import { QuestionCircleOutlined, InboxOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  createCaution,
  getCautionNatures,
  ICautionNature,
  deleteCaution,
  IProlongation,
  ICaution,
  updateCaution,
} from "../../../features/finance/caution/cautionSlice";
import { getProjects, IProject } from "@/features/project/projectSlice";
import { getClients, IClient } from "@/features/client/clientSlice";
import {
  getEntreprises,
  IEntreprise,
} from "@/features/entreprise/entrepriseSlice";
import ListeProlongation from "./ListeProlongation";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import FormItem from "antd/lib/form/FormItem";
const { Dragger } = Upload;
const { Option } = Select;
const { Title } = Typography;

const CautionDetails: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  caution: ICaution;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  prolongation: boolean;
  setProlongation: React.Dispatch<React.SetStateAction<boolean>>;
  tableRef: any;
}> = ({
  visible,
  setVisible,
  caution,
  update,
  setUpdate,
  prolongation,
  setProlongation,
  tableRef,
}) => {
  var { windowWidth } = useSelector((store: any) => store.ui);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const [projects, setProjects] = useState<IProject[]>();
  const [cautionNatures, setCautionNatures] = useState<ICautionNature[]>();
  const [clients, setClients] = useState<IClient[]>();
  const [entreprises, setEntreprises] = useState<IEntreprise[]>();
  const [fileList, setFileList] = useState([]);
  const [aFaireAvant, setAFaireAvant]=useState("");
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
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
  //Disable date
  const disabledDateDebut: RangePickerProps["disabledDate"] = (current) => {
    return (
      current &&
      current.valueOf() < dayjs().endOf("day").valueOf() + 86400000 * 6
    );
  };
  const disabledDateFaireAvant: RangePickerProps["disabledDate"] = (
    current
  ) => {
    console.log(form.getFieldValue("date_debut"));
    return (
      current &&
      current.valueOf() >
        form.getFieldValue("date_debut").endOf("day").valueOf() - 86400000 * 2
    );
  };

  const handleUpdate = (values) => {
    dispatch(
      updateCaution({
        id: caution.id,
        projet_id: values.projet,
        // Demandeur: values.Demandeur,
        caution_nature_id: values.caution_nature,
        date_max_retour: moment(aFaireAvant,"DD/MM/YYYY").format("YYYY-MM-DD"),
        Client: values.client,
        montant: values.montant,
        eps: values.eps,
        period_valid: values.duree,
        // Etat_main_levée: "En attente",
        // Observation: values.Observation,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        tableRef.current.reload();
        setUpdate(false);
        // onClose();
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
      });
  };
  const handleDeleteCaution=(id)=>{
    dispatch(deleteCaution(id))
    .unwrap()
    .then((originalPromiseResult) => {
      tableRef.current.reload( ) ;
    })
    .catch((rejectedValueOrSerializedError) => {
      console.log(rejectedValueOrSerializedError);
    });
  }
  const handleCloseCaution = () => {

  };
  const handleAddDuration = (value) => {

  };
  //select search and sort
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const filterSort = (optionA, optionB) =>
    (optionA?.label ?? "")
      .toLowerCase()
      .localeCompare((optionB?.label ?? "").toLowerCase());

  useEffect(() => {
    if (visible) {
      dispatch(getProjects())
        .unwrap()
        .then((originalPromiseResult) => {
          setProjects(originalPromiseResult.data);
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError);
        });
      dispatch(getClients())
        .unwrap()
        .then((originalPromiseResult) => {
          setClients(originalPromiseResult.data);
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError);
        });
      dispatch(getCautionNatures())
        .unwrap()
        .then((originalPromiseResult) => {
          setCautionNatures(originalPromiseResult.data);
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError);
        });
      dispatch(getEntreprises())
        .unwrap()
        .then((originalPromiseResult) => {
          setEntreprises(originalPromiseResult.data);
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError);
        });
      setFields([
        // {
        //   name: ['entreprise'],
        //   value: caution.projet.departement_id,
        // },
        {
          name: ["client"],
          value: caution.projet.tier_id,
        },
        {
          name: ["projet"],
          value: caution.projet.id,
        },
        {
          name: ["num_appel_offre"],
          value: caution.projet.id,
        },
        {
          name: ["caution_nature"],
          value: caution.caution_type.type,
        },
        {
          name: ["montant"],
          value: caution.montant,
        },
        {
          name: ["date_debut"],
          value: dayjs(caution.created_at.substring(0, 10), "YYYY-MM-DD"),
        },
        {
          name: ["duree"],
          value:
            //  update
            //   ? caution.period_valid
            //   : caution.DuréeAdditionnelle && caution.Durée
            //   ? `${caution.period_valid} (${caution.DuréeAdditionnelle} jours additionnels)`
            //   :
            caution.period_valid,
        },
        {
          name: ["a_faire_avant"],
          value:
            caution.date_max_retour &&
            dayjs(caution.date_max_retour.substring(0, 10), "YYYY-MM-DD"),
        },
        {
          name: ["eps"],
          value: caution.eps,
        },
        // {
        //   name: ["Etat_main_levée"],
        //   value: caution.Etat_main_levée,
        // },
        {
          name: ["dateE"],
          value: moment(
            moment(
              moment(
                caution.created_at.substring(0, 10),
                "YYYY-MM-DD"
              ).valueOf() +
                86400000 * caution.period_valid
            ).format("DD/MM/YYYY"),
            "DD/MM/YYYY"
          ),
        },
        // {
        //   name: ["Date_réception_PV_définitif"],
        //   value:
        //     caution.Date_réception_PV_définitif &&
        //     moment(caution.Date_réception_PV_définitif, "DD/MM/YYYY"),
        // },
        // {
        //   name: ["observation"],
        //   value: caution.Observation && caution.Observation,
        // },
      ]);
      setAFaireAvant( moment(caution.date_max_retour,"YYYY-MM-DD").format("DD/MM/YYYY"))
    }

    console.log(caution);
    setTimeout(() => {
      if (prolongation) scrollToBottom();
    }, 200);
  }, [caution, update, prolongation]);
  return (
    <Drawer
      title={update ? "Modifer la caution" : "Détails de caution"}
      className="CautionDetails"
      width={windowWidth > 750 ? 720 : "90%"}
      onClose={onClose}
      open={visible}
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
        form={form}
        disabled={!update}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="entreprise"
              label="Entreprise"
              rules={[
                {
                  required: true,
                  message: "Veuillez choisir l'entreprise",
                },
              ]}
            >
              <Select
                placeholder="Veuillez choisir l'entreprise"
                showSearch
                filterOption={filterOption}
                filterSort={filterSort}
              >
                {entreprises?.map((item) => (
                  <Option
                    key={item.id}
                    value={item.id}
                    label={item.designation}
                  >
                    {item.designation}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="client"
              label="Client"
              rules={[
                {
                  required: true,
                  message: "Veuillez choisir le client",
                },
              ]}
            >
              <Select
                placeholder="Veuillez choisir le client"
                showSearch
                filterOption={filterOption}
                filterSort={filterSort}
              >
                {clients?.map((item) => (
                  <Option
                    key={item.id}
                    value={item.id}
                    label={item.designation}
                  >
                    {item.designation}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="projet"
              label="Projet "
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le titre du projet",
                },
              ]}
            >
              <Select
                placeholder="Veuillez entrer le titre du projet"
                showSearch
                filterOption={filterOption}
                filterSort={filterSort}
                onChange={(e) => form.setFieldValue("num_appel_offre", e)}
              >
                {projects?.map((item) => (
                  <Option
                    key={item.id}
                    value={item.id}
                    label={item.designation}
                  >
                    {item.designation}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="num_appel_offre"
              label="N° appel d'offre"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le N° d'appel d'offre",
                },
              ]}
            >
              <Select
                placeholder="Veuillez entrer le N° d'appel d'offre"
                showSearch
                filterOption={filterOption}
                filterSort={filterSort}
                onChange={(e) => {
                  form.setFieldValue("projet", e);
                }}
              >
                {projects?.map((item) => (
                  <Option key={item.id} value={item.id} label={item.reference}>
                    {item.reference}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="caution_nature"
              label="type de caution "
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le type de caution",
                },
              ]}
            >
              <Select
                placeholder="Veuillez entrer le type de caution"
                showSearch
                filterOption={filterOption}
                filterSort={filterSort}
              >
                {cautionNatures?.map((item) => (
                  <Option
                    key={item.id}
                    value={item.id}
                    label={item.type}
                  >
                    {item.type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="montant"
              label="Montant en dinars"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le montant",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                placeholder="Veuillez entrer le montant"
                onBlur={(e) => {
                  if (parseFloat(e.target.value.replace(",", "")) >= 1000) {
                    form.setFieldsValue({
                      eps: 1,
                    });
                  } else {
                    form.setFieldsValue({
                      eps: 0,
                    });
                  }
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="date_debut"
              label="Date début"
              rules={[
                {
                  required: true,
                  message: "Veuillez choisir la date de debut",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
                placement="topLeft"
                onChange={(value, dateString: string) => {}}
                disabledDate={disabledDateDebut}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="duree"
              label="Durée par jour"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer la durée du caution",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Veuillez entrer la durée du caution"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="a_faire_avant"
              label="A faire avant"
              rules={[
                {
                  required: true,
                  message: "Veuillez choisir la date",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
                placement="topLeft"
                onChange={(value, dateString: string) => { setAFaireAvant(dateString)}}
                disabledDate={disabledDateFaireAvant}
              />
            </Form.Item>
          </Col>
          {localStorage.getItem('role') === 'chef'&&
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="eps"
              label="Ligne"
              // tooltip={{ title: 'Tooltip with customize icon', icon: <InboxOutlined /> }}
              rules={[
                {
                  required: true,
                  message: "Please choose the approver",
                },
              ]}
            >
              <Radio.Group disabled={localStorage.getItem('role')!=="chef"}>
                <Radio value={1}> Ligne eps </Radio>
                <Radio value={0}> Compte courant </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>}
          <Col span={24}>
            <Form.Item
              name="files"
              label="Attachements"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Veuillez ratacher les fichiers',
              //   },
              //   () => ({
              //     validator() {
              //       if (fileList.length >= 3) {
              //         return Promise.resolve()
              //       }
              //       return Promise.reject(
              //         new Error('Les fichiers ... et ... sont obligatoires'),
              //       )
              //     },
              //   }),
              // ]}
            >
              <Dragger {...props} multiple={false} listType="picture">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Cliquez ou faites glisser le fichier dans cette zone pour le
                  télécharger
                </p>
                <p className="ant-upload-hint">
                  Merci d'attacher le fichier ..., ... et ...
                </p>
              </Dragger>
            </Form.Item>
          </Col>
          {update && (
          <Col span={24} style={{ textAlign: "right" }}>
          <Form.Item>

            <Space>
              <Button className="btnAnnuler" onClick={() => setUpdate(false)}>
                Annuler
              </Button>
              <Button className="btnModofier" htmlType="submit" type="primary">
                Mettre à jour
              </Button>
            </Space>
          </Form.Item>
          </Col>
          )}
          </Row>
        </Form>
        <div style={{ textAlign: "right" }}>
          {!update && (
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
              {visible && (
                // caution.Etat_main_levée === "En attente" &&
                <Space>
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
                      handleDeleteCaution(caution.id)
                      onClose();
                      // message.success("Click on Yes");
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button className="btnSupprimer" danger>
                      Supprimer
                    </Button>
                  </Popconfirm>
                  <Button
                    className="btnModofier"
                    onClick={() => setUpdate(true)}
                  >
                    Modifier
                  </Button>
                  {localStorage.getItem("role") === "chef" && (
                    <Button
                      className="btnFermer"
                      onClick={() => {
                        // dispatch(CautionApprove({ id: caution.id }));
                        onClose();
                      }}
                      type="primary"
                    >
                      Approuver
                    </Button>
                  )}
                </Space>
              )}
              {/* {visible &&
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
                )} */}
            </>
          )}
        </div>

      {/* {caution?.prolongation?.length !== 0 && (
        <>
          <Divider>Liste de prolongation</Divider>
          <ListeProlongation prolongation={caution.prolongation} />
        </>
      )} */}
    </Drawer>
  );
};

export default CautionDetails;
