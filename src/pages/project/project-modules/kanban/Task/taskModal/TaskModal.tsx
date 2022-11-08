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
} from "@ant-design/icons";
import { HiOutlineArchive } from "react-icons/hi";
import moment from "moment";
import type { UploadProps } from "antd";

const { RangePicker } = DatePicker;
const { Title, Paragraph } = Typography;
const { Dragger } = Upload;

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
      width={800}
      footer={null}
      title={
        <Space size="large">
          <div>
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
          </div>
          <RangePicker
            style={{
              borderRadius: "15px",
              width: "250px",
            }}
            defaultValue={[
              moment(task.dateD, "DD-MM-YYYY"),
              moment(task.dateF, "DD-MM-YYYY"),
            ]}
            format={"DD-MM-YYYY"}
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
      <Row gutter={24}>
        <Col span={13}>
          <Space size="large" direction="vertical">
            <div>
              <Title level={5}>Description</Title>
              {task.description&&
              <Paragraph ellipsis={ellipsis ? { rows: 2, expandable: true, symbol: 'more' } : false}>
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
      </Paragraph>}
    
            </div>
            <div>
              <Title level={5}>TimeSheet</Title>
            </div>
            <div>
              <Title level={5}>Attachements</Title>

            </div>
          </Space>
        </Col>
        <Col span={1}>
          <Divider type="vertical" plain style={{ height: "100%" }} />
        </Col>
        <Col span={10}>
          <Space size="large" direction="vertical">
            <div>
              <Title level={5}>Membres</Title>
              <Space>
                <Avatar.Group maxCount={5}>
                  <Avatar src="https://joeschmoe.io/api/v1/2" />
                  <Avatar src="https://joeschmoe.io/api/v1/1" />
                  <Avatar src="https://joeschmoe.io/api/v1/7" />
                  <Avatar src="https://joeschmoe.io/api/v1/3" />
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
            <div>
              <Title level={5}>Commentaires</Title>
            </div>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

export default TaskModal;
