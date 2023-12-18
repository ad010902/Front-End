import {
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { orders } from "../utils/fakeData/Order";
import { formMessages } from "../constants/messages";

export default function OrderForm({ title, open, onCancel, id }) {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    id && getInitialData();
  }, [id]);

  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  const getInitialData = async () => {
    const order = orders.find((o) => o.idOrder === id);
    const [width, height, length] = order.size?.split("x");
    order.size = {
      width,
      height,
      length,
    };

    console.log(order);
    setInitialValues(order);
  };

  const handleSubmit = () => {
    form.submit();
  };

  const handleFinish = (values) => {
    values.size = Object.values(values.size)
      .map((s) => s ?? 0)
      .join("x");
    console.log(values);
  };
  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      onOk={handleSubmit}
      width={760}
    >
      <Form
        form={form}
        initialValues={{
          ...initialValues,
        }}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          name="name"
          label="Tên đơn hàng"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Typography.Title level={4}>Người gửi</Typography.Title>
        <Flex gap={16} style={{ width: "100%" }}>
          <Form.Item
            name="giverName"
            label="Tên"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="giverPhone"
            label="Số điện thoại"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          >
            <Input />
          </Form.Item>
        </Flex>
        <Form.Item
          name="addressIfS"
          label="Địa chỉ"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Typography.Title level={4}>Người nhận</Typography.Title>
        <Flex gap={16} style={{ width: "100%" }}>
          <Form.Item
            name="receiverName"
            label="Tên"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="receiverPhone"
            label="Số điện thoại"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          >
            <Input />
          </Form.Item>
        </Flex>
        <Form.Item
          name="addressIfR"
          label="Địa chỉ"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Typography.Title level={4}>Thông tin đơn hàng</Typography.Title>
        <Flex gap={16}>
          <Form.Item name="typeOrder" label="Loại hàng">
            <Radio.Group defaultValue={"Tài liệu"}>
              <Radio value={"Tài liệu"}>Tài liệu</Radio>
              <Radio value={"Hàng hóa"}>Hàng hóa</Radio>
            </Radio.Group>
          </Form.Item>
          <Flex gap={16}>
            <Form.Item
              name="weight"
              label="Khối lượng"
              rules={[
                {
                  pattern: new RegExp(/^\d+.\d+$/),
                  message: formMessages.weight.pattern,
                },
              ]}
            >
              <Input addonAfter={"kg"} />
            </Form.Item>
            <Form.Item label="Kích thước">
              <Space.Compact>
                <Form.Item
                  tooltip={{ title: "Chiều rộng" }}
                  name={["size", "width"]}
                >
                  <InputNumber defaultValue={0} min={0} />
                </Form.Item>
                <Form.Item
                  tooltip={{ title: "Chiều cao" }}
                  name={["size", "height"]}
                >
                  <InputNumber defaultValue={0} min={0} />
                </Form.Item>
                <Form.Item
                  tooltip={{ title: "Chiều dài" }}
                  name={["size", "length"]}
                >
                  <InputNumber defaultValue={0} min={0} />
                </Form.Item>
              </Space.Compact>
            </Form.Item>
          </Flex>
        </Flex>
        <Form.Item name="specialServer" label="Dịch vụ đặc biệt">
          <Input.TextArea />
        </Form.Item>
        <Typography.Title level={4}>Cước giá</Typography.Title>
        <Flex vertical>
          <Flex justify="space-between">
            <Typography.Text strong>Cước chính: </Typography.Text>
            <Form.Item name={"mainPrice"} defaultValue={0}>
              <InputNumber defaultValue={0} min={0} />
            </Form.Item>
          </Flex>
          <Flex justify="space-between">
            <Typography.Text strong>Phụ phí: </Typography.Text>
            <Form.Item name={"extraPrice"} defaultValue={0}>
              <InputNumber defaultValue={0} min={0} />
            </Form.Item>
          </Flex>
          <Flex justify="space-between">
            <Typography.Title level={5}>Tổng cước (gồm VAT): </Typography.Title>
            <Form.Item name={"price"} defaultValue={0}>
              <InputNumber defaultValue={0} min={0} />
            </Form.Item>
          </Flex>
        </Flex>
      </Form>
    </Modal>
  );
}
