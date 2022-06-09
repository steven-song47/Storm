import React, { useState, useRef, useEffect } from 'react';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Divider, Modal, message } from 'antd';
import ProForm, { ProFormSelect, ProFormTextArea, ProFormText, ProFormRadio } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';


function CaseTable(props) {
    const [dataSource, setDataSource] = useState([...props.data]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editCase, setEditCase] = useState();

    // const showEditModal = () => {
    //     setIsModalVisible(true);
    // };

    useEffect(() => {
        props.handle(dataSource);
    }, [dataSource]);

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const editModal = (record) => {
        console.log("edit case:", record);
        // showEditModal();
        setIsModalVisible(true);
        setEditCase(record);
    };

    const updateDataSource = (values) => {
        var updated_data = [...dataSource];
        var updated_line = {
            id: editCase.id,
            name: values.name,
            module: values.module,
            given: values.given,
            when: values.when,
            then: values.then,
            level: values.level,
            tag: values.tag,
            auto: values.auto,
            card: values.card,
            creator: editCase.creator,
            result: editCase.result,
            effect: editCase.effect,
            review: editCase.review,
            create_time: editCase.create_time,
            update_time: editCase.update_time,
        };
        // findIndex不生效，why？
        // data_index = updated_data.findIndex((item) => item.id === updated_line.id);
        for (let i=0; i<updated_data.length; i++) {
            if (updated_data[i].id === updated_line.id) {
                updated_data[i] = updated_line;
            }
        }
        setDataSource(updated_data);
    }

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
    
    return (<>
        <ProTable
            rowKey="id"
            scroll={{ x: 1000, }}
            search={false}
            options={false}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            request={async () => {
                return {data: props.data}
            }}
            onDataSourceChange={() => {
                console.log("dataSource modified");
            }}
        />
        <div>
        <Modal 
            title="Edit Case"
            visible={isModalVisible}
            width={1000}
            key={editCase? editCase.id:0}
            footer={null}
        >
            <ProForm
                onFinish={async (values) => {
                    console.log(values);
                    setIsModalVisible(false);
                    updateDataSource(values);    
                    // await updateCase(values);
                    message.success("Edit Success");
                }}
                // formRef={formRef}
                formkey="edit-case"
                grid={true}
                request={() => {
                    return {
                        name: editCase.name,
                        module: editCase.module,
                        level: editCase.level,
                        tag: editCase.tag,
                        auto: editCase.auto,
                        given: editCase.given,
                        when: editCase.when,
                        then: editCase.then,
                        card: props.index,
                    };
                }}
                // key={this.state.editData.id}
            >
                <Divider orientation="left" plain>Basic Infomation</Divider>
                <ProForm.Group>
                    <ProFormText name="name" label="Name" colProps={{ xl:6 }} rules={[{ required: true, message: 'This is a request field' }]}/>
                    <ProFormText name="module" label="Module" colProps={{ xl:12 }} rules={[{ required: true, message: 'This is a request field' }]}/>
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormSelect 
                        name="level"
                        label="Level"
                        rules={[{ required: true, message: 'This is a request field' }]}
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
                    />
                    <ProFormText name="tag" label="Tag" />
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
                </ProForm.Group>
                <Divider orientation="left" plain>Step Information</Divider>
                <ProFormTextArea name="given" label="Case - Given" rules={[{ required: true, message: 'This is a request field' }]} />
                <ProFormTextArea name="when" label="Case - When" rules={[{ required: true, message: 'This is a request field' }]} />
                <ProFormTextArea name="then" label="Case - Then" rules={[{ required: true, message: 'This is a request field' }]} />
                <Divider orientation="left" plain>Associated Information</Divider>
                <ProFormSelect 
                    name="card"
                    label="Associated Card"
                    disabled
                    mode="multiple"
                />
                <ProFormSelect 
                    name="script"
                    label="Associated Script"
                />
                <ProFormSelect 
                    name="bug"
                    label="Associated Bug"
                    mode="multiple"
                />
                <br />
            </ProForm>
        </Modal>
        </div>
    </>);
};

export default CaseTable;