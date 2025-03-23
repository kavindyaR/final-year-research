import api from "./api";

export const fetchSensorDataByUID = async (userId) => {
  // localStorage.setItem("userService", "http://localhost:5001");

  const response = await api.get("/api/sensor-data/get-sensor-data", {
    params: { userId },
  });
  return response.data;
};

export const fetchActivityScoreByUID = async (userId) => {
  // localStorage.setItem("userService", "http://localhost:5001");

  const response = await api.get("/api/sensor-data/fetch-activity-score", {
    params: { userId },
  });
  return response.data;
};
