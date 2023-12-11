import gatheringLocations from "./GatheringLocation";
import managers from "./Manager";

const transLocaltions = [
  {
    _id: 1,
    nameTrans: "Transaction Location 1",
    phone: "0123456789",
    email: "Transaction-location-1@gmail.com",
    address: "XX, YY, ZZ",
    managerTrans: managers[0],
    gatherTrans: gatheringLocations[0],
  },
  {
    _id: 2,
    nameTrans: "Transaction Location 2",
    phone: "0123456789",
    email: "Transaction-location-2@gmail.com",
    address: "XX, YY, ZZ",
    managerTrans: managers[1],
    gatherTrans: gatheringLocations[0],
  },
];

export default transLocaltions;
