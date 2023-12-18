import { QrcodeOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Flex,
  Modal,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import OrderReceipt from "./OrderReceipt";

export default function OrderDetailModal({ showOrder, onCancel }) {
  const [showReceip, setShowReceip] = useState(false);
  const orderReceipPrintRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => orderReceipPrintRef.current,
  });
  return (
    <>
      {" "}
      <Modal open={Boolean(showOrder)} onCancel={onCancel} footer={null}>
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
              <Typography.Text>・Kích thước: {showOrder.size}</Typography.Text>
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
            <Flex justify="end">
              <Tooltip title="Xem biên lai">
                <Button
                  onClick={() => setShowReceip(true)}
                  icon={<QrcodeOutlined />}
                  size="large"
                  type="primary"
                />
              </Tooltip>
            </Flex>
          </Space>
        </Flex>
      </Modal>
      <Modal
        open={showReceip}
        onCancel={() => setShowReceip(false)}
        okText={"In biên lai"}
        onOk={handlePrint}
        width={860}
        centered
      >
        <OrderReceipt ref={orderReceipPrintRef} order={showOrder} />
      </Modal>
    </>
  );
}
