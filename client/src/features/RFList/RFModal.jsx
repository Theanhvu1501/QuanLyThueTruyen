import { Button, Col, Form, Input, InputNumber, Modal, Row } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
export const RFModal = forwardRef((props, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [type, setType] = useState("Sach");
  const [promise, setPromise] = useState({});

  const [form] = Form.useForm();
  const col12 = {
    labelCol: { xl: 6 },
    wrapperCol: { xl: 18 },
  };
  useImperativeHandle(
    ref,
    () => {
      return {
        show: (isNew, data) => {
          console.log(data);
          form.resetFields();
          setIsNew(isNew);
          setShowModal(true);
          form.setFieldsValue(data);
          return new Promise(async (resolve, reject) => {
            setPromise({
              resolve,
              reject,
            });
          });
        },
      };
    },
    []
  );
  //Function
  const closeModal = (dataChange) => {
    setShowModal(false);
    promise.resolve({ dataChange: dataChange });
  };

  const onSave = async () => {
    //Save data
    const { api } = props;
    if (isNew) {
      await api.create(form.getFieldsValue());
    } else {
      await api.update(form.getFieldsValue());
    }
    closeModal(true);
  };

  const getType = (type) => {
    switch (type) {
      case "SachTaiCuaHang":
        return "Sách tại cửa hàng";
      case "KhachHang":
        return "Khách hàng";
      case "NhanVien":
        return "Nhân viên";
      case "ThongTinGiaoDich":
        return "Thông tin giao dịch";
      default:
        return "Sách";
    }
  };

  const getTitle = () => {
    return `${isNew ? "Thêm mới" : "Sửa"} ${getType(type)}`;
  };

  return (
    <Modal
      visible={showModal}
      title={getTitle()}
      onCancel={() => closeModal()}
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
              label="Tên"
              name="Ten"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              {...col12}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="GiaThue"
              name="GiaThue"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              {...col12}
            >
              <InputNumber style={{ width: "100%" }} />
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
              label="Thể loại"
              name="TheLoai"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              {...col12}
            >
              <Input />
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
            {isNew ? "Thêm" : "Sửa"}
          </Button>
          <Button
            type="primary"
            danger
            style={{ marginLeft: 16 }}
            onClick={closeModal}
          >
            Hủy
          </Button>
        </div>
      </Form>
    </Modal>
  );
});
