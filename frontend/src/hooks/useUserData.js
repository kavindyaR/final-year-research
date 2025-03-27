import { useMutation } from "@tanstack/react-query";
import { saveUserDataByUID } from "../services/userDataApi";

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
