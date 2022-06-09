import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Area } from '@ant-design/charts';
import { chartPoint } from '@/services/ant-design-pro/api';

const AreaComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = async () => {
        const response = await chartPoint();
        setData(response.data);
    }

    const config = {
        data,
        xField: 'sprint',
        yField: 'value',
        xAxis: {
            range: [0, 1],
            tickCount: 5,
        },
        areaStyle: () => {
            return {
                fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
            };
        },
    };

    return <Area {...config} />;
}

export default AreaComponent;