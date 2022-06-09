import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Alert, Modal, Table, message } from 'antd';
// import ProForm, { ProFormSelect, ProFormTextArea, ProFormText, ProFormRadio } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';


function ImportCaseModel(props, ref){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState();

    useImperativeHandle(ref, () => ({
        data,
        showImportModal: () => {
            setIsModalVisible(true);
        }
    }))

    // const showAddModal = () => {
    //     setIsModalVisible(true);
    // };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

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
    ]
    
    return (<>
        <Modal 
            title="Import Historical Cases"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1400}
        >
            <Alert
                message="Imported historical cases are counted as creating new cases based on the historical cases."
                type="warning"
                closable
            />
            <ProTable
                key={props.index}
                rowKey="id"
                scroll={{ x:1000, y: 200 }}
                options={false}
                columns={columns}
                rowSelection={{
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                    defaultSelectedRowKeys: [1],
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(selectedRows);
                        // this.setState({
                        //     importCases: selectedRows,
                        // });
                    }
                }}
                request={async (params={}, sort, filter) => {
                    // const msg = await searchCases(params);
                    // await this.setState({
                    //     tableData: msg.data,
                    // });
                    // return {data: msg.data}
                }} 
            />
        </Modal>
    </>);
};

ImportCaseModel = forwardRef(ImportCaseModel);

export default ImportCaseModel;