import axios from "axios";
import instance from "../config/axios";

const API_URL = "http://localhost:3000/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};

const createUser = (data) => {
  return instance.post("", data);
};

const updateUser = (data) => {
  return instance.put("", data);
};

const getUsers = (keyword) => {
  return instance.get("/admin/showAllUsers", {
    params: {
      keyword,
    },
  });
};

const getUserById = (id) => {
  return instance.get("/searchUser/" + `${id}`);
};

const deleteUserById = (id) => {
  return instance.delete("/deleteUser/" + `${id}`);
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  createUser,
  updateUser,
  getUsers,
  getUserById,
  deleteUserById,
};

export default UserService;
