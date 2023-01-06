import React, { useEffect, useState, useRef } from "react";
import {
  UploadProps,
  Button,
  Space,
  Drawer,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  InputNumber,
  Upload,
  Typography,
  Radio,
  Spin,
  Statistic,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  getCautionNatures,
  ICautionNature,
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
const { Dragger } = Upload;
const { Option } = Select;

const CautionDetails: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  caution: ICaution;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  prolongation: boolean;
  setProlongation: React.Dispatch<React.SetStateAction<boolean>>;
  tableRef: any;
  cautions:ICaution[]
}> = ({
  visible,
  setVisible,
  caution,
  update,
  setUpdate,
  prolongation,
  setProlongation,
  tableRef,
  cautions
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
  const [aFaireAvant, setAFaireAvant] = useState("");
  const [refresh, forceUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [ligneEPS, setlingeEPS] = useState(0);
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

  const handleUpdate = (values) => {
    dispatch(
      updateCaution({
        id: caution.id,
        projet_id: values.projet,
        // Demandeur: values.Demandeur,
        type_id: parseInt(values.caution_nature),
        date_max_retour: moment(aFaireAvant, "DD/MM/YYYY").format("YYYY-MM-DD"),
        Client: values.client,
        montant: values.montant,
        eps: values.eps,
        period_valid: values.duree,
        // Etat_main_levée: "En attente",
        // Observation: values.Observation,
        // etat_id: 1,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        tableRef.current.reload();
        setUpdate(false);
        onClose();
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
      });
  };
  const handlechangeStateCaution = (state) => {
    dispatch(
      updateCaution({
        id: caution.id,
        type_id: caution.type_id,
        etat_id: state,
        projet_id: caution.projet_id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        tableRef.current.reload();
        onClose();
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };

  const calculCumulCautions = (entreprises,montant) : number => {
    // let cumul=entreprises.filter(item => item.id.toString()===caution.entreprise_id)[0].caution_mnt_max-caution.montant;
    let cumul=0;
    cumul=entreprises.filter(
      (item) =>
        item.id === parseInt(caution.entreprise_id)
    )[0].caution_mnt_max-montant
    cautions.map(item => {
      if(item.etat_id===5 && item.entreprise_id===caution.entreprise_id){
        cumul-=item.montant
      }
    })
    return cumul
  };
  
  //select search and sort
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const filterSort = (optionA, optionB) =>
    (optionA?.label ?? "")
      .toLowerCase()
      .localeCompare((optionB?.label ?? "").toLowerCase());

  useEffect(() => {
    setLoading(true);
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
          setlingeEPS(calculCumulCautions(originalPromiseResult.data,caution.montant))
          setLoading(false);
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError);
        });
      setFields([
        {
          name: ["entreprise"],
          value: caution.entreprise_id,
        },
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
          value: caution.caution_type.id,
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
      ]);
      setAFaireAvant(
        moment(caution.date_max_retour, "YYYY-MM-DD").format("DD/MM/YYYY")
      );
    }

    console.log(caution);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setTimeout(() => {
      if (prolongation) scrollToBottom();
    }, 200);
  }, [caution, update, prolongation]);
  useEffect(() => {}, [refresh]);
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
      {isLoading || !projects || !entreprises || !cautionNatures || !clients ? (
        <div className="w-full mt-60 text-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
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
                    onSelect={() => {
                      forceUpdate(Math.random());
                      form.setFields([
                        {
                          name: ["client"],
                          value: null,
                        },
                        {
                          name: ["projet"],
                          value: null,
                        },
                        {
                          name: ["num_appel_offre"],
                          value: null,
                        },
                      ]);
                    }}
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
                    onSelect={(e) => {
                      forceUpdate(Math.random());
                      form.setFields([
                        {
                          name: ["entreprise"],
                          value: clients.filter((item) => item.id === e)[0]
                            .entreprise_id,
                        },
                        {
                          name: ["projet"],
                          value: null,
                        },
                        {
                          name: ["num_appel_offre"],
                          value: null,
                        },
                      ]);
                    }}
                  >
                    {clients
                      ?.filter((item) =>
                        form.getFieldValue("entreprise")
                          ? item.entreprise_id ===
                            form.getFieldValue("entreprise")
                          : true
                      )
                      .map((item) => (
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
                    onChange={(e) => {
                      form.setFields([
                        {
                          name: ["num_appel_offre"],
                          value: e,
                        },
                        {
                          name: ["entreprise"],
                          value: projects.filter((item) => item.id === e)[0]
                            .departement.entreprise_id,
                        },
                        {
                          name: ["client"],
                          value: projects.filter((item) => item.id === e)[0]
                            .tier_id,
                        },
                      ]);
                    }}
                  >
                    {projects
                      ?.filter((item) =>
                        form.getFieldValue("client")
                          ? item.tier_id === form.getFieldValue("client")
                          : form.getFieldValue("entreprise")
                          ? item.departement.entreprise_id ===
                            form.getFieldValue("entreprise")
                          : true
                      )
                      .map((item) => (
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
                      form.setFields([
                        {
                          name: ["projet"],
                          value: e,
                        },
                        {
                          name: ["entreprise"],
                          value: projects.filter((item) => item.id === e)[0]
                            .departement.entreprise_id,
                        },
                        {
                          name: ["client"],
                          value: projects.filter((item) => item.id === e)[0]
                            .tier_id,
                        },
                      ]);
                    }}
                  >
                    {projects
                      ?.filter((item) =>
                        form.getFieldValue("client")
                          ? item.tier_id === form.getFieldValue("client")
                          : form.getFieldValue("entreprise")
                          ? item.departement.entreprise_id ===
                            form.getFieldValue("entreprise")
                          : true
                      )
                      .map((item) => (
                        <Option
                          key={item.id}
                          value={item.id}
                          label={item.reference}
                        >
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
                      <Option key={item.id} value={item.id} label={item.type}>
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
                        setlingeEPS(calculCumulCautions(entreprises,parseFloat(e.target.value.replace(",", ""))))
                      } else {
                        form.setFieldsValue({
                          eps: 0,
                        });
                        setlingeEPS(calculCumulCautions(entreprises,0))
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
                    onChange={(value, dateString: string) => {
                      form.setFields([
                        {
                          name: ["a_faire_avant"],
                          value: null,
                        },
                      ]);
                    }}
                    onSelect={() => {
                      forceUpdate(Math.random());
                    }}
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
                    onChange={(value, dateString: string) => {
                      setAFaireAvant(dateString);
                    }}
                  />
                </Form.Item>
              </Col>
              {localStorage.getItem("role") === "chef" && (
                <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Item
                    name="eps"
                    label="Ligne"
                    extra={
                      caution && caution.eps === 1 && caution.etat_id === 1 && (
                          <Space>
                            Ligne EPS aprés opération:
                            <Statistic
                              value={ligneEPS}
                              precision={3}
                            />
                            dinars
                          </Space>
                      )
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please choose the approver",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value={1}> Ligne eps </Radio>
                      <Radio value={0}> Compte courant </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              )}
              <Col span={24}>
                <Form.Item
                  name="files"
                  label="Attachements"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Veuillez ratacher les fichiers",
                  //   },
                  //   () => ({
                  //     validator() {
                  //       if (fileList.length>=3) {
                  //         return Promise.resolve();
                  //       }
                  //       return Promise.reject(new Error('Les fichiers ... et ... sont obligatoires'));
                  //     },
                  //   }),
                  // ]}
                >
                  <Dragger {...props} multiple listType="picture">
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Cliquez ou faites glisser le fichier dans cette zone pour
                      le télécharger
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
                      <Button
                        className="btnAnnuler"
                        onClick={() => setUpdate(false)}
                      >
                        Annuler
                      </Button>
                      <Button
                        className="btnModofier"
                        htmlType="submit"
                        type="primary"
                      >
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
                {caution.etat_id === 7 &&
                  localStorage.getItem("role") === "commerciale" && (
                    <Space>
                    <Button
                      onClick={() => setUpdate(true)}
                    >
                      Modifier
                    </Button>
                    <Button
                      onClick={() => handlechangeStateCaution(1)}
                      type="primary"
                    >
                      Envoyer
                    </Button>
                    </Space>
                )}
                {caution.etat_id === 1 &&
                  localStorage.getItem("role") === "commerciale" && (
                    <Button
                      className="btnModofier"
                      onClick={() => setUpdate(true)}
                    >
                      Modifier
                    </Button>
                )}
                {caution.etat_id === 1 &&
                  localStorage.getItem("role") === "chef" && (
                    <Space>
                      <Button
                        onClick={() => {
                          handlechangeStateCaution(2)
                        }}
                        danger
                      >
                        Refuser
                      </Button>
                      <Button
                        className="btnModofier"
                        onClick={() => setUpdate(true)}
                      >
                        Modifier
                      </Button>
                      <Button
                        className="btnFermer"
                        onClick={() => {
                          handlechangeStateCaution(3);
                          onClose();
                        }}
                        type="primary"
                      >
                        Approuver
                      </Button>
                    </Space>
                  )}
                  {caution.etat_id === 4 &&
                  localStorage.getItem("role") === "commerciale" && (
                    <Button
                  >
                    Prolonger
                  </Button>
                  )}
              </>
            )}
          </div>

          {/* {caution?.prolongation?.length !== 0 && (
        <>
          <Divider>Liste de prolongation</Divider>
          <ListeProlongation prolongation={caution.prolongation} />
        </>
      )} */}
        </>
      )}
    </Drawer>
  );
};

export default CautionDetails;
