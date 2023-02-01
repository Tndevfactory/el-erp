import React, { useEffect, useRef, useState } from "react";
import { Avatar, Typography, Tooltip, Row, Col, Input, Button, Space, Empty, Mentions, Form } from "antd";
import "@/style/modules/Ticketing.less"
import { Comment } from '@ant-design/compatible';
import {
    SendOutlined,
  } from "@ant-design/icons";
const { Title } = Typography
const data=[
  {
    user:"Emna Ahmadi",
    comment:"We supply a series of design principles",
    date:"2022-11-09 11:22:33",
    image:"https://xsgames.co/randomusers/avatar.php?g=female"
  },
  {
    user:"Bassem Soua",
    comment:"To help people",
    date:"2022-11-09 11:25:35",
    image:"https://xsgames.co/randomusers/avatar.php?g=male"
  },
  {
    user:"Emna Ahmadi",
    comment:"We supply a series of design principles",
    date:"2022-11-09 11:22:33",
    image:"https://xsgames.co/randomusers/avatar.php?g=female"
  },
  {
    user:"Bassem Soua",
    comment:"To help people",
    date:"2022-11-09 11:25:35",
    image:"https://xsgames.co/randomusers/avatar.php?g=male"
  },
  {
    user:"Emna Ahmadi",
    comment:"We supply a series of design principles",
    date:"2022-11-09 11:22:33",
    image:"https://xsgames.co/randomusers/avatar.php?g=female"
  }

]
const TicketComments = ({visible}) => {
  const commentsEndRef = useRef(null)
  const [form] = Form.useForm()
  const [comments, setComments] = useState(data)
  const handleSendMessage =(values)=>{
    setComments([...comments, {
      user:"Bassem Soua",
      comment:values.message,
      image:"https://xsgames.co/randomusers/avatar.php?g=male",
      date:"2022-11-09 11:22:33",
    }])
    form.resetFields()
    setTimeout(() => {
      commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 200);
  }
    useEffect(()=>{
      commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    },[visible])
  return (
    <div className="TicketComments" id="TicketComments">
      <Space direction="vertical" style={{width:'101%'}}>
      {/* <br/><br/><br/><Empty description={"Aucun Message"}/> */}
      <div className="TicketCommentsScrollZone" id="TicketCommentsScrollZone">
        {comments.map(item =>         
          <Comment
          // actions={actions}
          author={<a>{item.user}</a>}
          avatar={<Avatar src={item.image} alt="Han Solo" />}
          content={
            <p>
              {item.comment}
            </p>
          }
          datetime={
            <Tooltip title={item.date}>
              <span>7 hours ago</span>
            </Tooltip>
          }
          />
        )}

        <div ref={commentsEndRef} />
      </div>
      <Form form={form} onFinish={handleSendMessage}>
      <Row
        gutter={24}
        // style={{ position: "absolute", bottom: "15px", width: "100%" }}
        id="TicketCommentsInput"
      >
        <Col span={2}>
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=male" />
        </Col>
        <Col span={19} style={{ paddingRight: "0px" }}>
          <Form.Item name="message">
          <Mentions placeholder="Message..." style={{ borderRadius: "15px" }} 
              options={[
                {
                  value:"Wael_Machlouch",
                  label:"Wael Machlouch"
                },
                {
                  value:"Nidhal_chalbia",
                  label:"Nidhal chalbia"
                },
                {
                  value:"Mohamed_Chawki",
                  label:"Mohamed Chawki"
                },
                {
                  value:"Emna_Ahmadi",
                  label:"Emna Ahmadi"
                },
              ]}/>
            </Form.Item>
        </Col>
        <Col span={3}>
        <Form.Item>
          <Tooltip title="send">
            <Button
              type="primary"
              htmlType="submit"
              shape="circle"
              icon={<SendOutlined style={{ marginLeft: "3px" }} />}
            />
          </Tooltip>
          </Form.Item>
        </Col>
      </Row>
      </Form>
      </Space>
    </div>
  );
};

export default TicketComments;
