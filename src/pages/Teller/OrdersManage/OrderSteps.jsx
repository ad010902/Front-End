import { Space, Steps } from "antd";
import { useCallback, useState } from "react";
import OrdersTable from "./OrdersTable";

export default function OrderSteps({ items }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleChangeStep = (value) => {
    setCurrentStep(value);
  };

  const renderTable = useCallback(() => {
    return <OrdersTable status={items[currentStep].orderStatus} />;
  }, [currentStep]);
  return (
    <>
      <Space direction="vertical">
        <Steps
          progressDot={true}
          current={currentStep}
          items={items}
          onChange={handleChangeStep}
        />
        {renderTable()}
      </Space>
    </>
  );
}
