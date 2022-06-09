import React, { Component } from 'react';
import { WechatOutlined, DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Steps, Drawer, Tag, Select, Row, Col, Divider, Descriptions, Input, Button, message } from 'antd';
import ProForm, { ProFormSelect, ProFormTextArea, ProFormDigit, ProFormText } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { createCard } from '@/services/ant-design-pro/api';
import EditableTable from './cardAction/editableTable';

const { Step } = Steps;
const { TextArea } = Input;


class AddDrawer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            visibleDrawer: false,
        };
    }

    componetDidMount() {
    }

    componentWillUnmount() {
    }

    showAddDrawer = () => {
        this.setState({
            visibleDrawer: true,
        });
    }

    closeAddDrawer = () => {
        this.setState({
            visibleDrawer: false,
        });
        this.props.refresh();
        // this.clearEditableTable();
    }

    // 用来清空可编辑表格的数据缓存
    clearEditableTable = () => {
        this.setState({
            openCardData: {
                "state": "create",
                "index": 0
            }
        });
    }

    render() {

        return (
            <div>
                <Drawer
                    title="Create a new card"
                    width={600}
                    placement="right"
                    onClose={this.closeAddDrawer}
                    visible={this.state.visibleDrawer}
                >
                    <ProForm
                        onFinish={async (values) => {
                            console.log(values);
                            await createCard(values);
                            message.success("提交成功");
                            this.closeAddDrawer();
                        }}
                        formkey="create_card"
                        request={() => {
                            return {
                                sprint: this.props.sprint,
                            };
                        }}
                        key={Date.now()}
                    >
                        <ProFormText name="sprint" label="Sprint" disabled />
                        <ProFormText name="index" label="Card Index" rules={[{ required: true, message: '这是必填项' }]} />
                        <ProFormText name="title" label="Card Title" rules={[{ required: true, message: '这是必填项' }]} />
                        <ProFormSelect 
                            options={[
                                {
                                    value: "story",
                                    label: "Story",
                                },
                                {
                                    value: "spike",
                                    label: "Spike",
                                },
                                {
                                    value: "bug",
                                    label: "Bug",
                                },
                                {
                                    value: "task",
                                    label: "Task",
                                },
                            ]}
                            name="type"
                            label="Card Type"
                            rules={[{ required: true, message: '这是必填项' }]}
                        />
                        <ProFormDigit name="point" label="Point" rules={[{ required: true, message: '这是必填项' }]} />
                        <ProFormTextArea name="ac" label="Acceptance Criteria" rows={8} />
                    </ProForm>
                </Drawer>
            </div>
        );
    }

}

export default AddDrawer;