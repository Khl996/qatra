import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  SelectProps,
  FormHelperText
} from '@chakra-ui/react';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends Omit<SelectProps, 'children'> {
  label: string;
  options: Option[];
  error?: string;
  helperText?: string;
}

const FormSelect = ({ label, options, error, helperText, ...props }: FormSelectProps) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Select {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormSelect;
