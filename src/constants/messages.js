const formMessages = {
  username: {
    required: "Hãy nhập username!",
  },
  password: {
    required: "Hãy nhập mật khẩu!",
  },
  weight: {
    pattern: "Hãy nhập định dạng xx.xx",
  },
};

const notiMessages = {
  signedIn: "Đã đăng nhập!",
  signInYet: "Bạn cần đăng nhập!",
  error: "Lỗi!",
  noPermission: "Bạn không có quyền vào trang này!",
  createSuccessfully: "Tạo mới thành công!",
  updateSuccessfully: "Cập nhật thành công!",
  deleteSuccessfully: "Xóa thành công!",
};

export { formMessages, notiMessages };
