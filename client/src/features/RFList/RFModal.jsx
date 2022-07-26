import { Modal } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

export const ErrorModal = forwardRef(({}, ref) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  useImperativeHandle(
    ref,
    () => {
      return {
        show: (errors) => {
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

 

  return (
    <Modal
      visible={showModal}
      title={`Lỗi tệp dữ liệu`}
      onCancel={closeModal}
      style={{ top: 15 }}
      destroyOnClose={false}
      footer={false}
      width={window.innerWidth - 10 > 1138 ? 1350 : window.innerWidth - 10}
      bodyStyle={{
        overflowY: 'auto',
      }}
    >
      <div>Hello Modal</div>
    </Modal>
  );
});
