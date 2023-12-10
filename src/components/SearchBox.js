import { SearchOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

export default function SearchBox({ onSearch }) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.submit();
  };

  return (
    <Form
      style={{ width: "40%" }}
      name="search-form"
      form={form}
      onFinish={onSearch}
    >
      <Form.Item name="keyword">
        <Input addonAfter={<SearchOutlined onClick={handleSubmit} />} />
      </Form.Item>
    </Form>
  );
}
