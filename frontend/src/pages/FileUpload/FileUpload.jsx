import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFileUpload } from "../../hooks/useFileUpload";
import { useAuth } from "../../context/AuthContext";
import styles from "./FileUpload.module.css";
import MainLayout from "../../layouts/MainLayout";

const ALLOWED_TYPES = ["text/xml", "text/csv"];

const FileUpload = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  const uploadMutation = useFileUpload(setProgress, user["_id"]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      alert("Invalid file type! Only XML files are allowed.");
      return;
    }
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ALLOWED_TYPES.join(","),
    multiple: false, // Allow only one file
  });

  return (
    <MainLayout>
      <div className={styles.pageContainer}>
        <h2 className={styles.pageTitle}>File Upload</h2>

        <div className={styles.formSquare}>
          <div className={styles.dropContainer}>
            <div className={styles.dropZone} {...getRootProps()}>
              <input {...getInputProps()} />
              <p className={styles.dropText}>
                {isDragActive
                  ? "Drop the file here..."
                  : "Drag & drop or click to select an XML file"}
              </p>

              {files.length > 0 && (
                <p className={styles.fileName}>{files[0].name}</p>
              )}
            </div>

            {progress > 0 && progress < 100 && (
              <div className={styles.progressBarContainer}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${progress}%` }}
                >
                  {progress}%
                </div>
              </div>
            )}

            {uploadMutation.isLoading && <p className={styles.statusText}>Uploading...</p>}
            {uploadMutation.isError && <p className={styles.errorText}>{uploadMutation.error.message}</p>}

            <button
              className={styles.uploadBtn}
              onClick={() => uploadMutation.mutate({ file: files[0] })}
              disabled={uploadMutation.isLoading || files.length === 0}
            >
              {uploadMutation.isLoading ? "Uploading..." : "Upload File"}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FileUpload;
