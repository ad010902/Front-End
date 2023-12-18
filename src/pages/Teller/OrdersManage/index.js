import { useMemo, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import { Steps, Tabs } from "antd";
import {
  DeliverFailedOrderStepsItems,
  OrderFromThisStepsItems,
  OrderStepsItems,
  OrderTabs,
  OrderToThisStepsItems,
  ReturnOrderStepsItems,
} from "../../../constants";
import OrderSteps from "./OrderSteps";

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
        <OrderSteps items={OrderFromThisStepsItems} />
      )}
      {currentTab === OrderTabs[1].key && (
        <OrderSteps items={OrderToThisStepsItems} />
      )}
      {currentTab === OrderTabs[2].key && (
        <OrderSteps items={DeliverFailedOrderStepsItems} />
      )}
      {currentTab === OrderTabs[3].key && (
        <OrderSteps items={ReturnOrderStepsItems} />
      )}
    </>
  );
}
