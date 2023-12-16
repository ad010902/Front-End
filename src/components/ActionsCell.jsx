import { DeleteOutlined, EditOutlined, EyeFilled } from "@ant-design/icons";
import { Button, Space } from "antd";

export default function ActionsCell({ onEdit, onDelete, record }) {
  return (
    <Space>
      <Button icon={<EyeFilled />} />
      <Button
        onClick={() => onEdit(record._id)}
        icon={<EditOutlined />}
        type="primary"
      />
      <Button
        onClick={() => onDelete(record._id)}
        icon={<DeleteOutlined />}
        danger
        type="primary"
      />
    </Space>
  );
}
