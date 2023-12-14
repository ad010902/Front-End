import { Form, Input, Modal } from "antd";

export default function OrderForm({ title, open, onCancel }) {
  const [form] = Form.useForm();

  const handleSubmit = () => {};

  const handleFinish = () => {};
  return (
    <Modal open={open} title={title} onCancel={onCancel} onOk={handleSubmit}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Tên đơn hàng"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
