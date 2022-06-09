import React, { useState, useEffect } from 'react';
import { EditableProTable } from '@ant-design/pro-table';


const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

function EditableTable(props) {
    const [editableKeys, setEditableRowKeys] = useState([]);
    const [dataSource, setDataSource] = useState([...props.info.action]);

    // 每次渲染后都执行清理或者执行 effect 可能会导致性能问题。如果某些特定值在两次重渲染之间没有发生变化，
    // 你可以通知 React 跳过对 effect 的调用，只要传递数组作为 useEffect 的第二个可选参数即可
    useEffect(() => {
        console.log("handle:", dataSource);
        props.handle(dataSource);
    }, [dataSource]);

    const showType = () => {
        if (props.info.state == "desk check") {
            return ({
               case: {
                   text: 'Case',
                   status: 'case',
               },
               task: {
                   text: 'Task',
                   status: 'task',
               },
               bug: {
                   text: 'Bug',
                   status: 'bug',
               }
            });
        } else {
            return ({
                case: {
                    text: 'Case',
                    status: 'case',
                },
                task: {
                    text: 'Task',
                    status: 'task',
                },
             });
        }
    }

    const columns = [
        {
            title: 'Type',
            key: 'type',
            dataIndex: 'type',
            valueType: 'select',
            width: '15%',
            valueEnum: showType()
        },
        {
            title: 'content',
            key: 'content',
            dataIndex: 'content',
            width: '50%',
        },
        {
            title: 'Confirm',
            key: 'confirm',
            dataIndex: 'confirm',
            valueType: 'select',
            width: '15%',
            valueEnum: {
                create: {
                    text: '新建',
                    status: 'create',
                },
                confirm: {
                    text: '确认',
                    status: 'confirm',
                },
                complete: {
                    text: '完成',
                    status: 'complete',
                },
                delete: {
                    text: '删除',
                    status: 'delete',
                },
            },
        },
        {
            title: '操作',
            valueType: 'option',
            width: '20%',
            render: (text, record, _, action) => [
                <a key="editable" onClick={() => {
                    var _a;
                    (_a = action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.id);
                }}>
                    编辑
                </a>,
                // <a key="delete" onClick={() => {
                //     setDataSource(dataSource.filter((item) => item.id !== record.id));
                // }}>
                //     删除
                // </a>,
            ],
        },
    ];

    //非常重要，否则新增行缺少id，会导致无法编辑
    const add = () => {
        return {
            id: (Math.random() * 10000000).toFixed(0),
        }
    }

    const dataArr = data => {
        // {id:xx, index:1, type:'task', content:'xx', confirm:'create'}
        const newData = dataSource;
        setDataSource(dataSource);
    }
    
    return (<>
        <EditableProTable 
            rowKey="id" 
            // headerTitle={props.info}
            maxLength={5} 
            recordCreatorProps={{
                position: 'end',
                record: add(),
            }}
            columns={columns} 
            request={() => {
                return {
                    data: [...props.info.action],
                    success: true, 
                }
            }} 
            value={dataSource} 
            onChange={setDataSource}
            // controlled={true}
            editable={{
                type: 'multiple',
                editableKeys,
                onSave: async (rowKey, data) => {
                    // console.log(data);
                    await waitTime(1000);
                    dataArr(data);
                },
                onChange: setEditableRowKeys,
            }}
        />
    </>);
};

export default EditableTable;