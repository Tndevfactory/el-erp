import React, { useState, useEffect } from "react";
import { Result, Button , Avatar, List, Tooltip } from "antd";
import axios from "axios";
import VirtualList from 'rc-virtual-list';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { BsArrowReturnLeft } from "react-icons/bs";
import { SwapRightOutlined } from "@ant-design/icons";

const token = localStorage.getItem("token");

const FinalStep = ({ title, team, backlog, dates, setCurrent }) => {

  const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
  //   <div>
  //     <div style={{ display: "flex" }}>
  //       <h1 className="Title">Titre de projet</h1>
  //       <BsArrowReturnLeft
  //         style={{
  //           position: "absolute",
  //           right: "30px",
  //           fontSize: "20px",
  //           cursor: "pointer",
  //         }}
  //         onClick={() => {
  //           setCurrent(3);
  //         }}
  //       ></BsArrowReturnLeft>
  //     </div>
  //       {/* <h1 className="subTitle">Dates de debut et de fin de projet</h1> */}
  //       <span style={{ color:"#515A5A" }}> 17-08-2022  <SwapRightOutlined /> 17-10-2022</span>
  //       <h1 className="subTitle">Equipe du projet</h1>
  //       <div         style={{marginLeft:"5px", width:"85%"}}>
  //         <div className='relative flex items-center'>
  //             <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
  //         <div
  //             id='slider'
  //             className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'
  //         >
  //             {team.map((item) => (
  //                 <Avatar size="large" src={item.picture.large} style={{marginRight:"12px"}}/>
  //             ))}
  //         </div>
  //             <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
  //         </div>
  //       </div>
  //       <br />
  //       <h1 className="subTitle">Liste des tâches</h1>
  //       <List 
  //         style={{marginLeft:"25px", width:"80%"}}
  //       >
  //     <VirtualList
  //       data={backlog}
  //       height={200}
  //       itemHeight={47}
  //       itemKey="email"
  //     >
  //       {(item) => (
  //         <List.Item key={item.email}>
  //           <List.Item.Meta
  //             title={item.name.last}
  //           />
  //           <Tooltip title='Supprimer'>
  //           </Tooltip>
  //         </List.Item>
  //       )}
  //     </VirtualList>
  //   </List>
  // </div>
  <div>
      <Result
        status="success"
        title="Project created successfully"
        extra={[
          <Button
            type="primary"
            key="console"
          >
            project access
          </Button>,
        ]}
      />
    </div>
  );
};

export default FinalStep;
