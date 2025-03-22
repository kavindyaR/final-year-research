import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFileUpload } from "../../hooks/useFileUpload";

const ALLOWED_TYPES = ["text/xml", "text/csv"];

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  const uploadMutation = useFileUpload(setProgress);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      alert("Invalid file type! Only XML and CSV are allowed.");
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
    <>
      <h1>File Upload Page</h1>

      <div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>
            {isDragActive
              ? "Drop the file here..."
              : "Drag & drop or click to select an XML/CSV file"}
          </p>
        </div>

        {files.length > 0 && <p>{files[0].name}</p>}

        {progress > 0 && progress < 100 && (
          <div>
            <div>{progress}%</div>
          </div>
        )}

        {uploadMutation.isLoading && <p>Uploading...</p>}
        {uploadMutation.isError && <p>{uploadMutation.error.message}</p>}

        <button
          onClick={() => uploadMutation.mutate({ file: files[0] })}
          disabled={uploadMutation.isLoading || files.length === 0}
        >
          {uploadMutation.isLoading ? "Uploading..." : "Upload File"}
        </button>
      </div>
    </>
  );
};

export default FileUpload;
