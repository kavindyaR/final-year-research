const UserBiometric = require("../models/UserBiometric");

const createBiometric = async (rawBioData) => {
  const { _id } = rawBioData;
  const bioDataRecord = await UserBiometric.findOne({ _id });

  if (bioDataRecord) throw new Error("Biometrics already exists");

  const bioData = new UserBiometric(rawBioData);
  await bioData.save();

  return { message: "Bio data successfully saved" };
};

const fetchBiometric = async (id) => {
  const bioDataRecord = await UserBiometric.findOne(id).select("-__v");

  if (!bioDataRecord) throw new Error("Biometrics not exists");

  return bioDataRecord;
};

module.exports = { createBiometric, fetchBiometric };
