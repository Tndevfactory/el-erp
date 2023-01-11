import React, { useEffect, useState } from 'react'
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
} from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { InboxOutlined } from '@ant-design/icons'
import { createProlongation } from '@/features/finance/caution/prolongationCaution';
import { ICaution } from '@/features/finance/caution/cautionSlice';
import moment from 'moment';
const { Dragger } = Upload
const { Title } = Typography
const ProlongationForm: React.FC<{
  setProlongation: React.Dispatch<React.SetStateAction<boolean>>,
  caution: ICaution,
  handlechangeStateCaution:any
}> = ({ setProlongation, caution, handlechangeStateCaution }) => {
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [form] = Form.useForm();
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file])
      return false
    },
    fileList,
  }
  const handleSubmit = (values) => {
    dispatch(
      createProlongation({
        caution_id: caution.id,
        reference: values.reference,
        duree: values.duree,
        etat_id: 1
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        setProlongation(false)
        handlechangeStateCaution(8)
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
      });
  };
  useEffect(()=>{
    form.setFields([
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
    ])

  },[])
  return (
    <div>
      <Title level={4} style={{ color: '#3498DB' }}>
        Demande de prolongation
      </Title>
      <Form form={form} layout="vertical" hideRequiredMark onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="reference" label="Référence demande" rules={[
                {
                  required: true,
                  message: 'Please choose the approver',
                },
              ]}>
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
                  message: 'Please choose the approver',
                },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
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
                  message: 'Please choose the approver',
                },
              ]}
            >
                           <DatePicker
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
              />
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
          <Col span={24} style={{ textAlign: 'right' }}>
            <Form.Item>
              <Space>
                <Button htmlType="reset" onClick={() => setProlongation(false)}>
                  Annuler
                </Button>
                <Button
                  className="btnModofier"
                  htmlType="submit"
                  type="primary"
                >
                  Envoyer
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default ProlongationForm
