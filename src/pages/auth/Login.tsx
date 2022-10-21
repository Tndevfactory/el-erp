import { Col, Button, Row, Space, Checkbox, Form, Input } from "antd";
import React from "react";
import backgroundSaas from "../../assets/saas.svg";
import elasticLogo from "../../assets/elastic.jpg";

const styleLoginPage: React.CSSProperties = {
  height: "100vh",
  backgroundColor: "transparent",
};
const styleLoginRow: React.CSSProperties = {
  height: "100%",
  backgroundColor: "transparent",
};
const stylePhotoCol: React.CSSProperties = {
  height: "100%",
  background: " linear-gradient(to top, #c471f5 0%, #fa71cd 100%)",
};

const styleDivPhoto: React.CSSProperties = {
  height: "100%",
  backgroundImage: `url(${backgroundSaas})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "content",
  backgroundPosition: "50%",
};
const styleLoginCol: React.CSSProperties = {
  height: "100%",
  width: "100%",
  backgroundColor: "transparent",
};
const styleDivLogin: React.CSSProperties = {
  height: "100%",
  background: "transparent",
};

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const Login: React.FC = () => {
  return (
    <div style={styleLoginPage}>
      <Row style={styleLoginRow} gutter={{ xs: 0 }}>
        <Col xs={0} md={12} style={stylePhotoCol}>
          <div style={styleDivPhoto}></div>
        </Col>
        <Col xs={24} md={12} style={styleLoginCol}>
          <div style={styleDivLogin}>
            <Space
              direction="vertical"
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={elasticLogo} width="250" height="100" alt="" />
              <h2>Login</h2>
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{ offset: 8, span: 16 }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 13, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
