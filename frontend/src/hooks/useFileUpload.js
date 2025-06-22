import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../api/fileUpload";
import { useNavigate } from "react-router-dom";

export const useFileUpload = (setProgress, userId) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ file }) => uploadFile(file, setProgress, userId),
    onSuccess: () => {
      setProgress(0); // Reset progress on success
      navigate("/");
      // alert("File uploaded successfully!");
    },
    onError: (error) => {
      alert("Upload failed: " + error.message);
      setProgress(0); // Reset on error
    },
  });
};
