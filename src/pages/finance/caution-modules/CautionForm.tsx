import React, { useEffect, useState } from "react";
import {
  Button,
  Space,
  Drawer,
  Input,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  InputNumber,
  Upload,
  UploadProps,
  Radio,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  createCaution,
  getCautionNatures,
  ICautionNature,
} from "../../../features/finance/caution/cautionSlice";
import { getProjects, IProject } from "@/features/project/projectSlice";
import { getClients, IClient } from "@/features/client/clientSlice";
import {
  getEntreprises,
  IEntreprise,
} from "@/features/entreprise/entrepriseSlice";
import type { RangePickerProps } from "antd/es/date-picker";
import moment from "moment";
const { Option } = Select;
const { Dragger } = Upload;

const CautionForm: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  tableRef: any;
}> = ({ visible, setVisible, tableRef }) => {
  const dispatch = useDispatch();
  var { windowWidth } = useSelector((store: any) => store.ui);
  const [form] = Form.useForm();
  const [projects, setProjects] = useState<IProject[]>();
  const [cautionNatures, setCautionNatures] = useState<ICautionNature[]>();
  const [clients, setClients] = useState<IClient[]>();
  const [entreprises, setEntreprises] = useState<IEntreprise[]>();
  const [aFaireAvant, setAFaireAvant] = useState("");
  const [refresh, forceUpdate] = useState(0);
  const [cautionState, setCautionState] = useState(1);
  //upload files
  const [fileList, setFileList] = useState([]);
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      console.log(file)
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  const onClose = () => {
    setFileList([]);
    setVisible(false);
    form.resetFields();
  };
  const handleSubmit = (values) => {
    dispatch(
      createCaution({
        projet_id: values.projet,
        // Demandeur: values.Demandeur,
        type_id: values.caution_nature,
        date_max_retour: moment(aFaireAvant, "DD/MM/YYYY").format("YYYY-MM-DD"),
        Client: values.client,
        montant: values.montant,
        eps: values.montant>=1000?1:0,
        Frais_mois: 20,
        period_valid: values.duree,
        // Etat_main_lev??e: "En attente",
        // Observation: values.Observation,
        etat_id: cautionState,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        tableRef.current.reload();
        onClose();
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
      });
  };

  //select search and sort
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const filterSort = (optionA, optionB) =>
    (optionA?.label ?? "")
      .toLowerCase()
      .localeCompare((optionB?.label ?? "").toLowerCase());

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
    }
  }, [visible]);
  useEffect(()=>{},[refresh])
  return (
    <Drawer
      title="Demander une nouvelle caution"
      width={windowWidth > 750 ? 720 : "90%"}
      className="CautionForm"
      onClose={onClose}
      open={visible}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >
      <Form
        layout="vertical"
        hideRequiredMark
        onFinish={handleSubmit}
        onReset={()=>{forceUpdate(Math.random())}}
        form={form}
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
                  forceUpdate(Math.random())
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
                      ? item.entreprise_id === form.getFieldValue("entreprise")
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
              label="N?? appel d'offre"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le N?? d'appel d'offre",
                },
              ]}
            >
              <Select
                placeholder="Veuillez entrer le N?? d'appel d'offre"
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
                {projects?.filter((item) =>
                    form.getFieldValue("client")
                      ? item.tier_id === form.getFieldValue("client")
                      : form.getFieldValue("entreprise")
                      ? item.departement.entreprise_id ===
                        form.getFieldValue("entreprise")
                      : true
                  ).map((item) => (
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
                // onBlur={(e) => {
                //   if (parseFloat(e.target.value.replace(",", "")) >= 1000) {
                //     form.setFieldsValue({
                //       eps: 1,
                //     });
                //   } else {
                //     form.setFieldsValue({
                //       eps: 0,
                //     });
                //   }
                // }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="date_debut"
              label="Date d??but"
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
                disabledDate={disabledDateDebut}
                onSelect={() => {
                  forceUpdate(Math.random());
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="duree"
              label="Dur??e par jour"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer la dur??e du caution",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Veuillez entrer la dur??e du caution"
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
                disabledDate={disabledDateFaireAvant}
                disabled={!form.getFieldValue("date_debut")}
              />
            </Form.Item>
          </Col>
          {/* {localStorage.getItem("role") === "chef" && (
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
                <Radio.Group>
                  <Radio value={1}> Ligne eps </Radio>
                  <Radio value={0}> Compte courant </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          )} */}
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
                  <Dragger {...props} multiple listType="picture-card">
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Cliquez ou faites glisser les fichiers dans cette zone pour
                      les t??l??charger
                    </p>
                    <p className="ant-upload-hint">
                      Merci d'attacher le cahier de charges et l'avis de caution
                    </p>
                  </Dragger>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item style={{ textAlign: "right" }}>
              <Space>
                <Button
                  className="btnAnnuler"
                  htmlType="reset"
                  onClick={() => setFileList([])}
                >
                  Annuler
                </Button>
                <Button htmlType="submit" onClick={() => setCautionState(7)}>Enregistrer</Button>
                <Button
                  className="btnModofier"
                  htmlType="submit"
                  type="primary"
                  onClick={() => setCautionState(1)}
                >
                  Envoyer
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default CautionForm;
