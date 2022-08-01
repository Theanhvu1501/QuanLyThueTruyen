import { message, Modal, Progress, Spin, Table } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import bookAPI from "../../api/bookAPI";
import bookStoreAPI from "../../api/bookStoreAPI";
import customerAPI from "../../api/customerAPI";
import rentAPI from "../../api/rentAPI";
import staffAPI from "../../api/staffAPI";
import storeAPI from "../../api/storeAPI";
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
  const [dataCuaHang, setDataCuaHang] = useState([]);
  const [dataSach, setDataSach] = useState([]);
  const [dataKhachHang, setDataKhachHang] = useState([]);
  const [dataNhanVien, setDataNhanVien] = useState([]);

  const modalRef = useRef();

  const apiService = () => {
    const { path } = props;
    if (path.includes("ThongTinGiaoDich")) return rentAPI;
    if (path.includes("KhachHang")) return customerAPI;
    if (path.includes("NhanVien")) return staffAPI;
    if (path.includes("SachTaiCuaHang")) return bookStoreAPI;
    if (path.includes("CuaHang")) return storeAPI;
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
    setSelectedRows([]);

    const api = apiService();
    const [data, dataCuaHang, dataSach, dataNhanVien, dataKhachHang] =
      await Promise.all([
        api.getAll(),
        ["SachTaiCuaHang", "NhanVien", "ThongTinGiaoDich"].includes(props.path)
          ? storeAPI.getAll()
          : [],
        ["SachTaiCuaHang", "ThongTinGiaoDich"].includes(props.path)
          ? bookAPI.getAll()
          : [],
        ["ThongTinGiaoDich"].includes(props.path) ? staffAPI.getAll() : [],
        ["ThongTinGiaoDich"].includes(props.path) ? customerAPI.getAll() : [],
      ]);
    setLoading(false);
    setData(data);
    setDataCuaHang(dataCuaHang);
    setDataSach(dataSach);
    setDataNhanVien(dataNhanVien);
    setDataKhachHang(dataKhachHang);
  };

  //Modal confirm

  const onDelete = async () => {
    Modal.confirm({
      title: "Xóa",
      content: "Bạn có chắc chắn muốn xóa ?",
      cancelText: "Hủy",
      okText: "Đồng ý",
      onOk: async () => {
        const api = apiService();
        try {
          await Promise.all(
            selectedRows.map((data) => {
              return api.delete(data.Id);
            })
          );
          message.success(`Xóa thành công`);
          fetchAPI();
        } catch (e) {
          message.error("error");
        }
      },
    });
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

  const titleOpenModal = () => {
    const { path } = props;
    if (path === "SachTaiCuaHang") return "Còn lại";
    if (path === "Thue") return "Thuê";
    return "Tên";
  };

  const title = () => {
    const { path } = props;
    if (path === "SachTaiCuaHang") return "ConLai";
    if (path === "Thue") return "Thue";
    return "Ten";
  };

  let columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 100,
      render: (text, record, index) => {
        return (
          <span
            style={{ cursor: "pointer" }}
            onClick={async () => {
              const result = await modalRef.current.show(false, record);
              if (result.dataChange) {
                fetchAPI();
              }
            }}
          >
            {" "}
            {index + 1}
          </span>
        );
      },
    },
    {
      title: titleOpenModal(),
      dataIndex: title(),
    },
  ];
  const getColumns = () => {
    const { path } = props;
    if (path === "Sach") {
      columns = columns.concat([
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
      ]);
    }

    if (path === "CuaHang") {
      columns = columns.concat([
        {
          title: "Địa chi",
          dataIndex: "DiaChi",
        },
      ]);
    }

    if (path === "NhanVien") {
      columns = columns.concat([
        {
          title: "Chức vụ",
          dataIndex: "ChucVu",
        },
        {
          title: "Cửa Hàng",
          dataIndex: "IdCuaHang",
          render: (text, record, index) => {
            return (
              <span>
                {dataCuaHang.find((i) => i.Id === record.IdCuaHang)?.Ten}
              </span>
            );
          },
        },
      ]);
    }

    if (path === "KhachHang") {
      columns = columns.concat([
        {
          title: "Địa chỉ",
          dataIndex: "DiaChi",
        },
        {
          title: "SDT",
          dataIndex: "SDT",
        },
      ]);
    }

    if (path === "SachTaiCuaHang") {
      columns = columns.concat([
        {
          title: "Sách",
          dataIndex: "IdSach",
          render: (text, record, index) => {
            return (
              <span>{dataSach.find((i) => i.Id === record.IdSach)?.Ten}</span>
            );
          },
        },
        {
          title: "CuaHang",
          dataIndex: "IdCuaHang",
          render: (text, record, index) => {
            return (
              <span>
                {dataCuaHang.find((i) => i.Id === record.IdCuaHang)?.Ten}
              </span>
            );
          },
        },
      ]);
    }

    if (path === "ThongTinGiaoDich") {
      return [
        {
          title: "STT",
          dataIndex: "stt",
          width: 100,
          render: (text, record, index) => {
            return <span> {index + 1}</span>;
          },
        },
        {
          title: "Ngày thuê",
          dataIndex: "NgayThue",
          render: (text, recode, index) => {
            return (
              <span>
                {recode.NgayThue
                  ? moment(recode.NgayThue).format("DD/MM/YYYY")
                  : ""}
              </span>
            );
          },
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
          title: "Ngày trả",
          dataIndex: "NgayTra",
          render: (text, recode, index) => {
            return (
              <span>
                {recode.NgayTra
                  ? moment(recode.NgayTra).format("DD/MM/YYYY")
                  : ""}
              </span>
            );
          },
        },
        {
          title: "Sách",
          dataIndex: "IdSach",
          render: (text, record, index) => {
            return (
              <span>{dataSach.find((i) => i.Id === record.IdSach)?.Ten}</span>
            );
          },
        },
        {
          title: "CuaHang",
          dataIndex: "IdCuaHang",
          render: (text, record, index) => {
            return (
              <span>
                {dataCuaHang.find((i) => i.Id === record.IdCuaHang)?.Ten}
              </span>
            );
          },
        },
        {
          title: "Nhân viên",
          dataIndex: "IdNhanVien",
          render: (text, record, index) => {
            return (
              <span>
                {dataNhanVien.find((i) => i.Id === record.IdNhanVien)?.Ten}
              </span>
            );
          },
        },
        {
          title: "Khách hàng",
          dataIndex: "IdKhachHang",
          render: (text, record, index) => {
            return (
              <span>
                {dataKhachHang.find((i) => i.Id === record.IdKhachHang)?.Ten}
              </span>
            );
          },
        },
      ];
    }

    return columns;
  };

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

        {props.path !== "ThongTinGiaoDich" ?? (
          <>
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
          </>
        )}
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
          rowSelection={
            props.path !== "ThongTinGiaoDich" && {
              type: "checkbox",
              ...rowSelection,
            }
          }
          rowKey="Id"
          columns={getColumns()}
          dataSource={data}
          locale={{
            emptyText: loading ? <div /> : emptyIcon,
          }}
          pagination={false}
          scroll={{ y: `calc(100vh - 200px)` }}
        />
        <RFModal
          ref={modalRef}
          api={apiService()}
          type={props.path}
          dataCuaHang={dataCuaHang}
          dataSach={dataSach}
        />
      </Spin>
    </div>
  );
}
