import {
  Button,
  Divider,
  Flex,
  Modal,
  Select,
  Space,
  Switch,
  Table,
  Typography,
} from "antd";
import ActionsCell from "../../../components/ActionsCell";
import { useEffect, useMemo, useState } from "react";
import { OrderStatus, orders } from "../../../utils/fakeData/Order";
import SearchBox from "../../../components/SearchBox";

export default function OrdersTable({ status }) {
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showOrder, setShowOrder] = useState();

  useEffect(() => {
    getData();
  }, [status]);

  const getData = async () => {
    const os = orders.filter((order) => order.status === status);
    setData(os);
  };

  const handleShow = (id) => {
    const order = data.find((item) => item.idOrder === id);
    console.log(order);
    setShowOrder(order);
  };
  const handleReceived = (orderId) => {};

  const handleChangeDeliverStatus = (value) => {};

  const columns = useMemo(() => {
    const toStatus = status.match(new RegExp(/^TO_\w+?/));
    const newStatus = status === OrderStatus.new;
    return [
      {
        title: "Mã đơn",
        dataIndex: "idOrder",
      },
      {
        title: "Tên đơn",
        dataIndex: "name",
      },
      {
        title: "Tiêu đề",
        dataIndex: "title",
      },
      {
        title: "Địa chỉ người nhận",
        dataIndex: "addressIfR",
      },
      {
        title: "Địa chỉ người gửi",
        dataIndex: "addressIfS",
      },
      {
        title: newStatus && "Trạng thái",
        dataIndex: newStatus && "status",
      },
      {
        title: status === OrderStatus.toCustomer && "Trạng thái",
        dataIndex: status === OrderStatus.toCustomer && "deliverStatus",
        render: (_, record) => {
          return (
            status === OrderStatus.toCustomer && (
              <Select
                style={{
                  width: "100%",
                }}
                defaultValue={OrderStatus.toCustomer}
                options={[
                  {
                    value: OrderStatus.toCustomer,
                    label: "Đang giao",
                  },
                  {
                    value: OrderStatus.returnEndTransacLocal,
                    label: "Chuyển về kho",
                  },
                  {
                    value: OrderStatus.deliverFailed,
                    label: "Giao thất bại",
                  },
                ]}
                onChange={handleChangeDeliverStatus}
              />
            )
          );
        },
      },
      {
        title: toStatus && "Đã nhận",
        dataIndex: toStatus && "orderStatus",
        render: (_, record) => {
          return (
            toStatus && (
              <Switch onChange={() => handleReceived(record.idOrder)} />
            )
          );
        },
      },
      {
        title: "Thao tác",
        dataIndex: "actions",
        render: (_, record) => {
          return (
            <ActionsCell
              record={record}
              onShow={() => handleShow(record.idOrder)}
              hasDelete={status === OrderStatus.new}
              hasEdit={status === OrderStatus.new}
            />
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

  const handleSend = () => {};

  const handleSearch = (keyword) => {};
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Flex
          justify="space-between"
          align="center"
          style={{ maxHeight: 64, height: 64, minHeight: 64 }}
        >
          {selectedRowKeys.length > 0 && (
            <>
              <Typography.Title level={4}>
                Đã chọn {selectedRowKeys.length} đơn hàng
              </Typography.Title>
              <Button onClick={handleSend} size="large" type="primary">
                Gửi
              </Button>
            </>
          )}
        </Flex>
        <Flex justify="space-between">
          <SearchBox onSearch={handleSearch} />
          <Button type="primary">Thêm</Button>
        </Flex>
        <Table
          columns={columns}
          dataSource={data}
          rowSelection={
            status.match(new RegExp(/^AT_\w+?TRANSAC_LOCAL$/g)) ||
            status === OrderStatus.new
              ? rowSelection
              : null
          }
        />
      </Space>
      {showOrder && (
        <Modal
          open={Boolean(showOrder)}
          onCancel={() => setShowOrder(null)}
          footer={null}
        >
          <Typography.Title level={4}>{showOrder.title}</Typography.Title>
          <Typography.Text>Mã đơn: {showOrder.idOrder}</Typography.Text>
          <Divider style={{ marginTop: ".5rem" }} />
          <Flex vertical gap={4}>
            <Space>
              <Typography.Text strong>Tên đơn: </Typography.Text>
              <Typography.Text>{showOrder.name}</Typography.Text>
            </Space>
            <Space>
              <Typography.Text strong>Địa chỉ gửi: </Typography.Text>
              <Typography.Text>{showOrder.addressIfS}</Typography.Text>
            </Space>
            <Space>
              <Typography.Text strong>Địa chỉ nhận: </Typography.Text>
              <Typography.Text>{showOrder.addressIfR}</Typography.Text>
            </Space>
            <Space>
              <Typography.Text strong>Loại đơn: </Typography.Text>
              <Typography.Text>{showOrder.typeOrder}</Typography.Text>
            </Space>
            <Space>
              <Typography.Text strong>Nội dung đơn: </Typography.Text>
              <Typography.Text>{showOrder.contentValue}</Typography.Text>
            </Space>
            <Space direction="vertical">
              <Typography.Text strong>Mô tả đơn: </Typography.Text>
              <Flex gap={8} vertical>
                <Typography.Text>
                  ・Trọng lượng: {showOrder.weight}kg
                </Typography.Text>
                <Typography.Text>
                  ・Kích thước: {showOrder.size}
                </Typography.Text>
              </Flex>
            </Space>
            <Space direction="vertical">
              <Typography.Text strong>Lịch sử: </Typography.Text>
              <Table
                columns={[
                  {
                    title: "STT",
                    dataIndex: "index",
                    rowScope: "row",
                  },
                  {
                    title: "Mô tả",
                    dataIndex: "discription",
                  },
                  {
                    title: "Thời gian",
                    dataIndex: "datetime",
                  },
                ]}
              />
            </Space>
          </Flex>
        </Modal>
      )}
    </>
  );
}
