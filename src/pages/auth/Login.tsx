import {
  AlipayOutlined,
  GoogleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
  WindowsOutlined
} from "@ant-design/icons";
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Divider, message, Space, Tabs, Typography } from "antd";
import type { CSSProperties } from "react";
import { useState } from "react";
import elasticLogo from "@/assets/elastic-logo.png";
import image from "@/assets/preview/ERP-3.png";
import { useNavigate } from 'react-router-dom'
const { Text, Link } = Typography;
type LoginType = "phone" | "account";

const iconStyles: CSSProperties = {
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "18px",
  verticalAlign: "middle",
  cursor: "pointer",
};

export default () => {
  const navigate = useNavigate()
  const [loginType, setLoginType] = useState<LoginType>("account");
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      <LoginFormPage
        backgroundImageUrl={image}
        logo={elasticLogo}
        title="EL-ERP"
        subTitle={<Text type="secondary" >Bienvenue dans la gestion moderne du travail</Text>}
        onFinish={async (values) => { console.log(values);   navigate(`/finance`)}}
        actions={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Divider plain>
              <span
                style={{ color: "#CCC", fontWeight: "normal", fontSize: 14 }}
              >
                ou
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 40,
                  width: 40,
                  border: "1px solid #D4D8DD",
                  borderRadius: "50%",
                }}
              >
                <GoogleOutlined  style={{ ...iconStyles, color: "#1677FF" }} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 40,
                  width: 40,
                  border: "1px solid #D4D8DD",
                  borderRadius: "50%",
                }}
              >
                <WindowsOutlined style={{ ...iconStyles, color: "#FF6A10" }} />
              </div>
            </Space>
          </div>
        }
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={"account"} tab={"Se connecter"} />
        </Tabs>
        {loginType === "account" && (
          <>
            <ProFormText
              name=" username "
              fieldProps={{
                size: "large",
                prefix: <UserOutlined />,
              }}
              placeholder={"E-mail"}

            />
            <ProFormText.Password
              name=" password "
              fieldProps={{
                size: "large",
                prefix: <LockOutlined />,
              }}
              placeholder={"Mot de passe "}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name=" autoLogin ">
          souviens de moi
          </ProFormCheckbox>
          <Link href="#" target="_blank"
            style={{
              float: "right",
            }}
          >
            Mot de passe oublié
          </Link>{" "}
        </div>
      </LoginFormPage>
    </div>
  );
};
