import React, { useState, useRef, useEffect } from 'react';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Divider, Modal, message, Tag } from 'antd';
import ProForm, { ProFormSelect, ProFormTextArea, ProFormText, ProFormRadio } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';


function CardTable(props) {
    const [dataSource, setDataSource] = useState([...props.data]);

    const formRef = useRef();

    const CardColumns = [
        {
            title: 'Index',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Dev',
            dataIndex: 'dev',
            key: 'dev',
            render: (members) => members.toString()
        },
        {
            title: 'QA',
            dataIndex: 'qa',
            key: 'qa',
            render: (members) => members.toString()
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
        },
    ]
    
    return (<>
        <ProTable
            rowKey="id"
            scroll={{ x: 1000, }}
            search={false}
            options={false}
            columns={CardColumns}
            dataSource={dataSource}
            pagination={false}
            request={async () => {
                return {data: props.data}
            }}
        />
    </>);
};

export default CardTable;