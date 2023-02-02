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
import { useDispatch } from "react-redux";
import { Button, Divider, message, Space, Tabs, Typography, Alert } from "antd";
import type { CSSProperties } from "react";
import { useState } from "react";
import elasticLogo from "@/assets/elastic-logo.png";
import image from "@/assets/preview/ERP-3.png";
import { useNavigate } from 'react-router-dom'
import { login } from "@/features/auth/authSlice";
import { getMenus } from "@/features/menus/menuSlice";
const { Text, Link } = Typography;
type LoginType = "phone" | "account";

const iconStyles: CSSProperties = {
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "18px",
  verticalAlign: "middle",
  cursor: "pointer",
};

export default () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [loginType, setLoginType] = useState<LoginType>("account");
  const [alert, setAlert] = useState(false)
  const handleAlert=()=>{
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
    }, 8000);
  }
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
        onFinish={async (values) => { 
          dispatch(login({
            email:values[' username '],
            password:values[' password ']
          })
          )
          .unwrap()
          .then((originalPromiseResult) => {
            localStorage.setItem('token',originalPromiseResult.data.token)
            localStorage.setItem('permissions',JSON.stringify(originalPromiseResult.data.permissions))
            localStorage.setItem('module','2')
            dispatch(getMenus())
            .unwrap()
            .then((originalPromiseResult) => {
              localStorage.setItem('menu',JSON.stringify(originalPromiseResult))
              navigate(`/projets`)
            })
            .catch((rejectedValueOrSerializedError) => {
              console.log(rejectedValueOrSerializedError);
            });

          })
          .catch((rejectedValueOrSerializedError) => {
            handleAlert()
            console.log(rejectedValueOrSerializedError);
            return [];
          });
        }}
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
          <Tabs.TabPane key={"account"} tab={"Se connecter"} disabled />
        </Tabs>
        {loginType === "account" && (
          <>
              {alert&&<Alert message={<>E-mail ou mot de passe incorrect</>} type="error" className="mb-5" />}
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
