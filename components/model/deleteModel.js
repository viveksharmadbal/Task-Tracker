import React from 'react';
import { Modal } from 'antd';

const DeleteConfirmationModal = ({ visible, onConfirm, onCancel, item }) => {
  return (
    <Modal
      title="Confirm Deletion"
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Yes, Delete"
      okType="danger"
      cancelText="No, Cancel"
    >
      <p>Are you sure you want to delete this {item}?</p>
    </Modal>
  );
};

export default DeleteConfirmationModal;
