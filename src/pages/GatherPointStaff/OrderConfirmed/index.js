import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Flex, Space, Table, notification } from "antd";
import { DeleteOutlined, EditOutlined, EyeFilled } from "@ant-design/icons";
import PageHeader from "../../../components/PageHeader";
import SearchBox from "../../../components/SearchBox";
import { notiMessages } from "../../../constants/messages";
import * as TransLocalService from "../../../services/transLocal.service";
import TransLocalForm from "./TransLocalForm";
import transLocaltions from "../../../utils/fakeData/TransLocation";
import SeeOrderForm from "./SeeOrderForm";
import CreateOrderForm from "./CreateOrderForm";
const OrderNotConfirm = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSeeOrderForm, setShowSeeOrderForm] = useState(false);
  const [editingId, setEditingId] = useState(0);
  const [data, setData] = useState([]);
  const handleCloseForm = useCallback(() => {
    setShowCreateForm(false);
    showSeeOrderForm(false)
    setEditingId(0);
  }, []);

  useEffect(() => {
    getData();
  }, [handleCloseForm]);

  const getData = async (keyword) => {
    // const res = await TransLocalService.getTransLocals(keyword);
    const res = transLocaltions;
    setData(res);
  };

  const columns = useMemo(() => {
    return [
      {
        title: "Mã đơn hàng",
        dataIndex: "orderId",
      },
      {
        title: "Tên người gửi",
        dataIndex: "senderName",
      },
      {
        title: "Tên người nhận",
        dataIndex: "recipientName",
      },
      {
        title: "Loại hàng gửi",
        dataIndex: "orderType",
      },
      {
        title: "Cước",
        dataIndex: "cost",
      },
      {
        title: "Khối lượng hàng",
        dataIndex: "weight",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
      },
      {
        title: "Tên điểm tập kết gửi đơn hàng",
        dataIndex: "gatherLocationSend",
        render: (_, record) => {
          // return record.managerTrans.username;
        },
      },
    //   {
    //     title: "Thuộc điểm tập kết",
    //     dataIndex: "gatherLocation",
    //     render: (_, record) => {
    //       return record.gatherTrans.nameGather;
    //     },
    //   },
      {
        title: "Thao tác",
        dataIndex: "actions",
        render: (_, record) => {
          return (
            <Space>
              <Button 
              onClick={() => handleSeeOrder(record._id)}
              icon={<EyeFilled />} />
              <Button
                onClick={() => handleCreateOrder(record._id)}
                icon={<EditOutlined />}
                type="primary"
              />
              {/* <Button
                onClick={() => handleDelete(record._id)}
                icon={<DeleteOutlined />}
                danger
                type="primary"
              /> */}
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



  const handleCreateOrder = (id) => {
    setShowCreateForm(true);
    setEditingId(id);
  }

  const handleSeeOrder = (id) => {
    setShowSeeOrderForm(true);
    setEditingId(id);
  }

  return (
    <>
      <PageHeader title={"Đơn hàng"} />
      <Flex justify="space-between">
        {/* <SearchBox onSearch={handleSearch} />
        <Button type="primary" onClick={handleAdd}>
          Thêm
        </Button> */}
      </Flex>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      <CreateOrderForm
        open={showCreateForm}
        onCancel={handleCloseForm}
        title={"Tạo đơn hàng chuyển tới điểm tập kết/ giao dịch khác"}
        id={editingId}
        />
      <SeeOrderForm
        open={showSeeOrderForm}
        onCancel={handleCloseForm}
        title={"Xem đơn hàng"}
        id={editingId}
      />
    </>
  );
};
export default OrderNotConfirm;
