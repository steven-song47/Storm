import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/charts';
import { chartCard } from '@/services/ant-design-pro/api';

const LineComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = async () => {
        const response = await chartCard();
        setData(response.data);
    }

    const config = {
        data,
        padding: 'auto',
        xField: 'sprint',
        yField: 'value',
        xAxis: {
            tickCount: 5,
        },
        smooth: true,
    };

    return <Line {...config} />;
}

export default LineComponent;