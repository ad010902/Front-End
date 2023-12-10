import instance from "../config/axios";

function createGatherLocation(data) {
  return instance.post("/gatherLoca/createGather", data);
}

function updateGatherLocation(id, data) {
  return instance.put(`/gatherLoca/update/${id}`, data);
}

function getGatherLocations(keyword) {
  return instance.get("/gatherLoca/showAlGather", {
    params: {
      keyword,
    },
  });
}

// Search by Id?
function getGatherLocationById(id) {
  return instance.get(`/gatherLoca/findOne/${id}`);
}

function deleteGatherLocationById(id) {
  return instance.delete(`/gatherLoca/deleteOne/${id}`);
}

// Search by Keyword?
function getGatherLocationsByKeyword(id) {
  return instance.get(`/gatherLoca/findOne/${id}`);
}

export {
  createGatherLocation,
  getGatherLocations,
  updateGatherLocation,
  getGatherLocationById,
  deleteGatherLocationById,
  getGatherLocationsByKeyword,
};
