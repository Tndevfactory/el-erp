import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Upload,
  Typography,
  Input,
  InputNumber,
  UploadProps,
  UploadFile,
  Space,
  Button,
  DatePicker,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { InboxOutlined } from "@ant-design/icons";
import { createProlongation, updateProlongation } from "@/features/finance/caution/prolongationCaution";
import { ICaution } from "@/features/finance/caution/cautionSlice";
import moment from "moment";
const { Dragger } = Upload;
const { Title } = Typography;
const ProlongationForm: React.FC<{
  caution: ICaution;
  handlechangeStateCaution:any
}> = ({ caution, handlechangeStateCaution }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [update, setUpdate] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "0",
      name: "cahier_de_charges.pdf",
      status: "done",
    },
    {
      uid: "1",
      name: "avis_de_caution.pdf",
      status: "done",
    },
  ]);
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
  const handleUpdate = (values) => {
    dispatch(
      updateProlongation({
        id: caution.prolongations[0].id,
        caution_id: caution.prolongations[0].caution_id,
        etat_id:1,
        duree:values.duree,
        reference:values.reference
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        setUpdate(false);
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
      });
  };
  const handlechangeStateProlongation = (state) => {
    dispatch(
      updateProlongation({
        id: caution.prolongations[0].id,
        caution_id: caution.prolongations[0].caution_id,
        etat_id:state,
        duree:caution.prolongations[0].duree,
        reference:caution.prolongations[0].reference
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        setUpdate(false);
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
      });
  };
  useEffect(() => {
    form.setFields([
      {
        name: ["reference"],
        value: caution.prolongations[0].reference,
      },
      {
        name: ["duree"],
        value: caution.prolongations[0].duree,
      },
      {
        name: ["debutProl"],
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
      {
        name: ["a_faire_avant"],
        value: moment(
          moment(
            moment(
              caution.created_at.substring(0, 10),
              "YYYY-MM-DD"
            ).valueOf() +
              86400000 * caution.period_valid -
              170000000
          ).format("DD/MM/YYYY"),
          "DD/MM/YYYY"
        ),
      },
    ]);
  }, []);
  return (
    <div>
      <Title level={4} style={{ color: "#3498DB" }}>
        Demande de prolongation
      </Title>
      <Form
        form={form}
        layout="vertical"
        hideRequiredMark
        onFinish={handleUpdate}
        disabled={!update}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="reference"
              label="Référence demande"
              rules={[
                {
                  required: true,
                  message: "Please choose the approver",
                },
              ]}
            >
              <Input placeholder="Veuillez entrer la référence de prolongation" />
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
                placeholder="Veuillez entrer la durée de prolongation"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="debutProl" label="Début prolongation">
              <DatePicker
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
                disabled
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
                  message: "Please choose the approver",
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} format={"DD/MM/YYYY"} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="files"
              label="Attachements"
              //   rules={[
              //     {
              //       required: true,
              //       message: 'Please choose the type',
              //     },
              //   ]}
            >
              <Dragger
                {...props}
                listType="picture-card"
                style={{ display: !update ? "none" : "block" }}
              >
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
            {caution.prolongations[0].etat_id === 1 &&
              localStorage.getItem("role") === "commerciale" && (
                <Button className="btnModofier" onClick={() => setUpdate(true)}>
                  Modifier
                </Button>
              )}
            {caution.prolongations[0].etat_id === 1 &&
              localStorage.getItem("role") === "chef" && (
                <Space>
                  <Button
                    onClick={() => {
                      handlechangeStateProlongation(2);
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
                      handlechangeStateProlongation(3);
                    }}
                    type="primary"
                  >
                    Approuver
                  </Button>
                </Space>
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProlongationForm;
