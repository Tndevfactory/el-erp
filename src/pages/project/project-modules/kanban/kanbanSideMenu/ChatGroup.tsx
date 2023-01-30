import React,{ useState, useCallback, useRef, useEffect } from "react";
import {
  Tooltip,
  List,
  Input,
  Button,
  Avatar,
  Empty,
  Form,
  Drawer,
  Row,
  Col
} from "antd";
import moment from "moment";
import { SendOutlined } from "@ant-design/icons";
const ChatGroup = ({ setVisible, visible }) => {
  const token = localStorage.getItem("token");
  const [form] = Form.useForm();
  const [messages, setMessages] = useState([]);
  const [avatar, setAvatar] = useState();
  useEffect(() => {
  }, []);
  return (
    <Drawer
      className="ChatGroupe"
      title={"Groupe de discussion"}
      placement="right"
      onClose={() => {
        setVisible(false);
      }}
      open={visible}
    >
      <div>
            <Empty
              description={"No message"}
            />
          <Form
            className="absolute bottom-1 w-11/12"
            form={form}
            // onFinish={(values) => {
            //   let data = {
            //     message: values.message,
            //     project_id: id,
            //     user_id: localStorage.getItem("user_id"),
            //     date: moment().format("YYYY-MM-DD HH:mm:ss"),
            //   };
            // }}
            autoComplete="off"
          >
            <Row className="w-full" gutter={16}> 
              <Col span={2}>
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=male" size="default" />
              </Col>
              <Col span={20}>
              <Form.Item
                style={{
                  marginLeft: "3px",
                  width: "100%",
                }}
                name="message"
                rules={[
                  {
                    required: true,
                    message: "Please enter a message!",
                  },
                ]}
              >
                <Input
                  placeholder="Message..."
                  style={{ borderRadius: "15px" }}
                />
              </Form.Item>
              </Col>
              <Col span={2}>
              <Tooltip title="send">
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="circle"
                  icon={<SendOutlined style={{ marginLeft: "3px" }} />}
                />
              </Tooltip>
              </Col>
            </Row>
          </Form>
      </div>
    </Drawer>
  );
};

export default ChatGroup;
