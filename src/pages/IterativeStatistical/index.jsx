import React, { Component, useState, useEffect } from 'react';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
// import { Tabs} from 'antd';
import ColumnComponent from './column';
import LineComponent from './line';
import AreaComponent from './area';
import DemoLiquid from './liquid'
import { showSprint } from '@/services/ant-design-pro/api';

// const { TabPane } = Tabs;
const { Statistic, Divider } = StatisticCard;

class IterativeStatistical extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sprintData: {},
        };
    }
    
    async componentWillMount() {
        const msg = await showSprint();
        this.setState({
            sprintData: msg.data,
        });
    }

    render() {
        return (
            <div>
            <StatisticCard.Group title={this.state.sprintData.sprint_name} direction='row'>
                <StatisticCard
                    statistic={{
                        title: '完成总卡数',
                        value: this.state.sprintData.finish_card,
                        description: <Statistic title="完成度占比" value={this.state.sprintData.finish_card_percent} />,
                    }}
                    chart={
                        <DemoLiquid percent={this.state.sprintData.finish_card_percent} />
                    }
                    chartPlacement="right"
                />
                <Divider type='vertical' />
                <StatisticCard
                    statistic={{
                        title: '完成总点数',
                        value: this.state.sprintData.finish_point,
                        description: <Statistic title="完成度占比" value={this.state.sprintData.finish_point_percent} />,
                    }}
                    chart={
                        <DemoLiquid percent={this.state.sprintData.finish_point_percent} />
                    }
                    chartPlacement="right"
                    />
                <Divider type='vertical' />
                <StatisticCard
                    statistic={{
                        title: '产生Bug数',
                        value: this.state.sprintData.total_bug,
                        // description: <Statistic title="占比" value="38.5%" />,
                    }}
                />
                <Divider type='vertical' />
                <StatisticCard
                    statistic={{
                        title: '遗留Bug数',
                        value: this.state.sprintData.left_bug,
                        // description: <Statistic title="占比" value="38.5%" />,
                    }}
                />
            </StatisticCard.Group>
            <ProCard split="horizontal">
                <ProCard split="vertical">
                    <StatisticCard
                        title='迭代完成点数趋势'
                        // 面积图
                        chart={
                            <AreaComponent name="points" />
                        }
                    />
                    <StatisticCard
                        title='迭代完成总卡数趋势'
                        // 折线图
                        chart={
                            <LineComponent name="cards" />
                        }
                    />
                    <StatisticCard
                        title='迭代完成卡数分组趋势'
                        // 分组柱状图
                        chart={
                            <ColumnComponent name="cardGroup" />
                        }
                    />
                </ProCard>
                <ProCard split="vertical">
                    <StatisticCard
                        title='迭代效率趋势'
                        // 折线图
                        chart={
                            <LineComponent />
                        }
                    />
                    <StatisticCard
                        title='迭代产生Bug数趋势'
                        // 堆叠柱状图
                        chart={
                            <ColumnComponent name="bugs" />
                        }
                    />
                    <StatisticCard
                        title='迭代产生Case数趋势'
                        // 柱状图
                        chart={
                            <ColumnComponent name="cases" />
                        }
                    />
                </ProCard>
            </ProCard>
            </div>  
        )
    }
}

export default IterativeStatistical;