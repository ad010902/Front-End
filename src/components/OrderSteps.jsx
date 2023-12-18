import { Space, Steps } from "antd";
import { useCallback, useState } from "react";

export default function OrderSteps({ items, tableComponent }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleChangeStep = (value) => {
    setCurrentStep(value);
  };

  const renderTable = useCallback(() => {
    const TableComponent = tableComponent;
    return <TableComponent status={items[currentStep].orderStatus} />;
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
