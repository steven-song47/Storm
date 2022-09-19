import React, { Component } from 'react';
import { Button, Upload, Drawer, Tag, Divider, message } from 'antd';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import ProTable, { TableDropdown, EditableProTable } from '@ant-design/pro-table';
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormRadio,
  ProFormTextArea,
} from '@ant-design/pro-form';
import {
  UploadOutlined,
  DownloadOutlined,
  ToolOutlined,
  FileTextOutlined,
  EditTwoTone,
  DeleteTwoTone,
} from '@ant-design/icons';
import {
  searchCases,
  uploadExcelData,
  updateCase,
  fileCase,
  exportFiledCase,
} from '@/services/ant-design-pro/api';
import * as XLSX from 'xlsx';
import ExportJsonExcel from 'js-export-excel';
import MonitorDualAxes from './monitorDualAxes';

const excel_filter = [
  'id',
  'name',
  'module',
  'given',
  'when',
  'then',
  'review',
  'level',
  'tag',
  'auto',
  'result',
  'card',
  'script',
  'bug',
  'creator',
];
const excel_header = [
  'ID',
  'Name',
  'Module',
  'Given',
  'When',
  'Then',
  'Review',
  'Level',
  'Tag',
  'Auto',
  'Last Result',
  'Card',
  'Script',
  'Bug',
  'Creator',
];

class Monitor extends Component {
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
  };

  closeEditDrawer = () => {
    this.setState({
      newDrawer: false,
    });
  };

  deleteCase = async (record) => {
    const msg = await fileCase({ id: record.id });
    if (msg.success === true) {
      message.success('File case success');
    } else {
      message.error('File case fail');
    }
  };

  uploadFile = (file) => {
    try {
      if (file.event.percent === 100) {
        const fileReader = new FileReader();
        fileReader.onload = async (event) => {
          try {
            const { result } = event.target;
            const workbook = XLSX.read(result, { type: 'binary' });
            let data = {};
            for (const sheet in workbook.Sheets) {
              let tempData = [];
              if (workbook.Sheets.hasOwnProperty(sheet)) {
                data[sheet] = tempData.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
              }
            }
            console.log(data);
            const msg = await uploadExcelData({ excel: data });
            if (msg.error === '') {
              message.success('上传成功');
            } else {
              message.error('上传失败');
            }
          } catch (e) {
            message.error('上传失败');
          }
        };
        // Ant Design踩坑记录：因为antd组件给原生文件外面又包了一层，所以我们实际.originFileObj才是我们应该传给后台的
        fileReader.readAsBinaryString(file.file.originFileObj);
      }
    } catch (e) {
      // console.log(e);
    }
  };

  downModelFile = () => {
    let dataTable = [];
    let options = {};
    options.fileName = 'ModelFile';
    options.datas = [
      {
        sheetData: dataTable,
        sheetName: 'Case List',
        sheetFilter: excel_filter,
        sheetHeader: excel_header,
      },
    ];
    let toExcel = new ExportJsonExcel(options);
    toExcel.saveExcel();
  };

  downloadFile = () => {
    let dataTable = [];
    let options = {};
    dataTable = this.state.tableData;
    options.fileName = 'ExportCase';
    options.datas = [
      {
        sheetData: dataTable,
        sheetName: 'Case List',
        sheetFilter: excel_filter,
        sheetHeader: excel_header,
      },
    ];
    let toExcel = new ExportJsonExcel(options);
    toExcel.saveExcel();
  };

  exportFileCases = async () => {
    let dataTable = [];
    let options = {};
    let msg = await exportFiledCase();
    dataTable = msg.data;
    options.fileName = 'ExportFiledCase';
    options.datas = [
      {
        sheetData: dataTable,
        sheetName: 'Case List',
        sheetFilter: excel_filter,
        sheetHeader: excel_header,
      },
    ];
    let toExcel = new ExportJsonExcel(options);
    toExcel.saveExcel();
  };

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        copyable: true,
        width: 150,
        fixed: 'left',
      },
      {
        title: 'Server',
        dataIndex: 'module',
        key: 'module',
        width: 150,
      },
      {
        title: 'Url',
        dataIndex: 'review',
        key: 'review',
        width: 250,
      },
      {
        title: 'Method',
        dataIndex: 'level',
        key: 'level',
        width: 150,
      },
      {
        title: 'Monitor',
        dataIndex: 'level',
        key: 'level',
        width: 100,
      },
      {
        title: 'State',
        dataIndex: 'tag',
        key: 'tag',
        hideInSearch: true,
        width: 150,
        render: (tags) => [
          tags != '-' ? (
            <>
              {tags.split(',').map((tag) => (
                <Tag color="green" key={tag}>
                  {tag}
                </Tag>
              ))}
            </>
          ) : (
            <></>
          ),
        ],
      },
      {
        title: 'Response Time',
        dataIndex: 'auto',
        key: 'auto',
        width: 150,
      },
      {
        title: 'Error Rate',
        dataIndex: 'err',
        key: 'err',
        width: 150,
      },
      {
        title: 'Update Time',
        key: 'update_time',
        dataIndex: 'update_time',
        valueType: 'dateTime',
        sorter: true,
        hideInSearch: true,
      },
      {
        title: 'Action',
        valueType: 'option',
        fixed: 'right',
        width: 200,
        render: (text, record, _, action) => [
          <a href="javascript:;" key="edit" onClick={this.showEditDrawer.bind(this, record)}>
            <EditTwoTone />
          </a>,
          <a href="javascript:;" key="file" onClick={this.deleteCase.bind(this, record)}>
            <DeleteTwoTone />
          </a>,
        ],
      },
    ];

    return (
      <div>
        <ProTable
          columns={columns}
          request={async (params = {}, sort, filter) => {
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
          scroll={{ x: 1200 }}
          search={{
            labelWidth: 'auto',
          }}
          form={{
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
            syncToUrl: (values, type) => {
              if (type === 'get') {
                return Object.assign(Object.assign({}, values), {
                  created_at: [values.startTime, values.endTime],
                });
              }
              return values;
            },
          }}
          pagination={{
            pageSize: 5,
          }}
          dateFormatter="string"
          headerTitle="API List"
          toolBarRender={() => [
            <Button key="config" icon={<ToolOutlined />} type="primary">
              Configuration
            </Button>,
            <Button
              key="sample"
              icon={<FileTextOutlined />}
              onClick={this.downModelFile}
              type="primary"
            >
              Download Modal
            </Button>,
            <Upload
              name="excel"
              showUploadList={false}
              onChange={this.uploadFile}
              accept=".xls,.xlsx"
            >
              <Button key="import" icon={<UploadOutlined />} type="primary">
                Import API
              </Button>
            </Upload>,
            <Button
              key="export"
              icon={<DownloadOutlined />}
              onClick={this.downloadFile}
              type="primary"
            >
              Export API
            </Button>,
          ]}
        />
        <ProCard>
          <MonitorDualAxes />
        </ProCard>
        <Drawer
          title="Interface Information"
          placement="right"
          width="1200"
          onClose={this.closeEditDrawer}
          visible={this.state.newDrawer}
        ></Drawer>
      </div>
    );
  }
}

export default Monitor;
