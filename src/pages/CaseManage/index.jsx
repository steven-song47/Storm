import React, { Component } from 'react';
import { Button, Upload, Drawer, Tag,  message } from 'antd';
import ProTable, { TableDropdown, EditableProTable } from '@ant-design/pro-table';
import ProForm, { ProFormText, ProFormSelect, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form';
import { CloudUploadOutlined, CloudDownloadOutlined, CloudOutlined, CloudServerOutlined } from '@ant-design/icons';
import { searchCases, uploadExcelData, updateCase, fileCase, exportFiledCase } from '@/services/ant-design-pro/api';
import * as XLSX from 'xlsx';
import ExportJsonExcel from 'js-export-excel';


class CaseManage extends Component {
    

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

    deleteCase = async (record) => {
        const msg = await fileCase({id: record.id});
        if (msg.success === true) {
            message.success("归档成功");
        } else {
            message.error("归档失败");
        }
    }

    uploadFile = (file) => {
        try {
            if (file.event.percent === 100) {
                const fileReader = new FileReader();
                fileReader.onload = async (event) => {
                    try {
                        const { result } = event.target;
                        const workbook = XLSX.read(result, { type: 'binary'});
                        let data = {};
                        for (const sheet in workbook.Sheets) {
                            let tempData = [];
                            if (workbook.Sheets.hasOwnProperty(sheet)) {
                                data[sheet] = tempData.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                            }
                        }
                        console.log(data);
                        const msg = await uploadExcelData({excel: data});
                        if (msg.error === "") {
                            message.success("上传成功");
                        } else {
                            message.error("上传失败");
                        }
                    } catch (e) {
                        message.error("上传失败");
                    }     
                }
                // Ant Design踩坑记录：因为antd组件给原生文件外面又包了一层，所以我们实际.originFileObj才是我们应该传给后台的
                fileReader.readAsBinaryString(file.file.originFileObj);
            }
        } catch (e) {
            // console.log(e);
        }
    }

    downModelFile = () => {
        let dataTable = [];
        let options = {};
        options.fileName = "ModelFile";
        options.datas = [
            {
                sheetData: dataTable,
                sheetName: 'Case List',
                sheetFilter: ["id", "case", "level", "tag", "state", "card", "auto", "creator"],
                sheetHeader: ["ID", "Case Content", "Level", "Tag", "Test Result", "Card Index", "Automation", "Creator"],
            }
        ]
        let toExcel = new ExportJsonExcel(options);
        toExcel.saveExcel();
    }

    downloadFile = () => {
        let dataTable = [];
        let options = {};
        dataTable = this.state.tableData;
        options.fileName = "ExportCase";
        options.datas = [
            {
                sheetData: dataTable,
                sheetName: 'Case List',
                sheetFilter: ["id", "case", "level", "tag", "state", "card", "auto", "creator"],
                sheetHeader: ["ID", "Case Content", "Level", "Tag", "Test Result", "Card Index", "Automation", "Creator"],
            }
        ]
        let toExcel = new ExportJsonExcel(options);
        toExcel.saveExcel();
    }

    exportFileCases = async () => {
        let dataTable = [];
        let options = {};
        let msg = await exportFiledCase();
        dataTable = msg.data;
        options.fileName = "ExportFiledCase";
        options.datas = [
            {
                sheetData: dataTable,
                sheetName: 'Case List',
                sheetFilter: ["id", "case", "level", "tag", "state", "card", "auto", "creator"],
                sheetHeader: ["ID", "Case Content", "Level", "Tag", "Test Result", "Card Index", "Automation", "Creator"],
            }
        ]
        let toExcel = new ExportJsonExcel(options);
        toExcel.saveExcel();
    }

    render() {

        // const columns = [
        //     {
        //         title: 'ID',
        //         dataIndex: 'id',
        //         hideInSearch: true,
        //         width: '5%',
        //     },
        //     {
        //         title: 'Case Content',
        //         dataIndex: 'case',
        //         copyable: true,
        //         hideInSearch: true,
        //         width: '20%',
        //     },
        //     {
        //         title: 'Level',
        //         dataIndex: 'level',
        //         width: '5%',
        //     },
        //     {
        //         title: 'Tag',
        //         dataIndex: 'tag',
        //         width: '10%',
        //         render: (tags) => [
        //             <>
        //                 {tags.map(tag => (
        //                     <Tag color="green" key={tag}>
        //                         {tag}
        //                     </Tag>
        //                 ))}
        //             </>
        //         ]
        //     },
        //     {
        //         title: 'Test Result',
        //         dataIndex: 'state',
        //         hideInSearch: true,
        //         width: '10%',
        //     },
        //     {
        //         title: 'Card Index',
        //         dataIndex: 'card',
        //         width: '10%',
        //     },
        //     {
        //         title: 'Automation',
        //         dataIndex: 'auto',
        //         width: '5%',
        //     },
        //     {
        //         title: 'Create Time',
        //         key: 'create_time',
        //         dataIndex: 'create_time',
        //         valueType: 'dateTime',
        //         sorter: true,
        //         hideInSearch: true,
        //         width: '10%',
        //     },
        //     {
        //         title: 'Update Time',
        //         key: 'update_time',
        //         dataIndex: 'update_time',
        //         valueType: 'dateTime',
        //         sorter: true,
        //         hideInSearch: true,
        //         width: '10%',
        //     },
        //     {
        //         title: '操作',
        //         valueType: 'option',
        //         width: '15%',
        //         render: (text, record, _, action) => [
        //             <a href="javascript:;" key="edit" onClick={this.showEditDrawer.bind(this, record)} >
        //                 Edit
        //             </a>,
        //             <a href="javascript:;" key="file" onClick={this.deleteCase.bind(this, record)} >
        //                 File
        //             </a>,
        //         ],
        //     },
        // ];

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                copyable: true,
                hideInSearch: true,
                width: 100,
                fixed: 'left',
            },
            {
                title: 'Module',
                dataIndex: 'module',
                key: 'module',
                hideInSearch: true,
            },
            {
                title: 'Case content',
                children: [
                    {
                        title: 'Given',
                        dataIndex: 'given',
                        key: 'given',
                        hideInSearch: true,
                        width: 150,
                    },
                    {
                        title: 'When',
                        dataIndex: 'when',
                        key: 'when',
                        hideInSearch: true,
                        width: 200,
                    },
                    {
                        title: 'Then',
                        dataIndex: 'then',
                        key: 'then',
                        hideInSearch: true,
                        width: 200,
                    },
                ]
            },
            {
                title: 'Review',
                dataIndex: 'review',
                key: 'review',
                hideInSearch: true,
            },
            {
                title: 'Level',
                dataIndex: 'level',
                key: 'level',
                hideInSearch: true,
            },
            {
                title: 'Tag',
                dataIndex: 'tag',
                key: 'tag',
                hideInSearch: true,
            },
            {
                title: 'Auto',
                dataIndex: 'auto',
                key: 'auto',
                hideInSearch: true,
            },
            {
                title: 'Result',
                dataIndex: 'result',
                key: 'result',
                hideInSearch: true,
            },
            {
                title: 'Case associated',
                children: [
                    {
                        title: 'Card',
                        dataIndex: 'card',
                        key: 'card',
                        hideInSearch: true,
                        width: 150,
                    },
                    {
                        title: 'Script',
                        dataIndex: 'script',
                        key: 'script',
                        hideInSearch: true,
                        width: 200,
                    },
                    {
                        title: 'Bug',
                        dataIndex: 'bug',
                        key: 'bug',
                        hideInSearch: true,
                        width: 200,
                    },
                ]
            },
            {
                title: 'Action',
                valueType: 'option',
                fixed: 'right',
                width: 100,
                render: (text, record, _, action) => [
                    <a href="javascript:;" key="edit" onClick={() => editModal(record)}>
                        <EditTwoTone />
                    </a>,
                    <a href="javascript:;" key="file" >
                        <DeleteTwoTone />
                    </a>,
                ],
            },
        ]

        return (
            <div>
                <ProTable 
                    columns={columns}
                    request={async (params={}, sort, filter) => {
                        const msg = await searchCases(params);
                        await this.setState({
                            tableData: msg.data,
                        });
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
                    headerTitle="Test Case Management" 
                    toolBarRender={() => [
                        <Button key="sample" icon={<CloudOutlined />} onClick={this.downModelFile} type="primary">
                            下载模版
                        </Button>,
                        <Upload
                            name="excel"
                            showUploadList={false}
                            onChange={this.uploadFile}
                            accept=".xls,.xlsx"
                        >
                            <Button key="import" icon={<CloudUploadOutlined />} type="primary">
                            导入Case
                            </Button>
                        </Upload>,
                        <Button key="export" icon={<CloudDownloadOutlined />} onClick={this.downloadFile} type="primary">
                            导出Case
                        </Button>,
                        <Button key="export" icon={<CloudServerOutlined />} onClick={this.exportFileCases} type="primary">
                            导出归档Case
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
                    <ProForm
                        onFinish={async (values) => {
                            console.log(values);
                            await updateCase(values);
                            message.success("提交成功");
                        }}
                        // formRef={formRef}
                        formkey="edit-case"
                        request={() => {
                            return {
                                id: this.state.editData.id,
                                case: this.state.editData.case,
                                level: this.state.editData.level,
                                result: this.state.editData.state,
                                tag: this.state.editData.tag.toString(),
                                card: this.state.editData.card,
                                auto: this.state.editData.auto,
                                creator: this.state.editData.creator,
                            };
                        }}
                        key={this.state.editData.id}
                    >
                        <ProFormText name="id" label="ID" disabled />
                        <ProFormTextArea name="case" label="Case Content" rules={[{ required: true, message: '这是必填项' }]} />
                        <ProFormSelect 
                            options={[
                                {
                                    value: 1,
                                    label: 1,
                                },
                                {
                                    value: 2,
                                    label: 2,
                                },
                                {
                                    value: 3,
                                    label: 3,
                                },
                                {
                                    value: 4,
                                    label: 4,
                                },
                            ]}
                            name="level"
                            label="Level"
                        />
                        <ProFormText name="tag" label="Tag" />
                        <ProFormText name="result" label="Test Result" disabled />
                        <ProFormText name="card" label="Card Index" disabled />
                        <ProFormRadio.Group 
                            name="auto" 
                            label="Automation" 
                            radioType="button"
                            options={[
                                {
                                    label: "Y",
                                    value: "Y",
                                },
                                {
                                    label: "N",
                                    value: "N",
                                },
                            ]}
                        />
                        <ProFormText name="creator" label="Creator" />
                    </ProForm>
                </Drawer>
            </div>
        );
    }

}

export default CaseManage;