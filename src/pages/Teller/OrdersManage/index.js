import { useMemo, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import { Button, Flex, Space } from "antd";
import { DeleteOutlined, EditOutlined, EyeFilled } from "@ant-design/icons";
import ActionsCell from "../../../components/ActionsCell";
import SearchBox from "../../../components/SearchBox";
import ManageContainer from "../../../components/ManageContainer";

export default function OrdersManage() {
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const columns = useMemo(() => {
    return [
      {
        title: "Thao tác",
        dataIndex: "actions",
        render: (_, record) => {
          return (
            <ActionsCell
              onEdit={handleEdit}
              onDelete={handleDelete}
              record={record}
            />
          );
        },
      },
    ];
  }, [data]);

  const getData = async (keyword) => {};

  const handleEdit = (orderId) => {};

  const handleDelete = (orderId) => {};

  const handleSearch = async ({ keyword }) => {
    await getData(keyword);
  };

  const handleAdd = () => {};

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  return (
    <ManageContainer
      title={"Đơn hàng"}
      data={data}
      selectedRowKeys={selectedRowKeys}
      onSelectChange={onSelectChange}
      columns={columns}
      onAdd={handleAdd}
      onSearch={handleSearch}
    ></ManageContainer>
  );
}
