import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone, Accept } from 'react-dropzone';

interface FileUploaderProps {
  onUpload: (file: File) => Promise<void>;
  allowedTypes?: string[];
  maxSize?: number;
}

export function FileUploader({ 
  onUpload, 
  allowedTypes = ['image/*', 'application/pdf'], 
  maxSize = 5242880 // 5MB
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploading(true);
      try {
        await onUpload(file);
      } finally {
        setUploading(false);
        setProgress(0);
      }
    }
  }, [onUpload]);

  const acceptedTypes: Accept = {
    'image/*': ['.jpg', '.jpeg', '.png'],
    'application/pdf': ['.pdf']
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    maxSize,
    multiple: false
  });

  return (
    <Box>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.300',
          borderRadius: 1,
          p: 3,
          textAlign: 'center',
          cursor: 'pointer'
        }}
      >
        <input {...getInputProps()} />
        <Typography>
          {isDragActive ? 'اسحب الملف هنا' : 'انقر أو اسحب الملف هنا للرفع'}
        </Typography>
      </Box>
      {uploading && <LinearProgress value={progress} sx={{ mt: 2 }} />}
    </Box>
  );
}
