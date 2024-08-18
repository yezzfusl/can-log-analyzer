import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploaderProps {
  onFileUpload: (content: string) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onabort = () => console.log('File reading was aborted');
    reader.onerror = () => console.log('File reading has failed');
    reader.onload = () => {
      const content = reader.result as string;
      onFileUpload(content);
    };

    reader.readAsText(file);
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the CAN log file here ...</p>
      ) : (
        <p>Drag &amp; drop a CAN log file here, or click to select a file</p>
      )}
    </div>
  );
};

export default FileUploader;
