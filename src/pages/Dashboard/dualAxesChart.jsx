import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { DualAxes } from '@ant-design/charts';
import { chartCardGroup, chartBug, chartCase } from '@/services/ant-design-pro/api';

const DualAxesChart = (props) => {

    const data = [
        {
          time: '2019-03',
          value: 25,
          count: 125,
        },
        {
          time: '2019-04',
          value: 6,
          count: 56,
        },
        {
          time: '2019-05',
          value: 8,
          count: 80,
        },
        {
          time: '2019-06',
          value: 16,
          count: 100,
        },
        {
          time: '2019-07',
          value: 30,
          count: 160,
        },
    ];
    const config = {
        data: [data, data],
        xField: 'time',
        yField: ['value', 'count'],
        height: 200,
        geometryOptions: [
          {
            geometry: 'column',
          },
          {
            geometry: 'line',
            lineStyle: {
              lineWidth: 2,
            },
          },
        ],
    };
    return <DualAxes {...config} />;
}

export default DualAxesChart;