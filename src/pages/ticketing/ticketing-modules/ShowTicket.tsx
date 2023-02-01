import React, { useEffect, useState } from "react";
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
import TicketComments from "./TicketComments";
import { table } from "console";
const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;
const ShowTicket = ({ visible, setVisible, ticket, tickets, setTickets, tableRef }) => {
  const [form] = Form.useForm();
  var { windowWidth } = useSelector((store: any) => store.ui);
  const [fields, setFields] = useState([]);
  const onClose = () => {
    setVisible(false);
  };
  //upload files
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "0",
      name: "conception_module_caution.png",
      url: "https://www.linkpicture.com/q/caution_3.png",
      status: "done",
    },
    // {
    //   uid: '1',
    //   name: 'avis_de_caution.png',
    //   status: 'done',
    // },
  ]);
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

  const handleChangeState = (state) => {
    let temp=[]
    tickets.map((item)=>{
      if(item.ref===ticket.ref){
        temp=[...temp,{
            ref: ticket.ref,
            titre: ticket.titre,
            description: ticket.description,
            responsable: ticket.responsable,
            assigne_a: ticket.assigne_a,
            date: ticket.date,
            etat: state,
            priorite: ticket.priorite,
            type: ticket.type,
        }]
      }else{
        temp=[...temp,item]
      }
      setTickets(temp)
    })
  };
  const handleAffectTicket = (values) => {
    let temp=[]
    tickets.map((item)=>{
      if(item.ref===ticket.ref){
        temp=[...temp,{
            ref: ticket.ref,
            titre: ticket.titre,
            description: ticket.description,
            responsable: ticket.responsable,
            assigne_a: values.assigne_a,
            date: ticket.date,
            etat: 1,
            priorite: ticket.priorite,
            type: ticket.type,
        }]
      }else{
        temp=[...temp,item]
      }
      setTickets(temp)
      onClose(); 
      tableRef.current.reload()
    })
  };

  useEffect(() => {
    setFields([
      {
        name: ["titre"],
        value: ticket.titre,
      },
      {
        name: ["type"],
        value: ticket.type,
      },
      {
        name: ["priorite"],
        value: ticket.priorite,
      },
      {
        name: ["description"],
        value: ticket.description,
      },
      {
        name: ["assigne_a"],
        value: ticket.assigne_a,
      },
    ]);
  }, [visible]);
  return (
    <Drawer
      title="Détail du Ticket"
      width={windowWidth > 750 ? 720 : "90%"}
      className="showTicket"
      onClose={onClose}
      open={visible}
      bodyStyle={{
        paddingBottom: 80,
      }}
      extra={
        <Space>
          {/* {ticket.etat === 0 && (
            <Button type="primary" onClick={()=>{handleChangeState(1); onClose(); tableRef.current.reload()}}>
              Ticket Encours
            </Button>
          )} */}
          {ticket.etat === 1 && (
            <Button type="primary" onClick={()=>{handleChangeState(2); onClose(); tableRef.current.reload()}}>
              Ticket Résolut
            </Button>
          )}
          {ticket.etat === 2 && (
            <Button type="primary" onClick={()=>{handleChangeState(3); onClose(); tableRef.current.reload()}}>
              Ticket Fermer
            </Button>
          )}
        </Space>
      }
    >
      <Form
        layout="vertical"
        hideRequiredMark
        onFinish={handleAffectTicket}
        onReset={() => {}}
        form={form}
        fields={fields}
        // disabled
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
                {types.map((item) => (
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
            <Form.Item label="Assigné à" name="assigne_a"
            rules={[
                {
                  required: true,
                },
              ]}
              >
              <Select
                // mode="multiple"
                allowClear={false}
                showSearch
                filterOption={filterOption}
                filterSort={filterSort}
                onChange={(e) => {}}
                disabled={ticket.etat===0?false:true}
                placeholder="Assigné ticket à"
              >
                {employees.map((item) => (
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
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item name="description" label="Description">
              <TextArea
                placeholder="Veuillez choisir le client"
                autoSize={{ minRows: 2 }}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="files" label="Attachements">
              <Dragger
                {...props}
                multiple
                listType="picture-card"
                style={{ display: "none" }}
                showUploadList={{ showRemoveIcon: false }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Cliquez ou faites glisser les fichiers dans cette zone pour
                  les télécharger
                </p>
                <p className="ant-upload-hint">Merci d'attacher vos fichiers</p>
              </Dragger>
            </Form.Item>
          </Col>
          {ticket.etat===0&&<Col span={24}>
            <Form.Item style={{ textAlign: "right" }}>
              <Space>
                {/* <Button
                  htmlType="reset"
                  onClick={() => {}}
                >
                  Annuler
                </Button> */}
                <Button
                  htmlType="submit"
                  type="primary"
                >
                  Assigner
                </Button>
              </Space>
            </Form.Item>
          </Col> }
        </Row>
      </Form>
      {ticket.etat!==0&&
      <><Divider>Commentaires</Divider>
      <TicketComments visible={visible} /></>}
    </Drawer>
  );
};

export default ShowTicket;
