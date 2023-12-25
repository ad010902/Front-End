import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Flex, Space, Table, notification } from "antd";
import { DeleteOutlined, CheckOutlined, EyeFilled } from "@ant-design/icons";
import PageHeader from "../../../components/PageHeader";
import SearchBox from "../../../components/SearchBox";
import { notiMessages } from "../../../constants/messages";
import * as TransLocalService from "../../../services/transLocal.service";
import TransLocalForm from "./TransLocalForm";
import transLocaltions from "../../../utils/fakeData/TransLocation";
import SeeOrderForm from "./SeeOrderForm";
const OrderNotConfirm = () => {
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
                onClick={() => handleConfirm(record._id)}
                icon={<CheckOutlined />}
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

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleSeeOrder = (id) => {
    setShowForm(true);
    setEditingId(id);
  }
  const handleConfirm = async (id) => {
    try {
        // await TransLocalService.getTransLocalById(id);
        getData();
        notification.success({
          message: notiMessages.confirmSuccessfully,
          duration: 1,
        });
      } catch (error) {
        notification.error({
          message: notiMessages.error,
          duration: 1,
        });
      }
  };
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
      <SeeOrderForm
        open={showForm}
        onCancel={handleCloseForm}
        title={"Xem đơn hàng"}
        id={editingId}
      />
    </>
  );
};
export default OrderNotConfirm;
