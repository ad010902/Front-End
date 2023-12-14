import { Button, Flex, Table } from "antd";
import PageHeader from "./PageHeader";
import SearchBox from "./SearchBox";

export default function ManageContainer({
  title,
  onSearch,
  onAdd,
  selectedRowKeys,
  onSelectChange,
  columns,
  data,
  children,
}) {
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <>
      <PageHeader title={title} />
      <Flex justify="space-between">
        <SearchBox onSearch={onSearch} />
        <Button type="primary" onClick={onAdd}>
          Thêm
        </Button>
      </Flex>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      {children}
    </>
  );
}
