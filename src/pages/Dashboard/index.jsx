import React, { Component, useState, useEffect } from 'react';
import { Select, Button, Row, Col, Form, Progress } from 'antd';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import { PlusOutlined } from '@ant-design/icons';
import { getSprints, basicData } from '@/services/ant-design-pro/api';
import PieChart from './pieChart';
import BidirectionalBarChart from './bidirectionalBar';
import ColumnChart from './columnChart';
import DualAxesChart from './dualAxesChart';
import LineChart from './lineChart';
import AreaChart from './areaChart';

const { Statistic, Divider } = StatisticCard;

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sprints: [],
            currentSprint: "",
            basicInfo: {},
        };
    }
    
    async componentWillMount() {
        const sprints = await getSprints();
        await this.setState({
            currentSprint: sprints.data[0],
            sprints: sprints.data,
        });
        console.log("currentSprint: ", this.state.currentSprint);
        const msg = await basicData({sprint: this.state.currentSprint});
        await this.setState({
            basicInfo: msg.data,
        });
    }

    selectOptions = () => {
        var options = [];
        var sprintList = [...this.state.sprints];
        sprintList&&sprintList.map((sprint) => 
            options.push({
                "label": sprint,
                "value": sprint,
            })
        )
        return options;
    }

    onChange = async (value) => {
    }

    render() {

        const show_detail_data = () => {
            const detail_data = this.state.basicInfo.sprint_detail;
            var group_data = [];
            for (var key in detail_data) {
                if (key % 2 === 0) {
                    group_data.push([detail_data[key], detail_data[++key]]);
                }
            }
            return group_data && group_data.map(couple => {
                if (couple[1] != undefined) {
                    return (
                        <StatisticCard.Group direction='row'>
                            <StatisticCard
                                statistic={{
                                    title: couple[0].title,
                                    tip: couple[0].tip,
                                    value: couple[0].value,
                                    suffix: couple[0].suffix===undefined?"":couple[0].suffix,
                                }}
                            />
                            <Divider />
                            <StatisticCard
                                statistic={{
                                    title: couple[1].title,
                                    tip: couple[1].tip,
                                    value: couple[1].value,
                                    suffix: couple[1].suffix===undefined?"":couple[1].suffix,
                                }}
                            />
                        </StatisticCard.Group>
                    )
                } else {
                    return (
                        <StatisticCard.Group direction='row'>
                            <StatisticCard
                                statistic={{
                                    title: couple[0].title,
                                    tip: couple[0].tip,
                                    value: couple[0].value,
                                    suffix: couple[0].suffix===undefined?"":couple[0].suffix,
                                }}
                            />
                        </StatisticCard.Group> 
                    )
                }
            })
        }

        return (
            <div>
                <ProCard >
                    <Form layout="inline">
                        <Form.Item name="sprint" label="Select Sprint">
                            <Select 
                                style={{ width: 260 }} 
                                key={this.state.currentSprint}
                                defaultValue={this.state.currentSprint}
                                onChange={this.onChange}
                                options={this.selectOptions()}
                            />
                        </Form.Item>
                    </Form>
                </ProCard>
                <br />
                <ProCard split="horizontal" key={this.state.currentSprint}>
                    <ProCard split="vertical">
                        <StatisticCard
                            title="Burn down Chart"
                            tip=""
                            style={{ maxWidth: 580 }}
                            chart={
                                <LineChart sprint={this.state.currentSprint} />
                            }
                        />
                        <StatisticCard
                            title="Point completion rate"
                            statistic={{
                                value: this.state.basicInfo.points_rate,
                                suffix: '%',
                                // description: <Statistic title="排名前" value="20%" />,
                            }}
                            chart={
                                <Progress
                                    // strokeColor={{
                                    //     '0%': '#108ee9',
                                    //     '100%': '#87d068',
                                    // }}
                                    showInfo={false}
                                    percent={this.state.basicInfo.points_rate}
                                />
                            }
                            footer={
                                <>
                                <Statistic value={this.state.basicInfo.points_plan} title="Planned completion points" suffix="points" layout="horizontal" />
                                <Statistic value={this.state.basicInfo.points} title="Accumulated points completed" suffix="points" layout="horizontal" />
                                </>
                            }
                            style={{ width: 350 }}
                        />
                        <StatisticCard
                            title="Card completion rate"
                            statistic={{
                                value: this.state.basicInfo.cards_rate,
                                suffix: '%',
                                // description: <Statistic title="排名前" value="20%" />,
                            }}
                            chart={
                                <Progress
                                    // strokeColor={{
                                    //     '0%': '#108ee9',
                                    //     '100%': '#87d068',
                                    // }}
                                    showInfo={false}
                                    percent={this.state.basicInfo.cards_rate}
                                />
                            }
                            footer={
                                <>
                                <Statistic value={this.state.basicInfo.cards_plan} title="Planned completion cards" suffix="cards" layout="horizontal" />
                                <Statistic value={this.state.basicInfo.cards} title="Accumulated cards completed" suffix="cards" layout="horizontal" />
                                </>
                            }
                            style={{ width: 350 }}
                        />
                        <StatisticCard
                            title="Cumulative Flow diagrams"
                            tip=""
                            style={{ maxWidth: 580 }}
                            chart={
                                <AreaChart sprint={this.state.currentSprint} />
                            }
                        />
                    </ProCard>
                    <ProCard split="vertical">
                        <ProCard split="horizontal">
                            {show_detail_data()}
                        </ProCard>
                        <StatisticCard
                            key={this.state.currentSprint + "card_points"}
                            title="Points spent per card"
                            tip="Show Dev and QA spend how much time on each card"
                            style={{ maxWidth: 480 }}
                            chart={
                                <BidirectionalBarChart sprint={this.state.currentSprint} />
                            }
                        />
                        <StatisticCard
                            key={this.state.currentSprint + "member_points"}
                            title="Percentage of points delivered by each member"
                            tip="Show each Dev member complete how many points"
                            style={{ maxWidth: 480 }}
                            chart={
                                <PieChart sprint={this.state.currentSprint} />
                            }
                        />
                    </ProCard>
                    <ProCard split="vertical">
                        <StatisticCard
                            title="Different type cards in Sprint"
                            tip="111"
                            style={{ maxWidth: 580 }}
                            chart={
                                <ColumnChart name="cardGroup" sprint={this.state.currentSprint} />
                            }
                        />
                        <StatisticCard
                            title="Completion points in Sprint"
                            tip=""
                            style={{ maxWidth: 580 }}
                            chart={
                                <ColumnChart name="points" sprint={this.state.currentSprint} />
                            }
                        />
                        <StatisticCard
                            title="Completion cards in Sprint"
                            tip=""
                            style={{ maxWidth: 580 }}
                            chart={
                                <ColumnChart name="cards" sprint={this.state.currentSprint} />
                            }
                        />
                        <StatisticCard
                            title="Bugs created in Sprint"
                            tip=""
                            style={{ maxWidth: 580 }}
                            chart={
                                <ColumnChart name="bugs" sprint={this.state.currentSprint} />
                            }
                        />
                    </ProCard>
                </ProCard>
            </div>  
        )
    }
}

export default Dashboard;