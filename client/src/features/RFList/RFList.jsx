import { message, Progress, Spin, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import bookAPI from "../../api/bookAPI";
import bookStoreAPI from "../../api/bookStoreAPI";
import customerAPI from "../../api/customerAPI";
import rentAPI from "../../api/rentAPI";
import staffAPI from "../../api/staffAPI";
import {
  emptyIcon,
  logoIconLoading,
  iconExcel,
  addIcon,
  deleteIcon,
} from "../../const/svg";
import { RFModal } from "./RFModal";

export default function RFlist(props) {
  const [progressPercent, setProgressPercent] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const modalRef = useRef();

  const apiService = () => {
    const { path } = props;
    if (path.includes("ThongTinGiaoDich")) return rentAPI;
    if (path.includes("KhachHang")) return customerAPI;
    if (path.includes("NhanVien")) return staffAPI;
    if (path.includes("SachTaiCuaHang")) return bookStoreAPI;
    return bookAPI;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (progressPercent < 90) {
        setProgressPercent(progressPercent + 10);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [progressPercent]);

  //useEffac
  const fetchAPI = async () => {
    setLoading(true);
    const api = apiService();
    const data = await api.getAll();
    setLoading(false);
    setData(data);
  };

  const onDelete = async () => {
    console.log(selectedRows);
    const api = apiService();
    try {
      await Promise.all(
        selectedRows.map((data) => {
          return api.delete(data.Id);
        })
      );
    } catch (e) {
      message.error("error");
    }
  };
  //Fetch api
  useEffect(() => {
    fetchAPI();
  }, [props.path]);

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
      title: "Tên",
      dataIndex: "Ten",
      render: (text, record, index) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={async () => {
            const result = await modalRef.current.show(false, record);
            if (result.dataChange) {
              fetchAPI();
            }
          }}
        >
          {record.Ten}
        </span>
      ),
    },
    {
      title: "Giá thuê",
      dataIndex: "GiaThue",
    },
    {
      title: "Đặt cọc",
      dataIndex: "DatCoc",
    },
    {
      title: "TheLoai",
      dataIndex: "TheLoai",
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
          onClick={async () => {
            const result = await modalRef.current.show(true);
            if (result.dataChange) {
              fetchAPI();
            }
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
            <span style={{ cursor: "pointer" }} onClick={() => onDelete()}>
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
          rowKey="Id"
          columns={columns}
          dataSource={data}
          locale={{
            emptyText: loading ? <div /> : emptyIcon,
          }}
          pagination={false}
          scroll={{ y: `calc(100vh - 200px)` }}
        />
        <RFModal ref={modalRef} api={apiService()} />
      </Spin>
    </div>
  );
}
