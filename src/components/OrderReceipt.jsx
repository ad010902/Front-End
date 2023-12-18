import { Checkbox, Col, Divider, Flex, Row, Space, Typography } from "antd";
import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import * as dayjs from "dayjs";

function OrderReceipt({ order }, ref) {
  return (
    <div ref={ref} style={{ padding: "2rem" }}>
      <Row justify="center" align="middle">
        <Col span={12}>
          <Typography.Title style={{ textAlign: "center", marginBottom: 0 }}>
            Magic Post
          </Typography.Title>
        </Col>
        <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
          <QRCodeSVG
            value={`http://localhost:3000/don-hang/${order.idOrder}`}
            size={64}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "1rem", border: "2px solid black" }}>
        <Col
          span={12}
          style={{
            borderBottom: "2px solid black",
            padding: ".25rem",
          }}
        >
          <Typography.Title level={5}>
            1. Thông tin người gửi:{" "}
          </Typography.Title>
          <Flex vertical>
            <Typography.Text>{order.giverName}</Typography.Text>
            <Space>
              <Typography.Text strong>Địa chỉ: </Typography.Text>
              <Typography.Text>{order.addressIfS}</Typography.Text>
            </Space>
            <Space>
              <Typography.Text strong>Số điện thoại: </Typography.Text>
              <Typography.Text>{order.giverPhone}</Typography.Text>
            </Space>
          </Flex>
        </Col>
        <Col
          span={12}
          style={{
            borderBottom: "2px solid black",
            borderLeft: "2px solid black",
            padding: ".25rem",
          }}
        >
          <Typography.Title level={5}>
            2. Thông tin người nhận:{" "}
          </Typography.Title>
          <Flex vertical>
            <Typography.Text>{order.receiverName}</Typography.Text>
            <Space>
              <Typography.Text strong>Địa chỉ: </Typography.Text>
              <Typography.Text>{order.addressIfR}</Typography.Text>
            </Space>
            <Space>
              <Typography.Text strong>Số điện thoại: </Typography.Text>
              <Typography.Text>{order.receiverPhone}</Typography.Text>
            </Space>
          </Flex>
        </Col>
        <Col span={12}>
          <Row
            style={{
              borderBottom: "2px solid black",
              padding: ".25rem",
            }}
          >
            <Flex vertical>
              <Typography.Title level={5}>3. Loại hàng gửi: </Typography.Title>
              <Space>
                <Checkbox checked />
                <Typography.Text>{order.typeOrder}</Typography.Text>
              </Space>
            </Flex>
          </Row>
          <Row
            style={{
              borderBottom: "2px solid black",
              padding: ".25rem",
            }}
          >
            <Flex vertical>
              <Typography.Title level={5}>
                4. Dịch vụ đặc biệt:{" "}
              </Typography.Title>
              <Typography.Text>{order.specialServer}</Typography.Text>
            </Flex>
          </Row>
          <Row
            style={{
              borderBottom: "2px solid black",
              padding: ".25rem",
            }}
          >
            <Flex vertical>
              <Typography.Title level={5}>
                5. Cam kết của người gửi:{" "}
              </Typography.Title>
              <Typography.Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text.
              </Typography.Text>
            </Flex>
          </Row>
          <Row
            style={{
              padding: ".25rem",
            }}
          >
            <Col span={12}>
              <Flex vertical>
                <Typography.Title level={5}>6. Ngày giờ gửi: </Typography.Title>
                <Typography.Text>
                  {dayjs(new Date()).format("HH:mm DD/MM/YYYY")}
                </Typography.Text>
              </Flex>
            </Col>
            <Col span={12}>
              <Flex vertical>
                <Typography.Title level={5}>Chữ ký người gửi</Typography.Title>
              </Flex>
            </Col>
          </Row>
        </Col>
        <Col span={12} style={{ borderLeft: "2px solid black" }}>
          <Row>
            <Col
              span={16}
              style={{
                padding: ".25rem",
                border: "2px solid black",
                borderTop: 0,
                borderLeft: 0,
              }}
            >
              <Typography.Title level={5}>7. Cước phí: </Typography.Title>
              <Flex style={{ width: "100%" }} justify="space-between">
                <Typography.Text strong>Tổng cước (gồm VAT): </Typography.Text>
                <Typography.Text strong>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(order.price)}
                </Typography.Text>
              </Flex>
            </Col>
            <Col
              span={8}
              style={{
                padding: ".25rem",
                border: "2px solid black",
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
              }}
            >
              <Typography.Title level={5}>8. Khối lượng: </Typography.Title>
              <Typography.Text>{order.weight} kg</Typography.Text>
            </Col>
            <Col
              span={24}
              style={{
                padding: ".25rem",
                border: "2px solid black",
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
              }}
            >
              <Space>
                <Typography.Title level={5} style={{ margin: 0 }}>
                  9. Kích thước:{" "}
                </Typography.Title>
                <Typography.Text style={{ margin: 0 }}>
                  {order.size?.split("x").join(" ✕ ")}
                </Typography.Text>
              </Space>
            </Col>
          </Row>
          <Row>
            <Col
              span={12}
              style={{
                padding: ".25rem",
                borderRight: "2px solid black",
                height: 200,
              }}
            >
              <Typography.Title level={5} style={{ margin: 0 }}>
                10. Bưu cục chấp nhận:{" "}
              </Typography.Title>
              <Flex vertical align="center">
                <Typography.Text>Chữ ký GDV nhận</Typography.Text>
                <div>
                  <svg width="104" height="104">
                    <circle
                      cx="52"
                      cy="52"
                      r="50"
                      stroke="black"
                      stroke-width="2"
                      fill="none"
                    />
                    <path
                      id="curve"
                      d="M 20 32
    	A 20,20 0 0,1 86,82"
                      fill="none"
                    ></path>
                    <path id="line" d="M 15 58 L 104 58"></path>
                    <text>
                      <textPath href="#curve">Magic Post</textPath>
                    </text>
                    <text>
                      <textPath href="#line">
                        {dayjs(new Date()).format("DD/MM/YYYY")}
                      </textPath>
                    </text>
                    Sorry, your browser does not support inline SVG.
                  </svg>
                </div>
                <Typography.Text>GDV: {order.transacStaffName}</Typography.Text>
              </Flex>
            </Col>
            <Col
              span={12}
              style={{
                padding: ".25rem",
              }}
            >
              <Typography.Title level={5} style={{ margin: 0 }}>
                11. Ngày giờ nhận:{" "}
              </Typography.Title>
              <Flex vertical align="center">
                <Typography.Text style={{ textAlign: "center" }}>
                  Người nhận/Người được ủy quyền nhận
                </Typography.Text>
                <Typography.Text>(Ký, ghi rõ họ tên)</Typography.Text>
              </Flex>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider dashed style={{ borderColor: "black" }} />
    </div>
  );
}

export default forwardRef(OrderReceipt);
