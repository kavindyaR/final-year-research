import api from "./api";

export const uploadFile = async (file, onProgress) => {
  localStorage.setItem("userService", "http://localhost:5002");

  const formData = new FormData();
  formData.append("file", file);

  const userId = "67d7040f30114a39eb8afef65tr";

  const response = await api.post("/api/data/upload", formData, {
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
