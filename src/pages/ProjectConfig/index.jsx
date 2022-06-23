import React, { Component } from 'react';
import { Form, Select, Button, Divider, message } from 'antd';
import { PlusOutlined, EditOutlined, UsbTwoTone } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { getProjects, getProjectConfig, createProject, updateProject } from '@/services/ant-design-pro/api';


class ProjectConfig extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: true,
            currentProject: "",
            projects: [],
            config: {}
        };
        this.formRef = React.createRef();
    }
    
    async componentWillMount() {
        // const projects = await getProjects();
        // await this.setState({
        //     currentProject: projects.data[0],
        //     projects: projects.data,
        // });
        // const msg = await getProjectConfig({project: this.state.currentProject});
        // await this.setState({
        //     config: msg.data,
        // });
    }

    editConfig = async () => {
        await this.setState({
            editable: !this.state.editable,
        })
        if (this.state.editable) { 
            const data = this.formRef.current.getFieldsFormatValue();
            const msg = await updateProject({...data});
            if (msg.success) {
                message.success("Update success !");
            } else {
                message.error("Update fail !")
            }
        }
    }

    createProject = () => {

    }

    switchButtonShow = () => {
        if (this.state.editable) {
            return (<div><EditOutlined /> Edit Current Project</div>)
        } else {
            return (<div><UsbTwoTone /> Save Changes</div>)
        }
    }

    render() {
        return (
            <div>
                <ProCard>
                    <Form layout="inline">
                        <Form.Item name="project" label="Activate Project">
                            <Select 
                                key={this.state.currentProject}
                                // bordered={false}
                                style={{ width: 260 }} 
                                defaultValue={this.state.currentProject}
                                // onChange={this.onChange}
                                // options={this.selectOptions()}
                                // onDropdownVisibleChange={this.showSelectSprints}
                            />
                        </Form.Item>
                        <Form.Item >
                            <Button key={this.state.editable} htmlType="button" type="primary" onClick={() => this.editConfig()} >
                                {this.switchButtonShow()}
                            </Button>
                        </Form.Item>
                        <Form.Item >
                            <Button htmlType="button" onClick={() => this.createProject()} >
                                <PlusOutlined />Create New Project
                            </Button>
                        </Form.Item>
                    </Form>
                </ProCard>
                <br />
                <ProCard>
                    <ProForm
                        submitter={false}
                        formkey="edit-case"
                        layout="vertical"
                        formRef={this.formRef}
                        request={() => {
                            return {
                                basic_data: ['Point completion rate', 'Card completion rate'],
                                extra_data: ['Point overflow rate', 'Commitment fulfillment rate', 'Good card rate', 'Tests cost points on average', 'Bugs', 'Left bugs', 'Test coverage', 'Regression test pass rate'],
                                basic_chart: ['Burn down Chart', 'Cumulative Flow diagrams'],
                                extra_chart: ['Points spent per card', 'Percentage of points delivered by each member'],
                                trend_chart: ['Different type cards in Sprint', 'Completion points in Sprint', 'Completion cards in Sprint', 'Bugs created in Sprint'],
                            };
                        }}
                        // key={this.state.editData.id}
                    >
                        <Divider orientation="left">Basic Infomation</Divider>
                        <ProFormText 
                            name="name" 
                            label="Name" 
                            disabled={this.state.editable}
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
                                disabled={this.state.editable}
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
                                disabled={this.state.editable}
                                options={['Points spent per card', 'Percentage of points delivered by each member']}
                            />
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormCheckbox.Group
                                name="trend_chart"
                                label="Trend Chart"
                                disabled={this.state.editable}
                                options={['Different type cards in Sprint', 'Completion points in Sprint', 'Completion cards in Sprint', 'Bugs created in Sprint']}
                            />
                        </ProForm.Group>
                    </ProForm>
                </ProCard>
            </div> 
        )
    }
}

export default ProjectConfig;