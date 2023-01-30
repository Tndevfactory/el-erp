import React, { useState } from "react";
import {
  Modal,
  Button,
  Divider,
  Input,
  Form,
  Avatar,
  Tooltip,
  Checkbox,
  Slider,
  Upload,
  DatePicker,
  Dropdown,
  Menu,
  Popconfirm,
  message,
  Space,
  Row,
  Col,
  Typography,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  UserDeleteOutlined,
  UserAddOutlined,
  InboxOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { HiOutlineArchive } from "react-icons/hi";
import moment from "moment";
import type { UploadProps } from "antd";
import ChatGroup from "../../kanbanSideMenu/ChatGroup";
import TaskTimesheet from "./TaskTimesheet";
import TaskComments from "./TaskComments";
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
const { Title, Paragraph } = Typography;
const { Dragger } = Upload;
const dateFormat = 'DD-MM-YYYY';
const timesheet= [
  {
    id: 2,
    employe:"Wael Machlouch",
    photo:"https://xsgames.co/randomusers/avatar.php?g=male",
    projet: "ERP",
    tache: "Gestion de cautions",
    titre: "Affichage de cautions",
    detail:null,
    typeTache: "développement",
    nbrHeures: 4,
    date: "29/10/2022",
  },
  {
    id: 3,
    employe:"Wael Machlouch",
    photo:"https://xsgames.co/randomusers/avatar.php?g=female",
    projet: "ERP",
    tache: "Gestion de cautions",
    titre: "Creation de cautions",
    detail:"Creation de cautions...",
    typeTache: "Test",
    nbrHeures: 2,
    date: "30/10/2022",
  },
  {
    id: 5,
    employe:"Bassem Soua",
    photo:"https://xsgames.co/randomusers/avatar.php?g=male",
    projet: "ERP",
    tache: "Gestion de cautions",
    titre: "Réunion",
    detail:null,
    typeTache: "Réunion",
    nbrHeures: 1,
    date: "29/10/2022",
  },
]
const props: UploadProps = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange({ file, fileList }) {
    if (file.status !== "uploading") {
      console.log(file, fileList);
    }
  },
  defaultFileList: [
    {
      uid: "1",
      name: "xxx.png",
      status: "done",
      response: "Server Error 500",
      url: "http://www.baidu.com/xxx.png",
    },
    {
      uid: "2",
      name: "yyy.png",
      status: "done",
      url: "http://www.baidu.com/yyy.png",
    },
  ],
  showUploadList: {
    showDownloadIcon: true,
    downloadIcon: "Download",
    showRemoveIcon: true,
    //   removeIcon: <StarOutlined onClick={e => console.log(e, 'custom removeIcon event')} />,
  },
};
const TaskModal = ({ isTaskModalOpen, setIsTaskModalOpen, task }) => {
  const [ellipsis, setEllipsis] = useState(true);

  const menu = (
    <Menu style={{ width: "115%" }}>
      {[
        "Wael Machlouch",
        "Bassem Soua",
        "Ons Khzemi",
        "Emna Ahmadi",
        "Hassen Ben Abdelhafidh",
      ].map((employe) => (
        <Menu.Item key={employe}>
          {employe}
          {["Wael Machlouch", "Hassen Ben Abdelhafidh"].filter(
            (element) => element === employe
          ).length ? (
            <Tooltip title="Delete member">
              <UserDeleteOutlined
                style={{
                  color: "red",
                  position: "absolute",
                  right: "10px",
                  marginTop: "4px",
                  cursor: "pointer",
                }}
                onClick={() => {}}
              ></UserDeleteOutlined>
            </Tooltip>
          ) : (
            <Tooltip title="Add member">
              <UserAddOutlined
                style={{
                  color: "green",
                  position: "absolute",
                  right: "10px",
                  marginTop: "4px",
                  cursor: "pointer",
                }}
                onClick={() => {}}
              ></UserAddOutlined>
            </Tooltip>
          )}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Modal
      open={isTaskModalOpen}
      onOk={() => setIsTaskModalOpen(false)}
      onCancel={() => setIsTaskModalOpen(false)}
      width={900}
      footer={null}
      title={
        <Space size="large">
          <Title level={5}>
            {task.title}
            <Tooltip title="Edit task Title">
              <EditOutlined
                style={{
                  marginLeft: "5px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
                onClick={() => {}}
              ></EditOutlined>
            </Tooltip>
          </Title>
          <RangePicker
            style={{
              borderRadius: "15px",
              width: "250px",
            }}
            defaultValue={[dayjs(task.dateD, dateFormat), dayjs(task.dateF, dateFormat)]}
            format={dateFormat}
            allowClear={false}
            onChange={(value, dateString) => {}}
          />
          <Tooltip title="Archive task">
            <Popconfirm
              title="Are you sure to archive this task?"
              onConfirm={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <div>
                <Button
                  shape="circle"
                  icon={<HiOutlineArchive style={{ width: "100%" }} />}
                ></Button>
              </div>
            </Popconfirm>
          </Tooltip>
        </Space>
      }
    >
      <Row gutter={[24,16]}>
        <Col xs={24} md={13} lg={13} xl={13} xxl={13}>
          <Space size="large" direction="vertical">
            <div>
              <Title level={5}>Description</Title>
              {task.description && (
                <Paragraph
                  ellipsis={
                    ellipsis
                      ? { rows: 2, expandable: true, symbol: "more" }
                      : false
                  }
                >
                  {task.description}
                  <Tooltip title="Edit description">
                    <EditOutlined
                      style={{
                        marginLeft: "5px",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                      onClick={() => {}}
                    ></EditOutlined>
                  </Tooltip>
                </Paragraph>
              )}
            </div>
            
              <TaskTimesheet detail={timesheet}/>
            
            <div>
              <Title level={5}>Attachements</Title>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p>
                  Cliquez ou faites glisser le fichier dans cette zone pour le
                  télécharger
                </p>
              </Dragger>
            </div>
          </Space>
        </Col>
        <Col xs={0} md={1} lg={1} xl={1} xxl={1}>
          <Divider type="vertical" plain style={{ height: "100%" }} />
        </Col>
        <Col xs={24} md={10} lg={10} xl={10} xxl={10}>
          <Space size="large" direction="vertical" style={{ width: "100%" }}>
            <div>
              <Title level={5}>Membres</Title>
              <Space size={0}>
                <Avatar.Group maxCount={5}>
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=male" />
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=female" />
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=male" />
                </Avatar.Group>
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  placement="bottomLeft"
                  arrow
                >
                  <Tooltip title="add Member">
                    <Button
                      shape="circle"
                      style={{
                        background: "#E5E7E9",
                        borderColor: "#E5E7E9",
                        marginBottom: "3px",
                      }}
                      icon={<EditOutlined style={{ width: "100%" }} />}
                    ></Button>
                  </Tooltip>
                </Dropdown>
              </Space>
            </div>
            <TaskComments/>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

export default TaskModal;
