import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/charts';
import { trendDataChart } from '@/services/ant-design-pro/api';

const ColumnChart = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = async () => {
        
        if (props.name == "cardGroup") {
            var msg = await trendDataChart({sprint: props.sprint, type: 'card_group'});
        } else if (props.name == "bugs") {
            var msg = await trendDataChart({sprint: props.sprint, type: 'done_bugs'});
        } else if (props.name == "cards") {
            var msg = await trendDataChart({sprint: props.sprint, type: 'done_cards'});
        } else if (props.name == "points") {
            var msg = await trendDataChart({sprint: props.sprint, type: 'done_points'});
        }
        setData(msg.data); 
        // console.log("res:", response.data)
        
    }

    const config_cardGroup = {
        data,
        xField: 'sprint',
        yField: 'value',
        seriesField: 'type',
        isPercent: true,
        isStack: true,
        label: {
          position: 'middle',
          content: (item) => {
            return item.value.toFixed(2);
          },
          style: {
            fill: '#fff',
          },
        },
        maxColumnWidth: 40,
        height: 200,
    };

    const config_normal = {
        data,
        xField: 'sprint',
        yField: 'value',
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            sprint: {
                alias: 'sprint',
            },
            value: {
                alias: 'value',
            },
        },
        maxColumnWidth: 40,
        height: 200,
    }

    const config = () => {
        if (props.name == "cardGroup") {
            return config_cardGroup;
        } else {
            return config_normal;
        }
    }

    return <Column {...config()} />;
}

export default ColumnChart;