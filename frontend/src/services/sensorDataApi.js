import api from "./api";

export const fetchSensorDataByUID = async () => {
  localStorage.setItem("userService", "http://localhost:5001");

  const userId = "67d7040f30114a39eb8afef65tr";

  const response = await api.get("/api/sensor-data/get-sensor-data", {
    params: { userId },
  });
  return response.data;
};

export const fetchActivityScoreByUID = async () => {
  localStorage.setItem("userService", "http://localhost:5001");

  const userId = "67d7040f30114a39eb8afef6";

  const response = await api.get("/api/sensor-data/fetch-activity-score", {
    params: { userId },
  });
  return response.data;
};
