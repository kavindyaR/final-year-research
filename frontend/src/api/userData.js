import axios from "./axiosInstance";
import { ENDPOINTS } from "./endpoints";

export const saveUserDataByUID = async (userId, userData) => {
  const response = await axios.post(
    `${ENDPOINTS.SAVEUSERDATABYID}?id=${userId}`,
    {
      ...userData,
    }
  );
  return response.data;
};

export const getUserDataById = (userId) => {
  return axios.get(ENDPOINTS.USERDATA, {
    params: { id: userId },
  });
};

export const updateHealthMetrics = async (userId, margins) => {
  const response = await axios.patch(
    ENDPOINTS.UPDATEHEALTHMETRICS,
    { margins: { ...margins } },
    {
      params: { userId },
    }
  );

  return response;
};

export const getHealthMetricsById = (userId) => {
  return axios.get(ENDPOINTS.GETHEALTHMETRICS, {
    params: { userId },
  });
};
