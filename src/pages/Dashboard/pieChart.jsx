import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/charts';
import { memberPointChart } from '@/services/ant-design-pro/api';

const PieChart = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = async () => {
        const msg = await memberPointChart({sprint: props.sprint})
        setData(msg.data);
    }

    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        color: ['#F08080', '#FFA07A', '#EEE8AA', '#90EE90', '#87CEEB', '#8470FF', '#D19275'],
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
            fontSize: 14,
            textAlign: 'center',
            },
        },
        interactions: [
            {
            type: 'element-active',
            },
        ],
    };

    return <Pie {...config} />;
}

export default PieChart;