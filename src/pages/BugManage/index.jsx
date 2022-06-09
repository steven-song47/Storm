import React, { Component } from 'react';
import { Button, Upload, Drawer, Tag,  message } from 'antd';
import ProTable, { TableDropdown, EditableProTable } from '@ant-design/pro-table';
import ProForm, { ProFormText, ProFormSelect, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form';
import {  } from '@/services/ant-design-pro/api';
import * as XLSX from 'xlsx';
import ExportJsonExcel from 'js-export-excel';


class BugManage extends Component {
    

    state = {
        newDrawer: false,
        tableData: [],
        excelimportData: {},
        editData: {},
    };

    componetDidMount() {
        const { dispatch } = this.props;
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
    }

    showEditDrawer = async (record) => {
        this.setState({
            newDrawer: true,
            editData: record,
        });
    }

    closeEditDrawer = () => {
        this.setState({
            newDrawer: false,
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
                title: 'Card Index',
                dataIndex: 'card',
                copyable: true,
                width: '10%',
            },
            {
                title: 'Description',
                dataIndex: 'bug',
                hideInSearch: true,
                width: '20%',
            },
            {
                title: 'State',
                dataIndex: 'state',
                width: '10%',
            },
            {
                title: 'Dev Owner',
                dataIndex: 'owner',
                width: '10%',
            },
            {
                title: 'QA Owner',
                dataIndex: 'tester',
                width: '10%',
            },
            {
                title: 'Create Time',
                key: 'create_time',
                dataIndex: 'create_time',
                valueType: 'dateTime',
                sorter: true,
                hideInSearch: true,
                width: '10%',
            },
            {
                title: 'Update Time',
                key: 'update_time',
                dataIndex: 'update_time',
                valueType: 'dateTime',
                sorter: true,
                hideInSearch: true,
                width: '10%',
            },
            {
                title: '操作',
                valueType: 'option',
                width: '15%',
                render: (text, record, _, action) => [
                    <a href="javascript:;" key="edit" >
                        Edit
                    </a>,
                    <a href="javascript:;" key="file" >
                        File
                    </a>,
                ],
            },
        ];

        return (
            <div>
                <ProTable 
                    columns={columns}
                    request={async (params={}, sort, filter) => {
                        // // console.log(params);
                        // // console.log(sort);
                        // // console.log(filter);
                        // const msg = await searchCases(params);
                        // await this.setState({
                        //     tableData: msg.data,
                        // });
                        // return {data: msg.data}
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
                    headerTitle="Bug Management" 
                    toolBarRender={() => [
                        <Button key="export" type="primary">
                            导出Bug
                        </Button>,
                    ]}
                />
                <Drawer 
                    title="Edit This Case"
                    placement="right" 
                    width="600"
                    onClose={this.closeEditDrawer}
                    visible={this.state.newDrawer}
                >
                   1
                </Drawer>
            </div>
        );
    }

}

export default BugManage;