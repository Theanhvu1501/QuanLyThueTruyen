import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
} from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import bookAPI from "../../api/bookAPI";
import customerAPI from "../../api/customerAPI";
import rentAPI from "../../api/rentAPI";
import staffAPI from "../../api/staffAPI";
import storeAPI from "../../api/storeAPI";
export const RFNewForm = forwardRef((props, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [dataCuaHang, setDataCuaHang] = useState([]);
  const [dataSach, setDataSach] = useState([]);
  const [dataKhachHang, setDataKhachHang] = useState([]);
  const [dataNhanVien, setDataNhanVien] = useState([]);

  const fetchData = async () => {
    const [dataCuaHang, dataSach, dataKhachHang, dataNhanVien] =
      await Promise.all([
        storeAPI.getAll(),
        bookAPI.getAll(),
        customerAPI.getAll(),
        staffAPI.getAll(),
      ]);

    setDataCuaHang(dataCuaHang);
    setDataSach(dataSach);
    setDataKhachHang(dataKhachHang);
    setDataNhanVien(dataNhanVien);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [form] = Form.useForm();
  const col12 = {
    labelCol: { xl: 6 },
    wrapperCol: { xl: 18 },
  };
  useImperativeHandle(
    ref,
    () => {
      return {
        show: () => {
          form.resetFields();
          setShowModal(true);
        },
      };
    },
    []
  );
  //Function
  const closeModal = () => {
    setShowModal(false);
  };

  const onSave = async () => {
    //Save data
    try {
      await rentAPI.create(form.getFieldsValue());
      message.success(`Thêm mới thành công`);
      closeModal();
    } catch {
      message.error(`Error.`);
    }
  };

  return (
    <Modal
      visible={showModal}
      title={"Thông tin giao dịch"}
      onCancel={closeModal}
      style={{ top: 15 }}
      destroyOnClose={false}
      footer={false}
      width={window.innerWidth - 10 > 1138 ? 1350 : window.innerWidth - 10}
      bodyStyle={{
        overflowY: "auto",
      }}
    >
      <Form labelAlign="left" form={form}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Giá Thuê"
              name="GiaThue"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              {...col12}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ngày Thuê"
              name="NgayThue"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              {...col12}
            >
              <DatePicker format={"DD/MM/YYYY"} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Đặt cọc"
              name="DatCoc"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              {...col12}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ngày trả"
              name="NgayTra"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              {...col12}
            >
              <DatePicker format={"DD/MM/YYYY"} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Sách"
              name="IdSach"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              {...col12}
            >
              <Select>
                {(dataSach || []).map((i) => {
                  return <Select.Option value={i.Id}>{i.Ten}</Select.Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Cửa hàng"
              name="IdCuaHang"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              {...col12}
            >
              <Select>
                {(dataCuaHang || []).map((i) => {
                  return <Select.Option value={i.Id}>{i.Ten}</Select.Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Nhân viên"
              name="IdNhanVien"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              {...col12}
            >
              <Select>
                {(dataNhanVien || []).map((i) => {
                  return <Select.Option value={i.Id}>{i.Ten}</Select.Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Khách hàng"
              name="IdKhachHang"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              {...col12}
            >
              <Select>
                {(dataKhachHang || []).map((i) => {
                  return <Select.Option value={i.Id}>{i.Ten}</Select.Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label=""
          name="Id"
          rules={[{ required: true, message: "Please input your username!" }]}
          style={{ display: "none" }}
          {...col12}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <div style={{ float: "right" }}>
          <Button type="primary" onClick={onSave}>
            Thêm
          </Button>
          <Button
            type="primary"
            danger
            style={{ marginLeft: 16 }}
            onClick={() => closeModal()}
          >
            Hủy
          </Button>
        </div>
      </Form>
    </Modal>
  );
});
