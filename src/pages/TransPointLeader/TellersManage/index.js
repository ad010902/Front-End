import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Flex, Space, Table, notification } from "antd";
import { DeleteOutlined, EditOutlined, EyeFilled } from "@ant-design/icons";
import PageHeader from "../../../components/PageHeader";
import SearchBox from "../../../components/SearchBox";
import { notiMessages } from "../../../constants/messages";
import UserService from "../../../services/user.service";
import users from "../../../utils/fakeData/User";
import TellerForm from "./TellerForm";
const TellersManage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(0);
  const [data, setData] = useState([]);
  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingId(0);
  }, []);

  useEffect(() => {
    getData();
  }, [handleCloseForm]);

  const getData = async (keyword) => {
    // const res = await UserService.getUsers(keyword);
    const res = users;
    setData(res);
  };

  const columns = useMemo(() => {
    return [
      {
        title: "Tên người dùng",
        dataIndex: "username",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Thao tác",
        dataIndex: "actions",
        render: (_, record) => {
          return (
            <Space>
              <Button icon={<EyeFilled />} />
              <Button
                onClick={() => handleEdit(record._id)}
                icon={<EditOutlined />}
                type="primary"
              />
              <Button
                onClick={() => handleDelete(record._id)}
                icon={<DeleteOutlined />}
                danger
                type="primary"
              />
            </Space>
          );
        },
      },
    ];
  }, [data]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSearch = async ({ keyword }) => {
    await getData(keyword);
  };

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await UserService.deleteUserById(id);
      getData();
      notification.success({
        message: notiMessages.deleteSuccessfully,
        duration: 1,
      });
    } catch (error) {
      notification.error({
        message: notiMessages.error,
        duration: 1,
      });
    }
  };

  const handleEdit = (id) => {
    setShowForm(true);
    setEditingId(id);
  };
  return (
    <>
      <PageHeader title={"Giao dịch viên"} />
      <Flex justify="space-between">
        <SearchBox onSearch={handleSearch} />
        <Button type="primary" onClick={handleAdd}>
          Thêm
        </Button>
      </Flex>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      <TellerForm
        open={showForm}
        onCancel={handleCloseForm}
        title={(editingId ? "Chỉnh sửa" : "Thêm") + " tài khoản"}
        id={editingId}
      />
    </>
  );
};
export default TellersManage;
