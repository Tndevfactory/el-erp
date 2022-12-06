import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const Stat = ({sheets}) => {
  const [data, setData] = useState([
  ])
  const sum = ()=>{
    var count=0
    data.map((item)=>{count+=item.value})
    return count+"h"
  }
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    height: 200,
    radius: 1,
    innerRadius: 0.6,
    // tooltip: {
    //   customContent: () => {
    //     return `<div>efzfez</div>`;
    //   }
    // },
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      autoRotate: false,
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: data.length&&sum(),
      },
    },
  };
  useEffect(()=>{
    let t=data
    sheets.map((sheet)=>{
      if(t.filter((item)=>item.type===sheet.projet).length){
        t.map((item)=>{if(item.type===sheet.projet) item.value+=sheet.nbrHeures})
      }else{
        t.push({type:sheet.projet,value:sheet.nbrHeures})
      }
    })
    setData(t)
  },[])
  return <div style={{height:"85%",  margin: 0,
  position: "absolute",
  top: "55%",
  transform: "translateY(-50%)"}}>{data.length&&<Pie {...config} />}</div>;
};

export default Stat;
