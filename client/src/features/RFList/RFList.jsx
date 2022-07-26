import { Progress, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { emptyIcon, logoIconLoading, iconExcel } from "../../const/svg";

export default function RFlist() {
  const [progressPercent, setProgressPercent] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progressPercent < 90) {
        setProgressPercent(progressPercent + 10);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [progressPercent]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width:100,
      render: (text, record,index) => {
        console.log(text, index,record);
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Disabled User",
      age: 99,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Disabled User",
      age: 99,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Disabled User",
      age: 99,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Disabled User",
      age: 99,
      address: "Sidney No. 1 Lake Park",
    },
  ];
  return (
    <div
      style={{
        width: `calc(100% - 256px`,
      }}
    >
      <div
        style={{
          height: 60,
          borderBottom: "1px solid #e3e1e1",
          display: "flex",
          alignItems: "center",
          padding: 16,
        }}
      >
        <span style={{ fontFamily: "Arial", fontSize: 16, fontWeight: 700 }}>
          Danh sách sách
        </span>
        <div
          style={{
            marginRight: 32,
            marginLeft: 32,
            height: 20,
            backgroundColor: "gray",
            width: 1,
          }}
        />
        <div style={{ marginRight: 12 }}>{iconExcel}</div>
        <span>Xuất excel</span>
      </div>
      {loading ? (
        <Progress strokeWidth={1} percent={progressPercent} showInfo={false} style={{position:'absolute',fontSize:0,zIndex:1,width:`calc(100% - 256px`}}/>
      ) : null}
      <Spin spinning={loading} indicator={logoIconLoading}>
        <Table
          // rowSelection={{
          //   type: selectionType,
          //   ...rowSelection,
          // }}
          columns={columns}
          dataSource={data}
          locale={{
            emptyText: loading ? <div /> : emptyIcon,
          }}
          pagination={false}
          scroll={{y:`calc(100vh - 200px)`}}
        />
      </Spin>
    </div>
  );
}
