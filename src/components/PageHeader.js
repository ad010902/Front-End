import { Typography } from "antd";

export default function PageHeader({ title }) {
  return <Typography.Title level={3}>{title}</Typography.Title>;
}
