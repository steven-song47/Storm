import React, { Component } from 'react';
import { WechatOutlined, DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Steps, Drawer, Tag, Select, Row, Col, Divider, Descriptions, Input, Button, message } from 'antd';
import ProForm, { ProFormCheckbox, ProFormTextArea, ProFormDigit, ProFormText } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { createProject } from '@/services/ant-design-pro/api';


class AddProject extends Component {
    
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
        // this.clearEditableTable();
    }

    render() {

        return (
            <div>
                <Drawer
                    title="Create a new project"
                    width={600}
                    placement="right"
                    onClose={this.closeAddDrawer}
                    visible={this.state.visibleDrawer}
                >
                    <ProForm
                        onFinish={async (values) => {
                            console.log(values);
                            await createProject(values);
                            message.success("Create success !");
                            this.closeAddDrawer();
                        }}
                        formkey="create_project"
                        request={() => {
                            return {
                                basic_data: ['Point completion rate', 'Card completion rate'],
                                extra_data: ['Point overflow rate', 'Commitment fulfillment rate', 'Good card rate', 'Tests cost points on average', 'Bugs', 'Left bugs', 'Test coverage', 'Regression test pass rate'],
                                basic_chart: ['Burn down Chart', 'Cumulative Flow diagrams'],
                                extra_chart: ['Points spent per card', 'Percentage of points delivered by each member'],
                                trend_chart: ['Different type cards in Sprint', 'Completion points in Sprint', 'Completion cards in Sprint', 'Bugs created in Sprint'],
                            };
                        }}
                        key={Date.now()}
                    >
                        <Divider orientation="left">Basic Infomation</Divider>
                        <ProFormText 
                            name="name" 
                            label="Name" 
                            rules={[{ required: true, message: 'This is a request field' }]}
                        />
                        <ProFormText name="robot" label="WeChat Robot URL" disabled={this.state.editable} />
                        <Divider orientation="left">Dashboard Config</Divider>
                        <ProForm.Group>
                            <ProFormCheckbox.Group
                                name="basic_data"
                                label="Basic Data"
                                disabled
                                options={['Point completion rate', 'Card completion rate']}
                            />
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormCheckbox.Group
                                name="extra_data"
                                label="Extra Data"
                                options={['Point overflow rate', 'Commitment fulfillment rate', 'Good card rate', 'Tests cost points on average', 'Bugs', 'Left bugs', 'Test coverage', 'Regression test pass rate']}
                            />
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormCheckbox.Group
                                name="basic_chart"
                                label="Basic Chart"
                                disabled
                                options={['Burn down Chart', 'Cumulative Flow diagrams']}
                            />
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormCheckbox.Group
                                name="extra_chart"
                                label="Extra Chart"
                                options={['Points spent per card', 'Percentage of points delivered by each member']}
                            />
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormCheckbox.Group
                                name="trend_chart"
                                label="Trend Chart"
                                options={['Different type cards in Sprint', 'Completion points in Sprint', 'Completion cards in Sprint', 'Bugs created in Sprint']}
                            />
                        </ProForm.Group>
                    </ProForm>
                </Drawer>
            </div>
        );
    }

}

export default AddProject;