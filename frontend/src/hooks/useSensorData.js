import { useQuery } from "@tanstack/react-query";
import { fetchSensorDataByUID } from "../services/sensorDataApi";

export const useData = () => {
  return useQuery({
    queryKey: ["data"],
    queryFn: fetchSensorDataByUID,
    staleTime: 600000, // 5 minutes caching
  });
};
