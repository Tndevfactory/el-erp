import React, { useEffect, useState } from "react";
import { Drawer, Statistic, Progress, Timeline, Card, Tooltip } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
const Statistics = ({ setVisible, visible }) => {
  let [stat, setStat] = useState();
  const getColor = (percent) => {
    if (percent >= 90) {
      return "#52BE80";
    } else if (percent >= 70) {
      return "#58D68D";
    } else if (percent >= 50) {
      return "#F4D03F";
    } else if (percent >= 30) {
      return "#F5B041";
    } else if (percent >= 15) {
      return "#EC7063";
    } else {
      return "#E74C3C";
    }
  };
  useEffect(() => {
  }, []);
  return (
    <Drawer
      title={"Statistiques du projet"}
      placement="right"
      onClose={() => {
        setVisible(false);
      }}
      open={visible}
      className="Statistics"
    >
          <div style={{ display: "flex", marginBottom: "50px" }}>
            <div style={{ width: "50%", textAlign: "center", display: "grid" }}>
              <span style={{ fontWeight: "bold" }}>Jours restants</span>
              <Progress
                width={100}
                type="circle"
                // percent={parseInt(stat.daysLeftPercent)}
                // strokeColor={getColor(stat.daysLeftPercent)}
                // format={() => `${stat.daysLeft} Days`}
                style={{ marginTop: "10px" }}
              />
            </div>
            <div style={{ width: "50%", textAlign: "center" }}>
              <span style={{ fontWeight: "bold" }}>Avancement du projet</span>
              <Progress
                width={100}
                type="circle"
                // percent={parseInt(stat.progress)}
                // strokeColor={getColor(stat.progress)}
                style={{ marginTop: "10px" }}
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%", textAlign: "center" }}>
              <span style={{ fontWeight: "bold" }}>Avance</span>
            </div>
            <div style={{ width: "50%", textAlign: "center" }}>
              <span style={{ fontWeight: "bold" }}>
              Estimation des jours restants
              </span>
            </div>
          </div>
          <div style={{ display: "flex", marginBottom: "50px" }}>
            <div style={{ width: "50%", textAlign: "center" }}>
              <Card className="statCard">
                <Statistic
                //   title="Active"
                //   value={Math.abs(stat.advance)}
                  precision={2}
                //   valueStyle={
                //     stat.advance >= 0
                //       ? { color: "#3f8600" }
                //       : { color: "#E74C3C" }
                //   }
                //   prefix={
                //     stat.advance >= 0 ? (
                //       <ArrowUpOutlined />
                //     ) : (
                //       <ArrowDownOutlined />
                //     )
                //   }
                  suffix="%"
                />
              </Card>
            </div>
            <div style={{ width: "50%", textAlign: "center" }}>
              <Card className="statCard">
                <Statistic
                //   value={parseInt(stat.estimatedDays)}
                //   valueStyle={
                //     stat.estimatedDays <= stat.daysLeft
                //       ? { color: "#3f8600" }
                //       : { color: "#E74C3C" }
                //   }
                  suffix="days"
                />
              </Card>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>

            <span style={{ fontWeight: "bold" }}>project timeline </span>
            <Timeline
              mode="left"
            >
              {/* {stat.history.map((element, index) => (
                <Timeline.Item
                  key={index}
                  color="green"
                  label={
                    <Tooltip
                      title={moment(element.date).format("YYYY-MM-DD HH:mm:ss")}
                    >
                      {moment(element.date).format("YYYY-MM-DD")}
                    </Tooltip>
                  }
                >
                  {element.name}
                </Timeline.Item>
              ))} */}
            </Timeline>
          </div>
    </Drawer>
  );
};

export default Statistics;
