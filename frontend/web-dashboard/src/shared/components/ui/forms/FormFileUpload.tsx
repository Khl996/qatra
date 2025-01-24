import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

interface FormFileUploadProps {
  label: string;
  onFileSelect: (files: File[]) => void;
  accept?: string[];
  maxSize?: number;
  error?: string;
  multiple?: boolean;
}

const FormFileUpload = ({
  label,
  onFileSelect,
  accept,
  maxSize = 5242880, // 5MB
  error,
  multiple = false,
}: FormFileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileSelect(acceptedFiles);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? accept.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}) : undefined,
    maxSize,
    multiple,
  });

  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const activeBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Box
        {...getRootProps()}
        borderWidth={2}
        borderRadius="md"
        borderColor={borderColor}
        borderStyle="dashed"
        p={6}
        textAlign="center"
        bg={isDragActive ? activeBg : 'transparent'}
        transition="all 0.2s"
        cursor="pointer"
      >
        <input {...getInputProps()} />
        <Icon as={FiUpload} boxSize={6} color="gray.400" mb={2} />
        <Text>
          {isDragActive
            ? 'أفلت الملفات هنا'
            : 'اسحب وأفلت الملفات هنا، أو انقر للاختيار'}
        </Text>
      </Box>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormFileUpload;
