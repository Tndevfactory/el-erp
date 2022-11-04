import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';

const ChartsTest = () => {
  const [data, setData] = useState([
    { "employe": "Wael", "projet": "ERP", "nbrHeures": 14 },
    { "employe": "Wael", "projet": "EW", "nbrHeures": 2 },
    { "employe": "Wael", "projet": "GIP", "nbrHeures": 4 },
    { "employe": "Wael", "projet": "MSA", "nbrHeures": 8 },
    { "employe": "Hassen", "projet": "ERP", "nbrHeures": 8 },
    { "employe": "Hassen", "projet": "EW", "nbrHeures": 12 },
    { "employe": "Hassen", "projet": "GIP", "nbrHeures": 7 },
    { "employe": "Hassen", "projet": "MSA", "nbrHeures": 12 },
    { "employe": "Nidhal", "projet": "ERP", "nbrHeures": 8 },
    { "employe": "Nidhal", "projet": "EW", "nbrHeures": 5 },
    { "employe": "Nidhal", "projet": "MC", "nbrHeures": 8 },
    { "employe": "Nidhal", "projet": "MSA", "nbrHeures": 12 },
    { "employe": "Chawki", "projet": "ERP", "nbrHeures": 8 },
    { "employe": "Chawki", "projet": "EW", "nbrHeures": 6 },
    { "employe": "Chawki", "projet": "MC", "nbrHeures": 8 },
    { "employe": "Chawki", "projet": "MSA", "nbrHeures": 12 },
    { "employe": "Emna", "projet": "ERP", "nbrHeures": 8 },
    { "employe": "Emna", "projet": "EW", "nbrHeures": 9 },
    { "employe": "Emna", "projet": "MC", "nbrHeures": 8 },
    { "employe": "Emna", "projet": "MSA", "nbrHeures": 12 },
  ]);

  useEffect(() => {
  }, []);

  const config = {
    data,
    xField: 'employe',
    yField: 'nbrHeures',
    seriesField: 'projet',
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
