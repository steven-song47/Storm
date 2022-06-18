import React, { Component } from 'react';
import { WechatOutlined, DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Steps, Drawer, Tag, Select, Row, Col, Divider, Descriptions, Input, Button, message } from 'antd';
import ProForm, { ProFormSelect, ProFormTextArea, ProFormDigit, ProFormText } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { createCard, judgeCardIndex } from '@/services/ant-design-pro/api';
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

    judgeCardIndexUnique = async (index) => {
        const msg = await judgeCardIndex({index: index});
        return msg.data
    }

    // 踩坑记录： 不能直接在这个函数中调用后端接口，不能写async，否则函数不生效，why？
    // 踩坑记录： judgeCardIndexUnique函数返回的是一个Promise对象，需要用then取出结果
    handleConfirmCardIndex = (rule, value, callback) => {
        this.judgeCardIndexUnique(value).then(
            (result) => {
                // console.log("result:", result);
                if (result == false) {
                    callback("This index already existed !");
                    return;
                }
                callback();
            }
        )
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
                        <ProFormText 
                            name="index" 
                            label="Card Index" 
                            rules={[
                                { required: true, message: 'This is a mandatory field' },
                                { validator: (rule, value, callback) => this.handleConfirmCardIndex(rule, value, callback) },
                            ]}
                            // 踩坑记录：validateTrigger={onblur} 这种写法是错误的，失焦不会触发校验
                            validateTrigger="onBlur"
                        />
                        <ProFormText name="title" label="Card Title" rules={[{ required: true, message: 'This is a mandatory field' }]} />
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
                            rules={[{ required: true, message: 'This is a mandatory field' }]}
                        />
                        <ProFormDigit name="point" label="Point" rules={[{ required: true, message: 'This is a mandatory field' }]} />
                        <ProFormTextArea name="ac" label="Acceptance Criteria" rows={8} />
                    </ProForm>
                </Drawer>
            </div>
        );
    }

}

export default AddDrawer;