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
    const [dataSource, setDataSource] = useState(props.data);

    const case_level = [1,2,3,4];
    const case_state = ["Created", "Passed", "Failed"];
    const risk_level = ["High", "Medium", "Low"];
    const risk_state = ["Created", "Solved", "Ignored"];
    const task_state = ["Created", "Completed", "Ignored"];
    const bug_level = ["Critical", "High", "Medium", "Low"];
    const bug_state = ["Created", "Confirmed", "In Dev", "Dev Done", "In QA", "Solved", "Ignored", "Recreated"];

    // 每次渲染后都执行清理或者执行 effect 可能会导致性能问题。如果某些特定值在两次重渲染之间没有发生变化，
    // 你可以通知 React 跳过对 effect 的调用，只要传递数组作为 useEffect 的第二个可选参数即可
    useEffect(() => {
        // console.log("handle:", dataSource);
        props.handle(dataSource);
    }, [dataSource]);

    const selectOptions = (options) => {
        var valueEnum = {};
        options.map(option => {
            valueEnum[option] = {
                text: option,
                status: option,
            }
        })
        return valueEnum;
    }

    const case_columns = [
        {
            title: 'Description',
            key: 'case',
            dataIndex: 'case',
            width: '50%',
        },
        {
            title: 'Level',
            key: 'level',
            dataIndex: 'level',
            valueType: 'select',
            width: '10%',
            valueEnum: selectOptions(case_level)
        },
        {
            title: 'Auto',
            key: 'auto',
            dataIndex: 'auto',
            valueType: 'select',
            width: '10%',
            valueEnum: {
                Y: {
                    text: "Y",
                    status: "Y",
                },
                N: {
                    text: "N",
                    status: "N",
                },
            }
        },
        {
            title: 'State',
            key: 'state',
            dataIndex: 'state',
            valueType: 'select',
            width: '15%',
            valueEnum: selectOptions(case_state)
        },
        {
            title: 'Action',
            valueType: 'option',
            width: '15%',
            render: (text, record, _, action) => [
                <a key="editable" onClick={() => {
                    var _a;
                    (_a = action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.id);
                }}>
                    Edit
                </a>,
            ],
        },
    ];

    const risk_columns = [
        {
            title: 'Description',
            key: 'risk',
            dataIndex: 'risk',
            width: '60%',
        },
        {
            title: 'Level',
            key: 'level',
            dataIndex: 'level',
            valueType: 'select',
            width: '10%',
            valueEnum: selectOptions(risk_level)
        },
        {
            title: 'State',
            key: 'state',
            dataIndex: 'state',
            valueType: 'select',
            width: '15%',
            valueEnum: selectOptions(risk_state)
        },
        {
            title: 'Action',
            valueType: 'option',
            width: '15%',
            render: (text, record, _, action) => [
                <a key="editable" onClick={() => {
                    var _a;
                    (_a = action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.id);
                }}>
                    Edit
                </a>,
            ],
        },
    ];

    const bug_columns = [
        {
            title: 'Description',
            key: 'bug',
            dataIndex: 'bug',
            width: '60%',
        },
        {
            title: 'Level',
            key: 'level',
            dataIndex: 'level',
            valueType: 'select',
            width: '10%',
            valueEnum: selectOptions(bug_level)
        },
        {
            title: 'State',
            key: 'state',
            dataIndex: 'state',
            valueType: 'select',
            width: '15%',
            valueEnum: selectOptions(bug_state)
        },
        {
            title: 'Action',
            valueType: 'option',
            width: '15%',
            render: (text, record, _, action) => [
                <a key="editable" onClick={() => {
                    var _a;
                    (_a = action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.id);
                }}>
                    Edit
                </a>,
            ],
        },
    ];

    const task_columns = [
        {
            title: 'Description',
            key: 'task',
            dataIndex: 'task',
            width: '70%',
        },
        {
            title: 'State',
            key: 'state',
            dataIndex: 'state',
            valueType: 'select',
            width: '15%',
            valueEnum: selectOptions(task_state)
        },
        {
            title: 'Action',
            valueType: 'option',
            width: '15%',
            render: (text, record, _, action) => [
                <a key="editable" onClick={() => {
                    var _a;
                    (_a = action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.id);
                }}>
                    Edit
                </a>,
            ],
        },
    ];

    const chooseColumns = () => {
        const type = props.type;
        if (type === "case") {
            return case_columns;
        } else if (type === "risk") {
            return risk_columns;
        } else if (type === "bug") {
            return bug_columns;
        } else if (type === "task") {
            return task_columns;
        }
    }

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
            maxLength={20} 
            recordCreatorProps={{
                position: 'end',
                record: add(),
            }}
            columns={chooseColumns()} 
            request={() => {
                return {
                    data: [...props.data],
                    success: true, 
                }
            }} 
            value={dataSource}
            onChange={setDataSource}
            editable={{
                type: 'multiple',
                editableKeys,
                onSave: async (rowKey, data) => {
                    await waitTime(1000);
                    dataArr(data);
                },
                onChange: setEditableRowKeys,
                actionRender: (row, config, dom) => [dom.save, dom.cancel],
            }}
        />
    </>);
};

export default EditableTable;