import axios from "./axiosInstance";
import { ENDPOINTS } from "./endpoints";

export const uploadFile = async (file, onProgress, userId) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(ENDPOINTS.FILEUPLOAD, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    params: { userId },
    onUploadProgress: (progressEvent) => {
      const progress = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgress(progress); // Update the progress in the component
    },
  });

  return response;
};
