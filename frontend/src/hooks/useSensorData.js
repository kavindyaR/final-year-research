import { useQuery } from "@tanstack/react-query";
import {
  fetchSensorDataByUID,
  fetchActivityScoreByUID,
} from "../services/sensorDataApi";

export const useSensorData = () => {
  return useQuery({
    queryKey: ["sensorData"],
    queryFn: fetchSensorDataByUID,
    staleTime: 600000, // 5 minutes caching
  });
};

export const useActivityScore = () => {
  return useQuery({
    queryKey: ["activityScore"],
    queryFn: fetchActivityScoreByUID,
    staleTime: 600000, // 5 minutes caching
  });
};
