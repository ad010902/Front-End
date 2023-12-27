import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/plots";

const DemoColumn = () => {
  //demo according month
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/antfincdn/iPY8JFnxdb/dodge-padding.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    data,
    isGroup: true,
    xField: "month",
    yField: "count",
    seriesField: "name",
    dodgePadding: 2,
    label: {
      position: "middle",
      // 'top', 'middle', 'bottom'
      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
  };

  return <Column {...config} />;
};
