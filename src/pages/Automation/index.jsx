import React, { Component, useState, useEffect } from 'react';
import { Tree } from 'antd';
import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormText, ProFormSelect, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form';
import { listTags, showCases } from '@/services/ant-design-pro/api';


class Automation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            name: "",
        };
    }
    
    async componentWillMount() {
    }

    render() {
        return (
            <div>
                <ProCard split="vertical">
                    <ProCard title="执行准备区" colSpan="50%" gutter="100%" >
                        <ProForm
                            onFinish={async (values) => {
                                // console.log(values);
                                const msg = await showCases({tag: values});
                                await this.setState({
                                    cases: msg.data,
                                    name: msg.filter
                                })
                                message.success("提交成功");
                            }}
                            formkey="select-tags"
                            // key={this.state.editData.id}
                        >
                            <ProFormSelect 
                                // Antd踩坑：不同于Select组件，onDropdownVisibleChange等API都是失效的
                                name="tag"
                                key="select-tag"
                                mode="multiple"
                                allowClear
                                request={async () => {
                                    const msg = await listTags();
                                    return msg.data;
                                }}
                                placeholder="Please select the tags"
                            />
                        </ProForm>
                        <br />
                        <Tree
                            checkable
                            treeData={this.state.cases}
                            key={this.state.name}
                        />
                    </ProCard>
                    <ProCard split="horizontal">
                        <ProCard title="执行启动区" gutter="60%">
                        </ProCard>
                        <ProCard title="结果查看区" gutter="40%">
                        </ProCard>
                    </ProCard>
                </ProCard>
            </div>  
        )
    }
}

export default Automation;