import React, { Component } from 'react';
import { PlusOutlined, MinusCircleOutlined  } from '@ant-design/icons';
import { Button, Steps, Drawer, Form, Input, Select, DatePicker, InputNumber, Row, Col, Divider, Tabs, Descriptions, message } from 'antd';
import ProTable, { TableDropdown, EditableProTable } from '@ant-design/pro-table';
import request from 'umi-request';
import EditableTable from './editableTable';
import NormalTable from './normalTable';
import { test, getCards, getCard, switchState, showCardDetail, getMembers } from '@/services/ant-design-pro/api';

const { Step } = Steps;

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};

const formItemLayout = {
    labelCol: {
    //    xs: { span: 24 },
       sm: { span: 4 },
    },
    wrapperCol: {
    //    xs: { span: 24 },
       sm: { span: 20 },
    },
};

const formItemLayoutWithOutLabel = {
    wrapperCol: {
    //    xs: { span: 24, offset: 0 },
       sm: { span: 20, offset: 4 },
    },
};

class Project extends Component {
    
    formRef = React.createRef();
    state = {
        newDrawer: false,
        actionDrawer: false,
        detailDrawer: false,
        openCardData: {},
        openCardAcitons: [],
        cardDetail: {},
        showCase: true,
        showBug: true,
        showTask: true,
        members: [],
        devSwitch: "",
        qaSwitch: "",
    };

    componetDidMount() {
        const { dispatch } = this.props;
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
    }

    showNewDrawer = async () => {
        this.setState({
            newDrawer: true,
        });
        // const msg = await test();
        // console.log(msg);
    }

    closeNewDrawer = () => {
        this.setState({
            newDrawer: false,
        });
        this.formRef.current.resetFields();
    }

    showActionDrawer = async (record) => {
        // console.log(record.index)
        const msg = await getCard({index: record.index})
        this.setState({
            actionDrawer: true,
            openCardData: msg.data,
            devSwitch: msg.data.dev,
            qaSwitch: msg.data.qa,
        });
        // this.props.dispatch({type: 'security/showServerTrack', payload: {openServer: record.serviceName}});
    }

    closeActionDrawer = () => {
        this.setState({
            actionDrawer: false,
        });
        this.clearEditableTable();
    }

    // 用来清空可编辑表格的数据缓存
    clearEditableTable = () => {
        this.setState({
            openCardData: {
                "state": "create",
                "action": []
            }
        });
    }

    showDetailDrawer = async (record) => {
        const msg = await showCardDetail({index: record.index})
        await this.setState({
            detailDrawer: true,
            cardDetail: msg.data,
        }) 
        if (msg.data.bug == false) {
            await this.setState({showBug: false});
        } else {
            await this.setState({showBug: true});
        }
        if (msg.data.task == false) {
            await this.setState({showTask: false});
        } else {
            await this.setState({showTask: true});
        }
        if (msg.data.case == false) {
            await this.setState({showCase: false});
        } else {
            await this.setState({showCase: true});
        }
    }

    closeDetailDrawer = () => {
        this.setState({
            detailDrawer: false,
        });
    }

    onFinishNew = async (values) => {
        await test({ ...values });
        this.closeNewDrawer();
        message.success("创建成功");
    }

    switchCardState = async (data) => {
        const state_list = ["create","grooming","kick off","in dev","pr review","desk check","in qa","test done"];
        const state = data.state;
        const index = state_list.indexOf(state);
        const next_state = state_list[index + 1];
        await switchState({
            index: data.index,
            state: next_state,
            dev: this.state.devSwitch,
            qa: this.state.qaSwitch,
            actions: this.state.openCardAcitons,
        });
        this.closeActionDrawer();
    }

    showStep = (state) => {
        const state_list = ["create","grooming","kick off","in dev","pr review","desk check","in qa","test done"];
        var index = 0;
        if (state != "test done") {
            index = state_list.indexOf(state);
        } else {
            index = 6;
        }
        return index;
    }

    showStepStatus = (state) => {
        if (state == "test done") {
            return "finish";
        } else {
            return "process"
        }
    }

    showButton = (state) => {
        if (state == "test done") {
            return true;
        } else {
            return false;
        }
    }

    updateAction = async (data) => {
        this.setState({
            openCardAcitons: data,
        });
    }

    createFormList = (name, label, bName) => {
        return (
            <Form.List name={name} {...formItemLayoutWithOutLabel}>
                {(fields, { add, remove }) => (
                <>
                    {fields.map((field, index) => (
                    <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                        label={index === 0 ? label : ''}
                        required={false}
                        key={field.key}
                    >
                        <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        noStyle
                        >
                            <Input style={{ width: '96%' }} />
                        </Form.Item>
                        {fields.length > 0 ? (
                        <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                        />
                        ) : null}
                    </Form.Item>
                    ))}
                    <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        {bName}
                    </Button>
                    </Form.Item>
                </>
                )}
            </Form.List>
        )
    }

    getSelectMember = async (value) => {
        const msg = await getMembers({role: value});
        await this.setState({
            members: msg.data,
        })
    }

