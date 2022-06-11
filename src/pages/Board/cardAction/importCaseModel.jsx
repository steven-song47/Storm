import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Alert, Modal, Table, Tag, message } from 'antd';
// import ProForm, { ProFormSelect, ProFormTextArea, ProFormText, ProFormRadio } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import { searchCases } from '@/services/ant-design-pro/api';


function ImportCaseModel(props, ref){
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
        props.updateCase(data);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setData([]);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 100,
        },
        {
            title: 'Module',
            dataIndex: 'module',
            key: 'module',
            width: 100,
        },
        {
            title: 'Given',
            dataIndex: 'given',
            key: 'given',
            width: 150,
        },
        {
            title: 'When',
            dataIndex: 'when',
            key: 'when',
            width: 200,
        },
        {
            title: 'Then',
            dataIndex: 'then',
            key: 'then',
            width: 200,
        },
        {
            title: 'Review',
            dataIndex: 'review',
            key: 'review',
            width: 100,
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
            width: 100
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
            width: 150,
            render: (tags) => [
                <>
                    {tags.split(",").map(tag => (
                        <Tag color="green" key={tag}>
                            {tag}
                        </Tag>
                    ))}
                </>
            ],
        },
        {
            title: 'Auto',
            dataIndex: 'auto',
            key: 'auto',
            width: 100,
        },
        {
            title: 'Card',
            dataIndex: 'card',
            key: 'card',
            width: 100,
            render: (cards) => [
                <>
                    {cards.split(",").map(card => (
                        <Tag key={card}>
                            {card}
                        </Tag>
                    ))}
                </>
            ],
        },
        {
            title: 'Script',
            dataIndex: 'script',
            key: 'script',
            width: 100,
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
                columns={columns}
                rowKey="id"
                scroll={{ x:1000, y: 200 }}
                options={false}
                search={false}
                request={async (params={}, sort, filter) => {
                    const msg = await searchCases(params);
                    return {data: msg.data}
                }}
                rowSelection={{
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                    defaultSelectedRowKeys: [1],
                    onChange: (selectedRowKeys, selectedRows) => {
                        var import_data = [];
                        for (let i=0; i<selectedRows.length; i++) {
                            var current_case = {...selectedRows[i]};
                            var origin_card = current_case.card;
                            if (origin_card) {
                                var card_list = origin_card.split(",");
                                if (!card_list.includes(props.index.toString())) {
                                    card_list.push(props.index.toString());
                                    current_case.card = card_list.join(",");
                                    import_data.push(current_case);
                                }
                            } else {
                                current_case.card = props.index.toString();
                                import_data.push(current_case);
                            }
                        }
                        setData(import_data);
                    }
                }}
            />
        </Modal>
    </>);
};

ImportCaseModel = forwardRef(ImportCaseModel);

export default ImportCaseModel;