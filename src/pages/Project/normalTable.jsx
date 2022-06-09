import { Table, Tag } from 'antd';

function NormalTable(props) {

    const columns = [
        {
            title: 'content',
            key: 'content',
            dataIndex: 'content',
            width: '75%',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            width: '25%',
            // render: status => (
            //     <>
            //         {(status => {
            //             let color = "geekblue";
            //             if (status == "complete") {
            //                 color = "green";
            //             } else if (status == "delete") {
            //                 color = "volcano";
            //             }
            //             return (
            //                 <Tag color={color} key={status}>
            //                     {tag.toUpperCase()}
            //                 </Tag>
            //             )
            //         })}
            //     </>
            // )
  
        },
    ];
    
    return (<>
        <Table columns={columns} dataSource={props.data} pagination={false} />
    </>);
};

export default NormalTable;