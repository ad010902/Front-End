import { Breadcrumb } from "antd";

export default function CustomBreadCrumb({ breadcrumbItems }) {
  return (
    <Breadcrumb
      style={{
        margin: "16px 0",
      }}
    >
      {breadcrumbItems?.map((breadcrumbItem) => {
        return (
          <Breadcrumb.Item key={breadcrumbItem}>
            {breadcrumbItem}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
