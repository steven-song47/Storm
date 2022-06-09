import React, { Component } from 'react';
import { Button, Steps, Drawer, message, Avatar, Row, Col, Radio } from 'antd';
import ProTable, { TableDropdown, EditableProTable } from '@ant-design/pro-table';
import ProForm, { ProFormText, ProFormRadio } from '@ant-design/pro-form';
import { TeamOutlined } from '@ant-design/icons';
import request from 'umi-request';
import { searchMembers, addMember, getMember, deleteMember, updateMember } from '@/services/ant-design-pro/api';


class MemberManage extends Component {
    
    state = {
        newDrawer: false,
        editDrawer: false,
        editMember: {},
    };

    showNewDrawer = () => {
        this.setState({
            newDrawer: true,
        });
    }

    closeNewDrawer = () => {
        this.setState({
            newDrawer: false,
        });
    }

    showEditDrawer = async (record) => {
        await this.setState({
            editDrawer: true,
            editMember: record,
        });
    }

    deleteTheMember = async (record) => {
        await deleteMember({name: record.name});
        message.success("删除成功");
    }

    closeEditDrawer = () => {
        this.setState({
            editDrawer: false,
            editMember: {}
        });
    }

    updateRole = e => {
        this.setState({
            updateRole: e.target.value,
        });
    }

    render() {

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                hideInSearch: true,
                width: '5%',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                copyable: true,
                width: '15%',
            },
            {
                title: 'Role',
                dataIndex: 'role',
                hideInSearch: true,
                width: '10%',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                hideInSearch: true,
                width: '20%',
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
                hideInSearch: true,
                width: '15%',
            },
            {
                title: 'Active',
                dataIndex: 'active',
                width: '15%',
            },
            {
                title: '操作',
                valueType: 'option',
                width: '20%',
                render: (text, record, _, action) => [
                    <a href="javascript:;" key="edit" onClick={this.showEditDrawer.bind(this, record)} >
                        Edit
                    </a>,
                    <a href="javascript:;" key="delete" onClick={this.deleteTheMember.bind(this, record)} >
                        Delete
                    </a>,
                ],
            },
        ];

        return (
            <div>
                <ProTable 
                    columns={columns}
                    request={async (params={}, sort, filter) => {
                        const msg = await searchMembers(params);
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
                    headerTitle="Project Member Management" 
                    toolBarRender={() => [
                        <Button key="button" icon={<TeamOutlined />} type="primary" onClick={this.showNewDrawer}>
                            Add Member
                        </Button>,
                    ]}
                />
                <Drawer 
                    title="Add A Project Memeber"
                    placement="right" 
                    width="600"
                    onClose={this.closeNewDrawer}
                    visible={this.state.newDrawer}
                >
                    <ProForm
                        key={Date.now()}
                        onFinish={async (value) => {
                            console.log(value)
                            await addMember(value);
                            message.success("提交成功");
                            this.closeNewDrawer();
                        }}
                        params={{}}
                        layout='vertical'
                    >
                        <ProFormText width="xl" name="name" label="Name" rules={[{ required: true }]} />
                        <ProFormText width="xl" name="email" label="Email" />
                        <ProFormText width="xl" name="phone" label="Phone" />
                        <ProFormRadio.Group label="Role" name="role" radioType="button" options={["DEV", "QA", "BA"]} rules={[{ required: true }]} />
                    </ProForm>
                </Drawer>
                <Drawer 
                    title="Edit The Project Memeber"
                    placement="right" 
                    width="600"
                    onClose={this.closeEditDrawer}
                    visible={this.state.editDrawer}
                >
                    <Row>
                        <Avatar src="https://joeschmoe.io/api/v1/jon" />{this.state.editMember.name}
                    </Row>
                    <br />
                    <ProForm
                        onFinish={async (value) => {
                            console.log(value)
                            await updateMember({name: this.state.editMember.name, ...value});
                            message.success("Submit successfully!");
                        }}
                        layout='vertical'
                        key={this.state.editMember.id}
                        request={async () => {
                            return {
                                email: this.state.editMember.email,
                                phone: this.state.editMember.phone,
                                role: this.state.editMember.role
                            };
                        }}
                    >
                        <ProFormText width="xl" name="email" label="Email" />
                        <ProFormText width="xl" name="phone" label="Phone" />
                        <ProFormRadio.Group label="Role" name="role" radioType="button" options={["DEV", "QA", "BA"]} rules={[{ required: true }]} />
                    </ProForm>
                </Drawer>
            </div>
        );
    }

}

export default MemberManage;