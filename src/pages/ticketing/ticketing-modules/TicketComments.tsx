import React, { useEffect, useRef } from "react";
import { Avatar, Typography, Tooltip, Row, Col, Input, Button, Space, Empty, Mentions } from "antd";
import "@/style/modules/Ticketing.less"
import { Comment } from '@ant-design/compatible';
import {
    SendOutlined,
  } from "@ant-design/icons";
const { Title } = Typography
const TicketComments = ({visible}) => {
  const commentsEndRef = useRef(null)
    useEffect(()=>{
      commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    },[visible])
  return (
    <div className="TicketComments" id="TicketComments">
      <Space direction="vertical" style={{width:'101%'}}>
      {/* <br/><br/><br/><Empty description={"Aucun Message"}/> */}
      <div className="TicketCommentsScrollZone" id="TicketCommentsScrollZone">
        <Comment
          // actions={actions}
          author={<a>Emna Ahmadi</a>}
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=female" alt="Han Solo" />}
          content={
            <p>
              We supply a series of design principles,
            </p>
          }
          datetime={
            <Tooltip title="2022-11-09 11:22:33">
              <span>7 hours ago</span>
            </Tooltip>
          }
        />
        <Comment
          // actions={actions}
          author={<a>Bassem Soua</a>}
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=male" alt="Han Solo" />}
          content={
            <p>
              To help people.
            </p>
          }
          datetime={
            <Tooltip title="2022-10-22 11:22:33">
              <span>8 hours ago</span>
            </Tooltip>
          }
        />
                <Comment
          // actions={actions}
          author={<a>Emna Ahmadi</a>}
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=female" alt="Han Solo" />}
          content={
            <p>
              We supply a series of design principles,
            </p>
          }
          datetime={
            <Tooltip title="2022-11-09 11:22:33">
              <span>7 hours ago</span>
            </Tooltip>
          }
        />

        <Comment
          // actions={actions}
          author={<a>Bassem Soua</a>}
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=male" alt="Han Solo" />}
          content={
            <p>
              To help people.
            </p>
          }
          datetime={
            <Tooltip title="2022-10-22 11:22:33">
              <span>6 hours ago</span>
            </Tooltip>
          }
        />
                <Comment
          // actions={actions}
          author={<a>Bassem Soua</a>}
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=male" alt="Han Solo" />}
          content={
            <p>
              To help people.
            </p>
          }
          datetime={
            <Tooltip title="2022-10-22 11:22:33">
              <span>6 hours ago</span>
            </Tooltip>
          }
        />
        <div ref={commentsEndRef} />
      </div>
      <Row
        gutter={24}
        // style={{ position: "absolute", bottom: "15px", width: "100%" }}
        id="TicketCommentsInput"
      >
        <Col span={2}>
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=male" />
        </Col>
        <Col span={19} style={{ paddingRight: "0px" }}>
          <Mentions placeholder="Message..." style={{ borderRadius: "15px" }}
            //  options={[
            //   {
            //     value: 'afc163',
            //     label: 'afc163',
            //   },
            //   {
            //     value: 'zombieJ',
            //     label: 'zombieJ',
            //   },
            //   {
            //     value: 'yesmeck',
            //     label: 'yesmeck',
            //   },
            // ]} 
            />
        </Col>
        <Col span={3}>
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
      </Space>
    </div>
  );
};

export default TicketComments;
