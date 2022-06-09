import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/charts';
import { chartCardGroup, chartBug, chartCase } from '@/services/ant-design-pro/api';

const ColumnComponent = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = async () => {
        let response = {};
        if (props.name == "cardGroup") {
            response = await chartCardGroup();
        } else if (props.name == "bugs") {
            response = await chartBug();
        } else if (props.name == "cases") {
            response = await chartCase();
        }
        // console.log("res:", response.data)
        setData(response.data);
    }

    const config_cardGroup = {
        data,
        isGroup: true,
        xField: 'sprint',
        yField: 'value',
        seriesField: 'type',
        label: {
            position: 'middle',
            layout: [
                {
                    type: 'interval-adjust-position',
                },
                {
                    type: 'interval-hide-overlap',
                },
                {
                    type: 'adjust-color',
                },
            ],
        },
    };

    const config_bug = {
        data,
        isStack: true,
        xField: 'sprint',
        yField: 'value',
        seriesField: 'type',
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'bottom', 'middle'
            // 可配置附加的布局方法
            layout: [
                // 柱形图数据标签位置自动调整
                {
                type: 'interval-adjust-position',
                }, // 数据标签防遮挡
                {
                type: 'interval-hide-overlap',
                }, // 数据标签文颜色自动调整
                {
                type: 'adjust-color',
                },
            ],
        },
    };

    const config_case = {
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
                alias: 'case数量',
            },
        },
    }

    const config = () => {
        if (props.name == "cardGroup") {
            return config_cardGroup;
        } else if (props.name == "bugs") {
            return config_bug;
        } else if (props.name == "cases") {
            return config_case;
        }
    }

    return <Column {...config()} />;
}

export default ColumnComponent;