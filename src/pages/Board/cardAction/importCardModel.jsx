import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Alert, Modal, Table, Tag, message } from 'antd';
// import ProForm, { ProFormSelect, ProFormTextArea, ProFormText, ProFormRadio } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import { getCards } from '@/services/ant-design-pro/api';


function ImportCardModel(props, ref){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState([]);

    useImperativeHandle(ref, () => ({
        data,
        showImportModal: () => {
            setIsModalVisible(true);
        }
    }))

    const handleOk = () => {
        setIsModalVisible(false);
        props.updateAssociation(data);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setData([]);
    };

    const columns = [
        {
            title: 'Index',
            dataIndex: 'index',
            key: 'index',
            width: '15%',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '30%',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: '10%',
        },
        {
            title: 'Dev',
            dataIndex: 'dev',
            key: 'dev',
            width: '15%',
        },
        {
            title: 'QA',
            dataIndex: 'qa',
            key: 'qa',
            width: '15%',
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
            width: '15%',
        },
    ]
    
    return (<>
        <Modal 
            title="Create a new association"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1400}
        >
            <ProTable 
                key={props.index}
                columns={columns}
                rowKey="id"
                scroll={{ x:1000, y: 600 }}
                options={false}
                search={false}
                request={async (params={}, sort, filter) => {
                    const msg = await getCards(params);
                    var new_data = [];
                    for (let i=0; i<msg.data.length; i++) {
                        var row_data = msg.data[i];
                        row_data.key = i+1;
                        new_data.push(row_data);
                    }
                    console.log("new_data:", new_data);
                    return {data: new_data}
                }}
                rowSelection={{
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                    // Antd踩坑: defaultSelectedRowKeys设置不生效
                    defaultSelectedRowKeys: [1],
                    checkStrictly: true,
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log("select in modal:", selectedRows);
                        setData(selectedRows);
                    }
                }}
            />
        </Modal>
    </>);
};

ImportCardModel = forwardRef(ImportCardModel);

export default ImportCardModel;