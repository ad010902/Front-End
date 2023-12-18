import { DeleteOutlined, EditOutlined, EyeFilled } from "@ant-design/icons";
import { Button, Space } from "antd";

export default function ActionsCell({
  onShow,
  onEdit,
  onDelete,
  record,
  hasShow = true,
  hasEdit = true,
  hasDelete = true,
}) {
  return (
    <Space>
      {hasShow && <Button onClick={() => onShow()} icon={<EyeFilled />} />}
      {hasEdit && (
        <Button
          onClick={() => onEdit(record._id)}
          icon={<EditOutlined />}
          type="primary"
        />
      )}
      {hasDelete && (
        <Button
          onClick={() => onDelete(record._id)}
          icon={<DeleteOutlined />}
          danger
          type="primary"
        />
      )}
    </Space>
  );
}
