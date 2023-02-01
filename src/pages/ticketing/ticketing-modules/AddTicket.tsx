import React, { useState } from "react";
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
  UploadProps,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import moment from "moment";
import { employees, priorites, types } from "./Ticketing";
const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;
const AddTicket = ({ visible, setVisible, tickets, setTickets, tableRef }) => {
  const [form] = Form.useForm();
  var { windowWidth } = useSelector((store: any) => store.ui);
  const onClose = () => {
    setVisible(false);
    form.resetFields()
  };
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
  return (
    <Drawer
      title="Ouvrir un nouveau Ticket"
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
        onFinish={(values) => {setTickets([{
          titre:values.titre,
          description:values.description,
          responsable:"Bassem Soua",
          assigne_a:values.assigne_a,
          date:moment().format('DD-MM-YYYY'),
          etat:0,
          priorite:values.priorite,
          type:values.type
        },...tickets])
        onClose()
        tableRef.current.reload()
      }}
        onReset={() => {}}
        form={form}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="titre"
              label="Titre"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="Titre"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="type"
              label="Type "
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Choisir Type"
                showSearch
                filterOption={filterOption}
                filterSort={filterSort}
                onChange={(e) => {}}
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
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Choisir Priorité"
                showSearch
                filterOption={filterOption}
                filterSort={filterSort}
                onChange={(e) => {}}
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
        // mode="multiple"
        allowClear
        showSearch
        filterOption={filterOption}
        filterSort={filterSort}
        onChange={(e) => {
        }}
        placeholder="Choisir des employées"
        disabled
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
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea
                placeholder="Veuillez choisir le client"
                autoSize={{minRows: 3}}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="files" label="Attachements">
              <Dragger {...props} multiple listType="picture-card">
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
          <Col span={24}>
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
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default AddTicket;
