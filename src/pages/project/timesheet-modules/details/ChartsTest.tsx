import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import moment from "moment";

const ChartsTest = ({sheets, filtred}) => {
  const [data, setData] = useState([
  ]);
  useEffect(() => {
    setData(sheets.slice().sort((a, b) => moment(a.date,"DD/MM/YYYY").valueOf() - moment(b.date,"DD/MM/YYYY").valueOf()))
  }, [sheets]);

  const config = {
    data,
    xField: 'date',
    yField: 'nbrHeures',
    seriesField: filtred?'tache':'projet',
    height: 300,
    isGroup: true,
    // isStack: true,
    // seriesField: 'type',
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
  };

  return <Column {...config} />;
};

export default ChartsTest;
