import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
  FormHelperText
} from '@chakra-ui/react';

interface FormInputProps extends InputProps {
  label: string;
  error?: string;
  helperText?: string;
}

const FormInput = ({ label, error, helperText, ...props }: FormInputProps) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Input {...props} />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormInput;
