import React from 'react'
import { Button, Tooltip, Tag } from 'antd'
import { DownOutlined, QuestionCircleOutlined, EllipsisOutlined } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table'

const statusMap = {
  0: {
    color: 'blue',
    text: '进行中',
  },
  1: {
    color: 'green',
    text: '健康',
  },
  2: {
    color: 'volcano',
    text: '风险',
  },
  3: {
    color: 'red',
    text: '超时',
  },
  4: {
    color: '',
    text: '未知',
  },
};

const tableListDataSource = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    line: 'XX-业务线',
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    owner: creators[Math.floor(Math.random() * creators.length)],
    status: statusMap[Math.floor(Math.random() * 10) % 5],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
  });
}

const columns = [
  {
    title: '业务线',
    width: 90,
    dataIndex: 'line',
    // render: (_) => <a>{_}</a>,
  },
  {
    title: '应用名称',
    width: 90,
    dataIndex: 'name',
    // render: (_) => <a>{_}</a>,
  },
  {
    title: '健康状态',
    width: 90,
    dataIndex: 'status',
    render: (_, record) => <Tag color={record.status.color}>{record.status.text}</Tag>,
  },
  {
    title: '维护人',
    width: 90,
    dataIndex: 'owner',
    // sorter: (a, b) => a.containers - b.containers,
  },

  {
    title: '漏洞情况',
    width: 240,
    search: false,
    children: [
        {
            title: '致命',
            dataIndex: 'critical',
            width: 60
        },
        {
            title: '高危',
            dataIndex: 'high',
            width: 60
        },
        {
            title: '中危',
            dataIndex: 'middle',
            width: 60
        },
        {
            title: '低危',
            dataIndex: 'low',
            width: 60
        }
    ]
  },
  {
    title: (
      <>
        扫描时间
        <Tooltip placement="top" title="最后一次扫描时间">
          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
        </Tooltip>
      </>
    ),
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: (a, b) => a.createdAt - b.createdAt,
  },
  {
    title: '操作',
    width: 164,
    key: 'option',
    valueType: 'option',
    render: () => [
      <a key="1">跟踪</a>,
      <a key="2">启动</a>,
      <a key="3">
        <EllipsisOutlined />
      </a>,
    ],
  },
];

const expandedRowRender = () => {
  const data = [];
  for (let i = 0; i < 3; i += 1) {
    data.push({
      key: i,
      name: 'fastjson',
      level: 'critical',
      scope: 'some project',
      suggestion: 'please update'
    });
  }
  return (
    <ProTable
      columns={[
        { title: '问题jar包名称', dataIndex: 'name', key: 'name' },
        { title: '危害级别', dataIndex: 'level', key: 'level' },
        { title: '影响范围', dataIndex: 'scope', key: 'scope' },
        { title: '修复建议', dataIndex: 'suggestion', key: 'suggestion' }
      ]}
      headerTitle={false}
      search={false}
      options={false}
      dataSource={data}
      pagination={false}
    />
  );
};

export default () => {
  return (
    <ProTable
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      expandable={{ expandedRowRender }}
      search={{
        labelWidth: 'auto',
      }}
      dateFormatter="string"
      options={false}
    />
  );
};