import React, { useState } from 'react';

export interface FileUploaderProps {
  onUpload: (file: File) => Promise<void>;
  acceptedTypes: string[];
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onUpload, acceptedTypes }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      await onUpload(file);
      setFile(null);
    }
  };

  return (
    <div>
      <input type="file" accept={acceptedTypes?.join(',')} onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>
    </div>
  );
};