import instance from "../config/axios";

function createTransLocal(data) {
  return instance.post("/transLoca/createTrans", data);
}

function updateTransLocal(id, data) {
  return instance.put(`/transLoca/update/${id}`, data);
}

function getTransLocals(keyword) {
  return instance.get("/transLoca/showAlTrans", {
    params: {
      keyword,
    },
  });
}

// Search by Id?
function getTransLocalById(id) {
  return instance.get(`/transLoca/findOne/${id}`);
}

function deleteTransLocalById(id) {
  return instance.delete(`/transLoca/deleteOne/${id}`);
}


export {
  createTransLocal,
  getTransLocals,
  updateTransLocal,
  getTransLocalById,
  deleteTransLocalById
};
