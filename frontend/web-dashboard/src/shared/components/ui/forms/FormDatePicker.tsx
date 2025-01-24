import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';

interface FormDatePickerProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  error?: string;
  required?: boolean;
  id?: string;
}

const FormDatePicker = ({
  label,
  value,
  onChange,
  error,
  required = false,
  id,
}: FormDatePickerProps) => {
  const inputId = id || `date-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      <FormLabel htmlFor={inputId}>{label}</FormLabel>
      <Input
        id={inputId}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        max="2100-12-31"
        min="1900-01-01"
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormDatePicker;
