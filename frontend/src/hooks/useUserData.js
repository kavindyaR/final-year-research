import { useMutation } from "@tanstack/react-query";
import { saveUserDataByUID, updateHealthMetrics } from "../api/userData";

export const useSaveUserData = () => {
  return useMutation({
    mutationFn: (data) => saveUserDataByUID(data.userId, data.userData),
    onSuccess: (data) => {
      console.log("User data saved successfully:", data);
    },
    onError: (error) => {
      console.error("Error saving user data:", error);
    },
  });
};

export const useUpdateUserHealthMetrics = () => {
  return useMutation({
    mutationFn: (data) => updateHealthMetrics(data.userId, data.metrics),
    onSuccess: () => {
      console.log("Health metrics saved successfully:");
    },
    onError: (error) => {
      console.error("Error saving health metrics:", error);
    },
  });
};
