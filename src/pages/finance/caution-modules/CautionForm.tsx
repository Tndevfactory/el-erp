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
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  addCaution,
  createCaution,
  getCautionNatures,
  ICautionNature,
} from "../../../features/finance/caution/cautionSlice";
import { getProjects, IProject } from "@/features/project/projectSlice";
import { getClients, IClient } from "@/features/client/clientSlice";
const { Option } = Select;
const { Dragger } = Upload;

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
const CautionForm: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  forceRefresh: React.Dispatch<React.SetStateAction<number>>;
}> = ({ visible, setVisible, forceRefresh }) => {
  const dispatch = useDispatch();
  var { windowWidth } = useSelector((store: any) => store.ui);
  const [form] = Form.useForm();
  const [projects, setProjects] = useState<IProject[]>();
  const [cautionNatures, setCautionNatures] = useState<ICautionNature[]>();
  const [clients, setClients] = useState<IClient[]>();

  const onClose = () => {
    setVisible(false);
  };
  const handleSubmit = (values) => {
    dispatch(
      createCaution({
        projet_id: values.projet,
        // Demandeur: values.Demandeur,
        caution_nature_id: values.caution_nature,
        // DateD: moment(values.dateTime._d).format("DD/MM/YYYY"),
        Client: values.client,
        montant: values.montant,
        eps: values.eps,
        Frais_mois: 20,
        period_valid: values.duree,
        // Etat_main_levée: "En attente",
        // Observation: values.Observation,
      })
    ).unwrap()
    .then((originalPromiseResult) => {
      forceRefresh(Math.random());
      setVisible(false);
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
    }
  }, [visible]);
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
        form={form}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="client"
              label="Client"
              rules={[
                {
                  required: true,
                  message: "Please choose the type",
                },
              ]}
            >
              <Select
                placeholder="Veuillez entrer le client"
                showSearch
                filterOption={filterOption}
                filterSort={filterSort}
              >
                {clients?.map(item =>                 
                <Option key={item.id} value={item.id} label={item.designation}>
                  {item.designation}
                </Option>
                )}
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
                  message: "Please select an owner",
                },
              ]}
            >
              <Select
                placeholder="Veuillez entrer le type de caution"
                showSearch
                filterOption={filterOption}
                filterSort={filterSort}
              >
                {cautionNatures?.map(item =>                 
                <Option key={item.id} value={item.id} label={item.designation}>
                  {item.designation}
                </Option>
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="projet"
              label="Nom du Projet "
              rules={[
                {
                  required: true,
                  message: "Please enter user name",
                },
              ]}
            >
              <Select
                placeholder="Veuillez entrer le titre du projet"
                showSearch
                filterOption={filterOption}
                filterSort={filterSort}
              >
                {projects?.map(item =>                 
                <Option key={item.id} value={item.id} label={item.designation}>
                  {item.designation}
                </Option>
                )}
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
                  message: "Please choose the approver",
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
                  message: "Please choose the dateTime",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
                placement="topLeft"
                onChange={(value, dateString: string) => {}}
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
                  message: "Please choose the approver",
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
                  message: "Please choose the dateTime",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
                placement="topLeft"
                onChange={(value, dateString: string) => {}}
              />
            </Form.Item>
          </Col>
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
              <Radio.Group >
                <Radio value={1}> Ligne eps </Radio>
                <Radio value={0}> Compte courant </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
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
                  Cliquez ou faites glisser le fichier dans cette zone pour le
                  télécharger
                </p>
                <p className="ant-upload-hint">
                  Merci d'attacher le fichier ..., ... et ...
                </p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ textAlign: "right" }}>
          <Button
            className="btnAnnuler"
            htmlType="reset"
            style={{ marginRight: "10px" }}
          >
            Annuler
          </Button>
          <Button className="btnModofier" htmlType="submit">
            Envoyer
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CautionForm;
