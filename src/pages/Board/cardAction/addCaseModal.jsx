import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Divider, Modal, message } from 'antd';
import ProForm, { ProFormSelect, ProFormTextArea, ProFormText, ProFormRadio } from '@ant-design/pro-form';


function AddCaseModel(props, ref){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState();

    useImperativeHandle(ref, () => ({
        data,
        showAddModal: () => {
            setIsModalVisible(true);
        }
    }))

    // const showAddModal = () => {
    //     setIsModalVisible(true);
    // };

    // const handleOk = () => {
    //     setIsModalVisible(false);
    // };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    
    return (<>
        <Modal 
            title="Create a new case"
            visible={isModalVisible}
            // onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
            // key={editCase? editCase.id:0}
            footer={null}
        >
            <ProForm
                onFinish={async (values) => {
                    setData(values);
                    props.updateCase([values]);
                    setIsModalVisible(false);
                    message.success("Add Success");
                }}
                // formRef={formRef}
                formkey="add-case"
                grid={true}
                preserve={false}
                request={() => {
                    return {
                        card: props.index,
                    };
                }}
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
                                label: "P0",
                            },
                            {
                                value: 2,
                                label: "P1",
                            },
                            {
                                value: 3,
                                label: "P2",
                            },
                            {
                                value: 4,
                                label: "P3",
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
                    colProps={{ xl:8 }}
                    mode="multiple"
                    colProps={{ xl:6 }}
                />
                <ProFormSelect 
                    name="script"
                    label="Associated Script"
                    colProps={{ xl:8 }}
                />
                <ProFormSelect 
                    name="bug"
                    label="Associated Bug"
                    colProps={{ xl:8 }}
                    mode="multiple"
                />
                <br />
            </ProForm>
        </Modal>
    </>);
};

AddCaseModel = forwardRef(AddCaseModel);

export default AddCaseModel;