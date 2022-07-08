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

    // const showAddModal = () => {
    //     setIsModalVisible(true);
    // };

    const handleOk = () => {
        setIsModalVisible(false);
        // props.updateCase(data);
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
                    return {data: msg.data}
                }}
                rowSelection={{
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                    defaultSelectedRowKeys: [1],
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(selectedRows);
                        // var import_data = [];
                        // for (let i=0; i<selectedRows.length; i++) {
                        //     var current_case = {...selectedRows[i]};
                        //     var origin_card = current_case.card;
                        //     if (origin_card) {
                        //         var card_list = origin_card.split(",");
                        //         if (!card_list.includes(props.index.toString())) {
                        //             card_list.push(props.index.toString());
                        //             current_case.card = card_list.join(",");
                        //             import_data.push(current_case);
                        //         }
                        //     } else {
                        //         current_case.card = props.index.toString();
                        //         import_data.push(current_case);
                        //     }
                        // }
                        // setData(import_data);
                    }
                }}
            />
        </Modal>
    </>);
};

ImportCardModel = forwardRef(ImportCardModel);

export default ImportCardModel;