import { Form, Input, Modal, Select, notification } from "antd";
import { useEffect, useState } from "react";
import managers from "../../../utils/fakeData/Manager";
import * as GatheringLocationService from "../../../services/gatherLocation.service";
import * as TransLocalService from "../../../services/transLocal.service";
import { notiMessages } from "../../../constants/messages";
import transLocaltions from "../../../utils/fakeData/TransLocation";

export default function CreateOrderForm({ title, open, onCancel, id }) {
  const [managerOptions, setManagerOptions] = useState([]);
  const [gatherOptions, setGatherOptions] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    getTransManagerOptions();
    getTransGatherLocalOptions();
  }, []);

  useEffect(() => {
    getInitalValues();
  }, [id]);

  const getTransGatherLocalOptions = async (keyword) => {
    const gatherLocals = await GatheringLocationService.getGatherLocations(
      keyword,
    );

    const opts = gatherLocals.map((gatherLocal) => {
      return {
        value: gatherLocal.nameGather,
        label: gatherLocal.nameGather,
      };
    });

    setGatherOptions(opts);
  };

  const getTransManagerOptions = async () => {
    const res = [...managers];

    const opts = res.map((manager) => {
      return {
        value: manager.username,
        label: manager.username,
      };
    });

    setManagerOptions(opts);
  };

  const getInitalValues = async () => {
    if (id) {
      //   const transLocal = await TransLocalService.getTransLocalById(id);
      const transLocal = transLocaltions[id - 1];
      form.setFieldValue("orderId", transLocal.nameTrans);
      form.setFieldValue("senderName", transLocal.nameTrans);
      form.setFieldValue("recipientName", transLocal.nameTrans);
      form.setFieldValue("orderType", transLocal.phone);
      form.setFieldValue("cost", transLocal.email);
      form.setFieldValue("weight", transLocal.address);
      form.setFieldValue("status", transLocal.managerTrans.username);
      form.setFieldValue("gatherLocationCurrent", transLocal.gatherTrans.nameGather);
      form.setFieldValue("gatherLocationSendTo", transLocal.gatherTrans.nameGather);
    } else {
      form.resetFields();
    }
  };

  const handleChangeManager = (value) => {};

  const handleSearchManager = (value) => {};

  const handleChangeGather = (value) => {};

  const handleSearchGather = (value) => {
    getTransGatherLocalOptions(value);
  };

  const handleSubmit = () => {
    form.submit();
  };

  const handleFinish = async (values) => {
    try {
      if (!id) {
        const res = await TransLocalService.createTransLocal(values);

        notification.success({
          message: notiMessages.createSuccessfully,
          duration: 1,
        });
      } else {
        const res = await TransLocalService.updateTransLocal(id, values);

        notification.success({
          message: notiMessages.updateSuccessfully,
          duration: 1,
        });
      }
      onCancel();
    } catch (error) {
      notification.error({
        message: notiMessages.error,
        duration: 1,
      });
    }
  };
  return (
    <Modal open={open} title={title} onCancel={onCancel} onOk={handleSubmit}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="orderId" label="Mã đơn hàng" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="senderName"
          label="Tên người gửi"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="recipientName"
          label="Tên người nhận"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="orderType"
          label="Loại hàng gửi"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="cost"
          label="Cước"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="weight"
          label="Khối lượng hàng"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gatherLocationCurrent"
          label="Tên điểm tập kết/ giao dịch hiên tại"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="gatherLocationTo"
          label="Tên điểm tập kết/ giao dịch đích"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            onChange={handleChangeManager}
            onSearch={handleSearchManager}
            options={managerOptions}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
