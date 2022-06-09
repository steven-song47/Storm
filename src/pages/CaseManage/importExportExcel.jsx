import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Upload, message } from 'antd';
const Host = "http://127.0.0.1:5000";

class ImportExportExcel extends Component {
    constructor(props) {
        super(props);
        // this.jumpTo = this.jumpTo.bind(this);
        // this.exportExcel = this.exportExcel.bind(this);
        this.uploadProps.onChange = this.uploadProps.onChange.bind(this);
    }

    jumpTo = () => {
        window.open(this.props.templateHref);
    }

    uploadProps = {
        name: 'file_import',
        accept: '.xls,.xlsx',
        action: Host + this.props.url + '/import',
        headers: {
            // 'X-Requested-With': null
            "Origin": "http://localhost:8000/",
            "Access-Control-Request-Method": "post",
            "Access-Control-Request-Headers": "X-Requested-With"
        },
        showUploadList: false,
        // headers: {
        //     authorization: 'authorization-text',
        // },
        beforeUpload() {
            message.loading("正在导入...");
            return true;
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log("uploading: ", info.file, info.fileList);
            }
            console.log("info: ", info.file)
            if (info.file.status === 'done') {
                if (info.file.response.code !== 200) {
                    setTimeout(() => {
                        message.destroy();
                        message.error(info.file.response.message);
                    });
                } else {
                    setTimeout(() => {
                        message.destroy();
                        message.success('导入成功');
                    });
                }
            } else if (info.file.status === 'error') {
                setTimeout(() => {
                    message.destroy();
                    message.error('导入失败');
                });
            }
        }
    }

    exportExcel = () => {
        const url = Host + this.props.url + `/export`
        window.open(url);
    }

    render() {
        const uploadProps = this.uploadProps;
        return [
            <Button key="export" onClick={this.exportExcel} >导出</Button>,
            <Upload key="import" {...uploadProps} >
                <Button>导入</Button>
            </Upload>,
        ]
    }
}

export default ImportExportExcel;