import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Area } from '@ant-design/charts';
import { sumFlowChart } from '@/services/ant-design-pro/api';

function AreaChart(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = async () => {
    const msg = await sumFlowChart({sprint: props.sprint})
    setData(msg.data);
  }

  const config = {
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'step',
    // color: ['#6897a7', '#8bc0d6', '#60d7a7', '#dedede', '#fedca9', '#fab36f', '#d96d6f'],
    height: 200,
    legend: {
      position: 'top',
    },
  };

  return <Area {...config} />;
};

export default AreaChart;