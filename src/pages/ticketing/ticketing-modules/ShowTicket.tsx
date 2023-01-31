import React, { useEffect, useState } from 'react'
import {
  Drawer,
  Button,
  Card,
  Space,
  Tag,
  Typography,
  Form,
  Row,
  Col,
  Select,
  Upload,
  Input,
  Divider,
  UploadProps,
  UploadFile
} from "antd";
import { employees, priorites, types } from "./Ticketing";
import { InboxOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import TicketComments from './TicketComments';
const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;
const ShowTicket = ({visible, setVisible, ticket}) => {
  const [form] = Form.useForm();
    var { windowWidth } = useSelector((store: any) => store.ui);
    const [fields, setFields] = useState([])
    const onClose = () => {
        setVisible(false);
      };
        //upload files
        const [fileList, setFileList] = useState<UploadFile[]>([
          {
            uid: '0',
            name: 'conception_module_caution.png',
            url: 'https://www.linkpicture.com/q/caution_3.png',
            status: 'done',
          },
          // {
          //   uid: '1',
          //   name: 'avis_de_caution.png',
          //   status: 'done',
          // },
        ])
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      console.log(file);
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  //select search and sort
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const filterSort = (optionA, optionB) =>
    (optionA?.label ?? "")
      .toLowerCase()
      .localeCompare((optionB?.label ?? "").toLowerCase());
      useEffect(()=>{
        setFields([
          {
            name: ['titre'],
            value: ticket.titre,
          },
          {
            name: ['type'],
            value: ticket.type,
          },
          {
            name: ['priorite'],
            value: ticket.priorite,
          },
          {
            name: ['description'],
            value: ticket.description,
          },
          {
            name: ['assigne_a'],
            value: [1,0],
          },
        ])
      },[visible])
  return (
    <Drawer
    title="Détail du Ticket"
    width={windowWidth > 750 ? 720 : "90%"}
    className="CautionForm"
    onClose={onClose}
    open={visible}
    bodyStyle={{
      paddingBottom: 80,
    }}
    extra={
      <Space>
        {ticket.etat===1&&<Button type="primary" onClick={onClose}>
          Ticket Résolut
        </Button>}
        {ticket.etat===2&&<Button type="primary" onClick={onClose}>
        Ticket Fermer 
        </Button>}
      </Space>
    }
    >
              <Form
        layout="vertical"
        hideRequiredMark
        onFinish={() => {}}
        onReset={() => {}}
        form={form}
        fields={fields}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="titre"
              label="Titre"
              // rules={[
              //   {
              //     required: true,
              //   },
              // ]}
              
            >
              <Input
                placeholder="Titre"
                disabled
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="type"
              label="Type "
              // rules={[
              //   {
              //     required: true,
              //   },
              // ]}
            >
              <Select
                placeholder="Choisir Type"
                showSearch
                filterOption={filterOption}
                filterSort={filterSort}
                onChange={(e) => {}}
                disabled
              >
                {types
                  .map((item) => (
                    <Option
                      key={item.key}
                      value={item.key}
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
              name="priorite"
              label="Priorité"
              // rules={[
              //   {
              //     required: true,
              //   },
              // ]}
            >
              <Select
                placeholder="Choisir Priorité"
                showSearch
                filterOption={filterOption}
                filterSort={filterSort}
                onChange={(e) => {}}
                disabled
              >
                {priorites.map((item) => (
                  <Option key={item.key} value={item.key} label={item.designation}>
                    {item.designation}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Assigné à"
              name="assigne_a"
            >
       <Select
        mode="multiple"
        allowClear={false}
        showSearch
        filterOption={filterOption}
        filterSort={filterSort}
        onChange={(e) => {
        }}
      >
        {employees.map((item) => (
          <Option key={item.key} value={item.key} label={item.designation}>
            {item.designation}
          </Option>
        ))}
      </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item
              name="description"
              label="Description"
            >
              <TextArea
                placeholder="Veuillez choisir le client"
                autoSize={{minRows: 2}}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="files" label="Attachements">
              <Dragger {...props} multiple listType="picture-card" style={{ display:'none' }} 
              showUploadList={{showRemoveIcon:false}}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Cliquez ou faites glisser les fichiers dans cette zone pour
                  les télécharger
                </p>
                <p className="ant-upload-hint">
                  Merci d'attacher vos fichiers
                </p>
              </Dragger>
            </Form.Item>
          </Col>
          {/* <Col span={24}>
            <Form.Item style={{ textAlign: "right" }}>
              <Space>
                <Button
                  htmlType="reset"
                  onClick={() => {}}
                >
                  Annuler
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  onClick={() => {}}
                >
                  Envoyer
                </Button>
              </Space>
            </Form.Item>
          </Col> */}
        </Row>
      </Form>
      <Divider>Commentaires</Divider>
      <TicketComments visible={visible} />
    </Drawer>
  )
}

export default ShowTicket