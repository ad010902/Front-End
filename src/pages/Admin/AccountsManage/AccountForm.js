import { Form, Input, Modal, Select, notification } from "antd";
import { useEffect } from "react";
import { notiMessages } from "../../../constants/messages";
import UserService from "../../../services/user.service";
import users from "../../../utils/fakeData/User";
import { RoleName } from "../../../constants";

export default function AccountForm({ title, open, onCancel, id }) {
  const [form] = Form.useForm();

  useEffect(() => {
    getInitalValues();
  }, [id]);

  const getInitalValues = async () => {
    if (id) {
      //   const user = await UserService.getUserById(id);
      const user = users[id - 1];
      form.setFieldValue("username", user.username);
      form.setFieldValue("email", user.email);
      form.setFieldValue("role", user.role[0]);
    } else {
      form.resetFields();
    }
  };

  const handleSubmit = () => {
    form.submit();
  };

  const handleFinish = async (values) => {
    try {
      if (!id) {
        const res = await UserService.createUser(values);

        notification.success({
          message: notiMessages.createSuccessfully,
          duration: 1,
        });
      } else {
        const res = await UserService.updateUser(id, values);

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
        <Form.Item
          name="username"
          label="Tên người dùng"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Chức vụ" rules={[{ required: true }]}>
          <Select
            options={Object.entries(RoleName).map(([value, key], index) => {
              if (index === 1 || index === 2) {
                return {
                  value,
                  label: key,
                };
              }
            })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
