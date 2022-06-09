import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/charts';
import { burnDownChart } from '@/services/ant-design-pro/api';

function LineChart(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = async () => {
    const msg = await burnDownChart({sprint: props.sprint})
    setData(msg.data);
  }

  const config = {
    data,
    xField: 'date',
    yField: 'points',
    xAxis: {
      tickCount: 5,
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
    height: 200,
  };

  return <Line {...config} />;
};

export default LineChart;