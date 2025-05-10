const UserData = require("../models/UserData");

const getUserById = async (id) => {
  const userData = await UserData.findById(id).select("-__v");
  if (!userData) {
    throw new Error("User not found");
  }

  const result = userData.toObject();
  result.id = result._id;
  delete result._id;

  return result;
};

const getAllUsers = async () => {
  const userDataList = await UserData.find().select("-__v");
  const result = userDataList.map((user) => {
    const obj = user.toObject();
    obj.id = obj._id;
    delete obj._id;
    return obj;
  });

  return result;
};

module.exports = { getUserById, getAllUsers };
