import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Flex, Space, Table, notification, Steps } from "antd";
import { DeleteOutlined, EditOutlined, EyeFilled } from "@ant-design/icons";
import PageHeader from "../../../components/PageHeader";
import SearchBox from "../../../components/SearchBox";
import { notiMessages } from "../../../constants/messages";
import * as TransLocalService from "../../../services/transLocal.service";
import TransLocalForm from "./TransLocalForm";
import transLocaltions from "../../../utils/fakeData/TransLocation";

const description = "You can hover on the dot.";

const OrderHistory = () => {
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

  const handleDelete = async (id) => {
    try {
      await TransLocalService.getTransLocalById(id);
      getData();
      notification.success({
        message: notiMessages.deleteSuccessfully,
        duration: 1,
      });
    } catch (error) {
      notification.error({
        message: notiMessages.error,
        duration: 1,
      });
    }
  };

  const handleEdit = (id) => {
    setShowForm(true);
    setEditingId(id);
  };
  return (
    <>
      <Steps
        current={1}
        items={[
          {
            title: "Finished",
            description,
            subTitle: "",
          },
          {
            title: "In Progress",
            description,
            subTitle: "",
          },
          {
            title: "Waiting",
            description,
          },
          // Them thoi gian du kien
          // {
          //   title: "In Trans Finish",
          //   description,
          // },
          // {
          //   title: "Delivering Customer",
          //   description,
          // },
          // {
          //   title: "Done",
          //   description,
          // },
        ]}
      />{" "}
    </>
  );
};
export default OrderHistory;
