const MenuItemKey = {
  signIn: "sign-in",
  signOut: "sign-out",
  profile: "profile",
};

const Role = {
  owner: "ROLE_ADMIN",
  managerGather: "ROLE_MANAGERGATHER",
  managerTrans: "ROLE_MANAGERTRANS",
  staffTrans: "ROLE_STAFFTRANS",
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

export {
  MenuItemKey,
  Role,
  AdminMenuItems,
  UserMenuItems,
  RoleName,
  ManagerTransMenuItems,
  TellerMenuItems,
};
