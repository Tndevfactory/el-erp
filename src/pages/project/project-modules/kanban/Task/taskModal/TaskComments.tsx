import React, { useEffect } from "react";
import { Avatar, Typography, Tooltip, Row, Col, Input, Button, Space, Empty } from "antd";
import { Comment } from '@ant-design/compatible';
import {
    SendOutlined,
  } from "@ant-design/icons";
const { Title } = Typography
const TaskComments = () => {
    useEffect(()=>{
        // var TaskCommentsHeight = document.getElementById('TaskComments').clientHeight;
        // var TaskCommentsInputHeight = document.getElementById('TaskCommentsInput').clientHeight;
        // var TaskCommentsScrollZone = document.getElementById("TaskCommentsScrollZone");
        // TaskCommentsScrollZone.style.height = (TaskCommentsHeight-TaskCommentsInputHeight).toString+"px";
        // console.log((TaskCommentsHeight-TaskCommentsInputHeight).toString+"px")
        // TaskCommentsScrollZone.scrollTop = TaskCommentsScrollZone.scrollHeight;

    },[])
  return (
    <div className="TaskComments" id="TaskComments">
      <Space direction="vertical" style={{width:'100%'}}>
      <Title level={5}>Commentaires</Title>
      {/* <br/><br/><br/><Empty description={"Aucun Message"}/> */}
      <div className="TaskCommentsScrollZone" id="TaskCommentsScrollZone">
        <Comment
          // actions={actions}
          author={<a>Wael Machlouch</a>}
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
          author={<a>Wael Machlouch</a>}
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
      </div>
      <Row
        gutter={24}
        style={{ position: "absolute", bottom: "0px", width: "100%" }}
        id="TaskCommentsInput"
      >
        <Col span={3}>
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=male" />
        </Col>
        <Col span={18} style={{ paddingRight: "0px" }}>
          <Input placeholder="Message..." style={{ borderRadius: "15px" }} />
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

export default TaskComments;
