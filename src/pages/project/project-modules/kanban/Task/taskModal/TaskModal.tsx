import React from "react";
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
} from "@ant-design/icons";
import { HiOutlineArchive } from "react-icons/hi";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Title } = Typography
const TaskModal = ({ isTaskModalOpen, setIsTaskModalOpen, task }) => {
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
                className="updateDescIcon"
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
            //   disabled={isEmployee}
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
              <div className="btn-archive">
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
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Col>
        <Col span={1}>
          <Divider type="vertical" plain style={{ height: "100%" }} />
        </Col>
        <Col span={10}>
          
          <Space>
            <Avatar.Group maxCount={5}>
              <Avatar src="https://joeschmoe.io/api/v1/2" />
              <Avatar src="https://joeschmoe.io/api/v1/1" />
              <Avatar src="https://joeschmoe.io/api/v1/7" />
              <Avatar src="https://joeschmoe.io/api/v1/3" />
            </Avatar.Group>
            {/* <Dropdown overlay={menu} trigger={["click"]} placement="bottom"> */}
                  <Tooltip title="add Member">
                  <Button
                  shape="circle"
                  style={{background:"#E5E7E9", borderColor:"#E5E7E9"}}
                  icon={<EditOutlined style={{ width: "100%" }} />}
                ></Button>
                      
                  </Tooltip>
                {/* </Dropdown> */}
          </Space>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Col>
      </Row>
    </Modal>
  );
};

export default TaskModal;
