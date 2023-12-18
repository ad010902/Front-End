import { useState } from "react";
import PageHeader from "../../../components/PageHeader";
import { Tabs } from "antd";
import {
  DeliverFailedOrderStepsItems,
  OrderFromThisStepsItems,
  OrderTabs,
  OrderToThisStepsItems,
  ReturnOrderStepsItems,
} from "../../../constants";
import OrderSteps from "../../../components/OrderSteps";
import OrdersTable from "../../../components/OrdersTable";

export default function OrdersManage() {
  const [currentTab, setCurrentTab] = useState(OrderTabs[0].key);

  const handleChangeTab = (key) => {
    setCurrentTab(key);
  };
  return (
    <>
      <PageHeader title={"Đơn hàng"} />
      <Tabs
        items={OrderTabs}
        defaultActiveKey={currentTab}
        onChange={handleChangeTab}
      />
      {currentTab === OrderTabs[0].key && (
        <OrderSteps
          tableComponent={OrdersTable}
          items={OrderFromThisStepsItems}
        />
      )}
      {currentTab === OrderTabs[1].key && (
        <OrderSteps
          tableComponent={OrdersTable}
          items={OrderToThisStepsItems}
        />
      )}
      {currentTab === OrderTabs[2].key && (
        <OrderSteps
          tableComponent={OrdersTable}
          items={DeliverFailedOrderStepsItems}
        />
      )}
      {currentTab === OrderTabs[3].key && (
        <OrderSteps
          tableComponent={OrdersTable}
          items={ReturnOrderStepsItems}
        />
      )}
    </>
  );
}
