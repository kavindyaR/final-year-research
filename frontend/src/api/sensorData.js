import axios from "./axiosInstance";
import { ENDPOINTS } from "./endpoints";

export const getSensorData = async (userId) => {
  const response = await axios.get(ENDPOINTS.GETSENSORDATA, {
    params: { userId: userId },
  });

  return response;
};
