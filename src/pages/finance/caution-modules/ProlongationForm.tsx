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
const { Dragger } = Upload
const { Title } = Typography
const ProlongationForm: React.FC<{
  setProlongation: React.Dispatch<React.SetStateAction<boolean>>,
  caution: ICaution
}> = ({ setProlongation, caution }) => {
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
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
      });
  };
  useEffect(()=>{

  },[])
  return (
    <div>
      <Title level={4} style={{ color: '#3498DB' }}>
        Demande de prolongation
      </Title>
      <Form form={form} layout="vertical" hideRequiredMark onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="reference" label="Référence demande">
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
            <Form.Item name="reference" label="Début prolongation">
            <DatePicker
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
                disabled
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="duree"
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