    switchDevMember = (member) => {
        this.setState({
            devSwitch: member,
        })
    }

    switchQAMember = (member) => {
        this.setState({
            qaSwitch: member,
        })
    }

    render() {

        const columns = [
            {
                title: 'Sprint ID',
                dataIndex: 'sprint',
                copyable: true,
                tip: '迭代sprint的名称代号',
            },
            {
                title: 'Card Index',
                dataIndex: 'index',
            },
            {
                title: 'Card Title',
                dataIndex: 'title',
                copyable: true,
                ellipsis: true,
            },
            {
                title: 'Point',
                dataIndex: 'point',
                tip: '卡的估点数',
                hideInSearch: true,
            },
            {
                title: 'Dev Owner',
                dataIndex: 'dev',
            },
            {
                title: 'QA Owner',
                dataIndex: 'qa',
            },
            {
                title: 'Create Time',
                key: 'showTime',
                dataIndex: 'created_at',
                valueType: 'dateTime',
                sorter: true,
                hideInSearch: true,
            },
            {
                title: 'Status',
                dataIndex: 'state',
                filters: true,
                onFilter: true,
                valueType: 'select',
                valueEnum: {
                    all: { 
                        text: 'All', 
                        status: 'Default',
                    },
                    create: {
                        text: 'Create',
                        status: 'create',
                    },
                    grooming: {
                        text: 'Grooming',
                        status: 'grooming',
                    },
                    kickoff: {
                        text: 'Kick off',
                        status: 'kick off',
                    },
                    indev: {
                        text: 'In Dev',
                        status: 'in dev',
                    },
                    prreview: {
                        text: 'PR Review',
                        status: 'pr review',
                    },
                    deskcheck: {
                        text: 'Desk check',
                        status: 'desk check',
                    },
                    inqa: {
                        text: 'In QA',
                        status: 'in qa',
                    },
                    testdone: {
                        text: 'Test done',
                        status: 'test done',
                    },
                },
            },
            {
                title: '操作',
                valueType: 'option',
                render: (text, record, _, action) => [
                    <a href="javascript:;" onClick={this.showActionDrawer.bind(this, record)} key="action">
                        Action
                    </a>,
                    <a href="javascript:;" onClick={this.showDetailDrawer.bind(this, record)} key="detail">
                        Detail
                    </a>,
                ],
            },
        ];

        const displayCardInfo = (cardInfo) => {
            return (
                <Descriptions title="Card Infomation" bordered size="small" column={2}>
                    <Descriptions.Item label="Sprint">{cardInfo.sprint}</Descriptions.Item>
                    <Descriptions.Item label="Index">{cardInfo.index}</Descriptions.Item>
                    <Descriptions.Item label="Title" span={2}>{cardInfo.title}</Descriptions.Item>
                    <Descriptions.Item label="Type">{cardInfo.type}</Descriptions.Item>
                    <Descriptions.Item label="Point">{cardInfo.point}</Descriptions.Item>
                </Descriptions>
            );
        }

        const displayCardDetail = (data) => {
            return (
                <Descriptions title="Card Detail" bordered size="small" column={2}>
                    <Descriptions.Item label="Sprint">{data.sprint}</Descriptions.Item>
                    <Descriptions.Item label="Index">{data.index}</Descriptions.Item>
                    <Descriptions.Item label="Title" span={2}>{data.title}</Descriptions.Item>
                    <Descriptions.Item label="Type">{data.type}</Descriptions.Item>
                    <Descriptions.Item label="Point">{data.point}</Descriptions.Item>
                    <Descriptions.Item label="Dev">{data.dev}</Descriptions.Item>
                    <Descriptions.Item label="QA">{data.qa}</Descriptions.Item>
                    <Descriptions.Item label="Status" span={2}>{data.state}</Descriptions.Item>
                </Descriptions>
            );
        }

        const displayActionTable = (name, show, data) => {
            // console.log(name, show, data);
            if (show) {
                return (<>
                    <Divider orientation="left">{name}</Divider>
                    <NormalTable data={data} />
                </>);
            } else {
                return (<></>);
            }
        }

        return (
            <div>
                <ProTable 
                    columns={columns}
                    request={async (params={pageSize:10, current:1}, sort, filter) => {
                        // console.log(params);
                        // console.log(sort);
                        // console.log(filter);
                        const msg = await getCards(params);
                        return {data: msg.data}
                    }} 
                    columnsState={{
                        persistenceKey: 'pro-table-singe-demos',
                        persistenceType: 'localStorage',
                    }} 
                    rowKey="id" 
                    search={{
                        labelWidth: 'auto',
                    }} 
                    form={{
                        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                        syncToUrl: (values, type) => {
                            if (type === 'get') {
                                return Object.assign(Object.assign({}, values), { created_at: [values.startTime, values.endTime] });
                            }
                            return values;
                        },
                    }} 
                    pagination={{
                        pageSize: 10,
                    }} 
                    dateFormatter="string" 
                    headerTitle="Project Workflow Management" 
                    toolBarRender={() => [
                        <Button key="button" icon={<PlusOutlined />} onClick={this.showNewDrawer} type="primary">
                            Create Card
                        </Button>,
                    ]}
                />
                <Drawer 
                    title="Create a new card record"
                    placement="right" 
                    width="600"
                    onClose={this.closeNewDrawer}
                    visible={this.state.newDrawer}
                >
                    <Form 
                        name="new_card" 
                        layout="horizontal"
                        initialValues={{
                            "sprint_id": "",
                            "card_index": "",
                            "card_title": ""
                        }}
                        onFinish={this.onFinishNew}
                        ref={this.formRef}
                    >
                        <Form.Item label="Sprint ID" name="sprint_id">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Card Index" name="card_index">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Card Title" name="card_title">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Card Type" name="card_type">
                            <Select>
                                <Select.Option value="normal">Normal</Select.Option>
                                <Select.Option value="spike">Spike</Select.Option>
                                <Select.Option value="bug">Bug</Select.Option>
                                <Select.Option value="task">Task</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Card Point" name="card_point">
                            <InputNumber />
                        </Form.Item>
                        <Form.Item label="Dev Owner" name="dev">
                            <Select 
                                onDropdownVisibleChange={() => this.getSelectMember("dev") }
                                options={this.state.members}
                            >
                            </Select>
                        </Form.Item>
                        <Form.Item label="QA Owner" name="qa">
                            <Select 
                                onDropdownVisibleChange={() => this.getSelectMember("qa")}
                                options={this.state.members}
                            >
                            </Select>
                        </Form.Item>
                        <Form.Item label="Start Time" name="start_time">
                            <DatePicker />
                        </Form.Item>
                        <Divider />
                        {this.createFormList("dynamic_form_case", "Card Case ", "Add Card Case field")}
                        <Divider />
                        {this.createFormList("dynamic_form_task", "Card Task ", "Add Card Task field")}
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Drawer>
                <Drawer
                    title="Card Action"
                    width={850}
                    placement="right"
                    // closable={true}
                    onClose={this.closeActionDrawer}
                    visible={this.state.actionDrawer}
                >
                    {displayCardInfo(this.state.openCardData)}
                    <br />
                    <Row>
                        <Col span={6}>
                            <label>Dev Owners</label>
                        </Col>
                        <Col span={18}>
                            <Select
                                key={this.state.openCardData.index}
                                // mode="multiple"
                                allowClear
                                style={{width: '100%'}}
                                onChange={this.switchDevMember}
                                onDropdownVisibleChange={() => this.getSelectMember("dev") }
                                options={this.state.members}
                                defaultValue={this.state.openCardData.dev}
                            >
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={6}>
                            <label>QA Owners</label>
                        </Col>
                        <Col span={18}>
                            <Select
                                key={this.state.openCardData.index}
                                // mode="multiple"
                                allowClear
                                style={{width: '100%'}}
                                onChange={this.switchQAMember}
                                onDropdownVisibleChange={() => this.getSelectMember("qa")}
                                options={this.state.members}
                                defaultValue={this.state.openCardData.qa}
                            >
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Divider />
                    <Steps 
                        current={this.showStep(this.state.openCardData.state)} 
                        status={this.showStepStatus(this.state.openCardData.state)} 
                        // size="small" 
                        labelPlacement="vertical"
                    >
                        <Step title="Grooming" />
                        <Step title="Kick Off" />
                        <Step title="In Dev" />
                        <Step title="PR Review" />
                        <Step title="Desk Check" />
                        <Step title="In QA" />
                        <Step title="Test Done" />
                    </Steps>
                    <Divider orientation="left">请完成下列清单</Divider>
                    {/* 踩坑记录： 当遇到这种同一个组件，传递不同数据做渲染的情况，一定需要在每次渲染的时候给组件设置不同的key否则不会触发组件的重新渲染 */}
                    <EditableTable name="table" handle={(data)=>{this.updateAction(data)}} info={this.state.openCardData} key={this.state.openCardData.index} />
                    {/* 踩坑记录： Button的onClick方式不能使用onClick={this.test()}实现，不然会自动触发函数 */}
                    <Button 
                        type="primary" 
                        block 
                        onClick={() => this.switchCardState(this.state.openCardData)}
                        disabled={this.showButton(this.state.openCardData.state)}
                    >
                        确认完成此步骤
                    </Button>
                </Drawer>
                <Drawer
                    title="Card Detail"
                    width={800}
                    placement="right"
                    closable={true}
                    onClose={this.closeDetailDrawer}
                    visible={this.state.detailDrawer}
                >
                    {displayCardDetail(this.state.cardDetail)}
                    <br />
                    {displayActionTable("Bug状态统计", this.state.showBug, this.state.cardDetail.bug)}
                    {displayActionTable("Task完成统计", this.state.showTask, this.state.cardDetail.task)}
                    {displayActionTable("Case执行统计", this.state.showCase, this.state.cardDetail.case)}
                </Drawer>
            </div>
        );
    }

}

export default Project;