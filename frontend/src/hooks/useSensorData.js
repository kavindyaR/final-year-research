import { useQuery } from "@tanstack/react-query";
import {
  fetchSensorDataByUID,
  fetchActivityScoreByUID,
} from "../services/sensorDataApi";

export const useSensorData = (userId) => {
  return useQuery({
    queryKey: ["sensorData"],
    queryFn: () => fetchSensorDataByUID(userId),
    staleTime: 600000, // 5 minutes caching
  });
};

export const useActivityScore = (userId) => {
  return useQuery({
    queryKey: ["activityScore"],
    queryFn: () => fetchActivityScoreByUID(userId),
    staleTime: 600000, // 5 minutes caching
  });
};
