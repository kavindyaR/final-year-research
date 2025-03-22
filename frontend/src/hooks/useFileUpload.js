import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../services/fileUpload";

export const useFileUpload = (setProgress) => {
  return useMutation({
    mutationFn: ({ file }) => uploadFile(file, setProgress),
    onSuccess: () => {
      setProgress(0); // Reset progress on success
      alert("File uploaded successfully!");
    },
    onError: (error) => {
      alert("Upload failed: " + error.message);
      setProgress(0); // Reset on error
    },
  });
};
