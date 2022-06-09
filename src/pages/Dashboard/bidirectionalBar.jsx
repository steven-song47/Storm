import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BidirectionalBar } from '@ant-design/charts';
import { cardPointChart } from '@/services/ant-design-pro/api';

function BidirectionalBarChart(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = async () => {
        const msg = await cardPointChart({sprint: props.sprint})
        setData(msg.data);
    }

    const config = {
        data,
        xField: 'index',
        xAxis: {
            position: 'bottom',
        },
        interactions: [
            {
                type: 'active-region',
            },
        ],
        yField: ['Dev', 'QA'],
        tooltip: {
            shared: true,
            showMarkers: false,
        },
        maxColumnWidth: 20,
    };

    return <BidirectionalBar {...config} />;
}

export default BidirectionalBarChart;