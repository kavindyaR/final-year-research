import api from "./api";

export const saveUserDataByUID = async (userId, userData) => {
  const response = await api.post("/api/bio-data/create", {
    _id: userId,
    ...userData,
  });
  return response.data;
};
