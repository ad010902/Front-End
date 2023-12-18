import { OrderStatus } from "../utils/fakeData/Order";

const MenuItemKey = {
  signIn: "sign-in",
  signOut: "sign-out",
  profile: "profile",
};

const Role = {
  owner: "admin",
  managerGather: "managerGather",
  managerTrans: "managerTrans",
  staffTrans: "staffTrans",
};

const RoleName = {
  [Role.owner]: "Chủ công ty",
  [Role.managerGather]: "Trưởng điểm tập kết",
  [Role.managerTrans]: "Trưởng điểm giao dịch",
  [Role.staffTrans]: "Giao dịch viên",
};

const AdminMenuItems = [
  {
    key: "diem-tap-ket",
    label: "Điểm tập kết",
  },
  {
    key: "diem-giao-dich",
    label: "Điểm giao dịch",
  },
  {
    key: "tai-khoan",
    label: "Tài khoản",
  },
  {
    key: "thong-ke",
    label: "Thống kê",
  },
];

const ManagerTransMenuItems = [
  {
    key: "giao-dich-vien",
    label: "Giao dịch viên",
  },
  {
    key: "thong-ke",
    label: "Thống kê",
  },
];

const TellerMenuItems = [
  {
    key: "don-hang",
    label: "Đơn hàng",
  },
  {
    key: "thong-ke",
    label: "Thống kê",
  },
];

const UserMenuItems = [
  {
    key: "nav-1",
    label: "Nav 1",
  },
];

const OrderFromThisStepsItems = [
  {
    title: "Mới",
    orderStatus: OrderStatus.new,
  },
  {
    title: "Đang gửi đến điểm tập kết",
    orderStatus: OrderStatus.toStartGatherLocal,
  },
  {
    title: "Đã được nhận",
    orderStatus: OrderStatus.atStartGatherLocal,
  },
];

const OrderToThisStepsItems = [
  {
    title: "Đang đến",
    orderStatus: OrderStatus.toTransacLocal,
  },
  {
    title: "Đã đến",
    orderStatus: OrderStatus.atTransacLocal,
  },
  {
    title: "Đang gửi đến khách hàng",
    orderStatus: OrderStatus.toCustomer,
  },
  {
    title: "Giao thành công",
    orderStatus: OrderStatus.ok,
  },
];

const DeliverFailedOrderStepsItems = [
  {
    title: "Giao không thành công",
    orderStatus: OrderStatus.deliverFailed,
  },
  {
    title: "Đang trả về điểm tập kết",
    orderStatus: OrderStatus.returnEndGatherLocal,
  },
  {
    title: "Đã được trả về",
    orderStatus: OrderStatus.atReturnedEndGatherLocal,
  },
];

const ReturnOrderStepsItems = [
  {
    title: "Đơn hàng giao thất bại",
    orderStatus: OrderStatus.atReturnedStartTransacLocal,
  },
  {
    title: "Đang giao hoàn",
    orderStatus: OrderStatus.returnGiver,
  },
  {
    title: "Đã giao hoàn",
    orderStatus: OrderStatus.atReturnedGiver,
  },
];

const OrderTabs = [
  {
    key: "don-hang-moi",
    label: "Đơn hàng mới",
  },
  {
    key: "don-hang-den",
    label: "Đơn hàng đến",
  },
  {
    key: "don-hang-that-bai",
    label: "Đơn hàng thất bại",
  },
  {
    key: "don-hang-giao-hoan",
    label: "Đơn hàng giao hoàn",
  },
];

export {
  MenuItemKey,
  Role,
  AdminMenuItems,
  UserMenuItems,
  RoleName,
  ManagerTransMenuItems,
  TellerMenuItems,
  OrderFromThisStepsItems,
  OrderToThisStepsItems,
  OrderTabs,
  DeliverFailedOrderStepsItems,
  ReturnOrderStepsItems,
};
