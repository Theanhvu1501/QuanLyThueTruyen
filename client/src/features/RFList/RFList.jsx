import { Progress, Spin, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  emptyIcon,
  logoIconLoading,
  iconExcel,
  addIcon,
  deleteIcon,
} from "../../const/svg";
import { RFModal } from "./RFModal";

export default function RFlist() {
  const [progressPercent, setProgressPercent] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);

  const [loading, setLoading] = useState(false);
  const modalRef = useRef();
  useEffect(() => {
    const interval = setInterval(() => {
      if (progressPercent < 90) {
        setProgressPercent(progressPercent + 10);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [progressPercent]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 100,
      render: (text, record, index) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record, index) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            modalRef.current.show();
          }}
        >
          {record.name}
        </span>
      ),
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
        <div
          style={{
            marginRight: 32,
            marginLeft: 32,
            height: 20,
            backgroundColor: "gray",
            width: 1,
          }}
        />
        <div style={{ marginRight: 12 }}>{addIcon}</div>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            modalRef.current.show(true);
          }}
        >
          Thêm
        </span>
        {selectedRows.length > 0 && (
          <>
            {" "}
            <div
              style={{
                marginRight: 32,
                marginLeft: 32,
                height: 20,
                backgroundColor: "gray",
                width: 1,
              }}
            />
            <div style={{ marginRight: 12 }}>{deleteIcon}</div>
            <span style={{ cursor: "pointer" }} onClick={() => {}}>
              Delete
            </span>
          </>
        )}
      </div>
      {loading ? (
        <Progress
          strokeWidth={1}
          percent={progressPercent}
          showInfo={false}
          style={{
            position: "absolute",
            fontSize: 0,
            zIndex: 1,
            width: `calc(100% - 256px`,
          }}
        />
      ) : null}
      <Spin spinning={loading} indicator={logoIconLoading}>
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          locale={{
            emptyText: loading ? <div /> : emptyIcon,
          }}
          pagination={false}
          scroll={{ y: `calc(100vh - 200px)` }}
        />
        <RFModal ref={modalRef} />
      </Spin>
    </div>
  );
}
