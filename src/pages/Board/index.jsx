import React, { Component, useState, useEffect } from 'react';
import { Select, Button, Row, Col, Form } from 'antd';
import ProCard from '@ant-design/pro-card';
import { PlusOutlined } from '@ant-design/icons';
import { board, getSprints } from '@/services/ant-design-pro/api';
import USCard from './usCard';
import ActionDrawer from './cardAction/cardActionDrawer';
import AddDrawer from './createCardDrawer';
import CreateSprintDrawer from './createSprintDrawer';

const columnType = ["New", "Ready for Dev", "In Dev", "Dev Done", "Testing", "Closed"]

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sprints: [],
            cards: {
                "New": [],
                "Ready for Dev": [],
                "In Dev": [],
                "Dev Done": [],
                "Testing": [],
                "Closed": [],
            },
            openCardIndex: "",
            currentSprint: "",
        };
        this.ActionDrawer = React.createRef();
        this.AddDrawer = React.createRef();
        this.CreateSprintDrawer = React.createRef();
    }
    
    async componentWillMount() {
        const sprints = await getSprints();
        await this.setState({
            currentSprint: sprints.data[0],
            sprints: sprints.data,
        });
        const msg = await board({sprint: this.state.currentSprint});
        await this.setState({
            cards: msg.data,
        });
    }

    showSelectSprints = async () => {
        const sprints = await getSprints();
        await this.setState({
            sprints: sprints.data,
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
        const msg = await board({sprint: value});
        await this.setState({
            cards: msg.data,
            currentSprint: value
        });
    }

    openCard = (index) => {
        this.setState({
            openCardIndex: index,
        });
        this.ActionDrawer.current.showActionDrawer(index);
    }

    createCard = () => {
        this.AddDrawer.current.showAddDrawer();
    }

    createSprint = () => {
        this.CreateSprintDrawer.current.showCreateDrawer();
    }

    refreshBoard = async (sprint="") => {
        if (sprint) {
            await this.setState({
                currentSprint: sprint,
            });
        }
        const msg = await board({sprint: this.state.currentSprint});
        await this.setState({
            cards: msg.data,
        });
    }

    render() {
        const createCardButton = () => {
            return (
                <Button type="link" onClick={() => this.createCard()}><PlusOutlined /></Button>
            )
        }

        const column = (columnType) => {
            return (columnType.map(type => {
                if (type === "New") {
                    return (
                        <ProCard
                            key={type}
                            title={type}
                            headerBordered
                            bordered 
                            direction="column"
                            gutter={[0, 16]}
                            extra={createCardButton()}
                        >
                            <div style={{ height: 3000 }}>
                                {cards(type)}
                            </div>
                        </ProCard>
                    )
                } else {
                    return (
                        <ProCard
                            key={type}
                            title={type}
                            headerBordered
                            bordered 
                            direction="column"
                            gutter={[0, 16]}
                        >
                            <div style={{ height: 3000 }}>
                                {cards(type)}
                            </div>
                        </ProCard>
                    )
                }
            }))
        }

        const cards = (type) => {
            var col_cards = this.state.cards[type];
            // 踩坑记录： 调用map的对象是undefined，初始化第一次渲染的时候异步数据返回之前data是undefined。解决办法:对data进行判断
            return (col_cards&&col_cards.map(card => (
                <USCard key={card.index} data={card} column={type} handle={(index)=>{this.openCard(index)}} />
            )))
        }

        return (
            <div>
                {/* <ProCard> */}
                    <ProCard>
                        <Form layout="inline">
                            <Form.Item name="sprint" label="Select Sprint">
                                <Select 
                                    key={this.state.currentSprint}
                                    // bordered={false}
                                    style={{ width: 260 }} 
                                    defaultValue={this.state.currentSprint}
                                    onChange={this.onChange}
                                    options={this.selectOptions()}
                                    onDropdownVisibleChange={this.showSelectSprints}
                                />
                            </Form.Item>
                            <Form.Item >
                                <Button htmlType="button" onClick={() => this.createSprint()} >
                                    Create New Sprint
                                </Button>
                            </Form.Item>
                        </Form>
                    </ProCard>
                {/* </ProCard> */}
                <br />
                <ProCard split="vertical">
                    {column(columnType)}
                </ProCard>
                <ActionDrawer ref={this.ActionDrawer} refresh={this.refreshBoard} />
                <AddDrawer ref={this.AddDrawer} refresh={this.refreshBoard} sprint={this.state.currentSprint} />
                <CreateSprintDrawer ref={this.CreateSprintDrawer} refresh={this.refreshBoard} />
            </div>  
        )
    }
}

export default Board;