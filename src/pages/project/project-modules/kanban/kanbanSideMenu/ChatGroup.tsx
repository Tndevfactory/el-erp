import React,{ useState, useCallback, useRef, useEffect } from "react";
import {
  Comment,
  Tooltip,
  List,
  Input,
  Button,
  Avatar,
  Empty,
  Form,
  Drawer,
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
      visible={visible}
    >
      <div>
            <Empty
              description={"No message"}
            />
          <Form
            className="form"
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
            <div style={{ display: "flex" }}>
              <Avatar src="https://joeschmoe.io/api/v1/2" />
              <Form.Item
                style={{
                  marginLeft: "10px",
                  marginRight: "5px",
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
              <Tooltip title="send">
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="circle"
                  icon={<SendOutlined style={{ marginLeft: "3px" }} />}
                />
              </Tooltip>
            </div>
          </Form>
      </div>
    </Drawer>
  );
};

export default ChatGroup;
