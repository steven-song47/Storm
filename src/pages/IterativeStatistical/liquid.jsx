import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Liquid } from '@ant-design/charts';

const DemoLiquid = (props) => {
  const config = {
    percent: parseInt(props.percent)/100,
    width:90,
    height:90,
    outline: {
      border: 2,
      distance: 2,
    },
    wave: {
      length: 64,
    },
    statistic: {
        content: false,
    }
  };

  return <Liquid {...config} />;
};

export default DemoLiquid;