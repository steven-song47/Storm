import React, { Component, useRef } from 'react';
import { Drawer, message } from 'antd';
import ProForm, { StepsForm, ProFormDateRangePicker, ProFormTextArea, ProFormDigit, ProFormText } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { selectMembers, createSprint } from '@/services/ant-design-pro/api';


class CreateSprintDrawer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            visibleDrawer: false,
            techMembers: [],
            newSprint: "",
        };
        this.formRef = React.createRef();
    }

    componetDidMount() {
    }

    componentWillUnmount() {
    }

    showCreateDrawer = async () => {
        const msg = await selectMembers({role: "tech"});
        await this.setState({
            visibleDrawer: true,
            techMembers: msg.data,
        });
    }

    closeCreateDrawer = () => {
        this.setState({
            visibleDrawer: false,
        });
        this.props.refresh(this.state.newSprint);
    }

    render() {

        const showTechMembers = (members) => {
            return (members&&members.map(memberObj => {
                return (
                    <ProFormDigit 
                        name={memberObj.value} 
                        label={memberObj.value} 
                        tooltip="Please enter the number of days which the member will participate in this sprint."
                        rules={[{ required: true }]}
                    />
                )
            }))
        }

        return (
            <div>
                <Drawer
                    title="Create a new sprint"
                    width={600}
                    placement="right"
                    onClose={this.closeCreateDrawer}
                    visible={this.state.visibleDrawer}
                    key={Date.now()}
                >
                    <ProCard>
                        <StepsForm
                            // stepsProps={{
                            //     direction: 'vertical',
                            // }}
                            formRef={this.formRef}
                            onFinish={async (value) => {
                                const msg = await createSprint({...value})
                                message.success('提交成功');
                                this.setState({
                                    newSprint: value.name,
                                })
                            }}
                            formProps={{
                                validateMessages: {
                                    required: 'This field must be required',
                                },
                            }}
                        >
                            <StepsForm.StepForm
                                name="info"
                                title="Basic Info"
                                // stepProps={{
                                //     description: '这里填入的都是基本信息',
                                // }} 
                                onFinish={async () => {
                                    console.log(this.formRef.current.getFieldsFormatValue())
                                    return true;
                                }}
                            >
                                <ProFormText name="name" label="Sprint name" width="xl" tooltip="The sprint name must be unique" rules={[{ required: true }]}/>
                                <ProFormDateRangePicker name="dateTime" label="Sprint cycle" rules={[{ required: true }]}/>
                                <ProForm.Group>
                                    <ProFormDigit name="storyCards" label="Estimate the number of story cards" rules={[{ required: true }]} />
                                    <ProFormDigit name="taskCards" label="Estimate the number of task cards" rules={[{ required: true }]} />
                                </ProForm.Group>
                                <ProForm.Group>
                                    <ProFormDigit name="spikeCards" label="Estimate the number of spike cards" rules={[{ required: true }]} />
                                    <ProFormDigit name="bugCards" label="Estimate the number of bug cards" rules={[{ required: true }]} />
                                </ProForm.Group>
                                <ProFormDigit name="points" label="Estimate the points of cards" width="xl" rules={[{ required: true }]} />
                                <ProFormTextArea name="remark" label="Remark" width="xl" />
                            </StepsForm.StepForm>
                            <StepsForm.StepForm 
                                name="member" 
                                title="Member Settings" 
                                onFinish={async () => {
                                    console.log("current: ", this.formRef.current.getFieldsFormatValue())
                                    return true;
                                }}
                            >
                                {showTechMembers(this.state.techMembers)}
                            </StepsForm.StepForm>
                        </StepsForm>
                    </ProCard>
                </Drawer>
            </div>
        );
    }

}

export default CreateSprintDrawer;