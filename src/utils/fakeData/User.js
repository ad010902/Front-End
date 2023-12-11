const { Role } = require("../../constants");

const users = [
  {
    _id: 1,
    username: "Haha",
    email: "haha@gmail.com",
    role: [Role.managerGather],
  },
  {
    _id: 2,
    username: "Hehe",
    email: "hehe@gmail.com",
    role: [Role.managerTrans],
  },
];

export default users;
