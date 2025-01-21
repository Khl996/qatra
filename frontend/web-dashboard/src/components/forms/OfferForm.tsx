import React from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Select,
  Button,
  SimpleGrid,
  FormErrorMessage,
  Image,
  Box,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

interface OfferFormData {
  title: string;
  description: string;
  points: number;
  storeId: string;
  expiryDate: string;
  image: string;
}

interface OfferFormProps {
  initialData?: Partial<OfferFormData>;
  onSubmit: (data: OfferFormData) => Promise<void>;
  isLoading?: boolean;
}

export const OfferForm: React.FC<OfferFormProps> = ({
  initialData,
  onSubmit,
  isLoading
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<OfferFormData>({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>عنوان العرض</FormLabel>
            <Input
              {...register('title', { required: 'هذا الحقل مطلوب' })}
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.storeId}>
            <FormLabel>المتجر</FormLabel>
            <Select
              {...register('storeId', { required: 'هذا الحقل مطلوب' })}
              placeholder="اختر المتجر"
            >
              <option value="1">كافيه السعادة</option>
              <option value="2">مطعم البركة</option>
            </Select>
            <FormErrorMessage>
              {errors.storeId && errors.storeId.message}
            </FormErrorMessage>
          </FormControl>
        </SimpleGrid>

        <FormControl isInvalid={!!errors.description}>
          <FormLabel>وصف العرض</FormLabel>
          <Textarea
            {...register('description', { required: 'هذا الحقل مطلوب' })}
            rows={4}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
          <FormControl isInvalid={!!errors.points}>
            <FormLabel>النقاط المطلوبة</FormLabel>
            <NumberInput min={1}>
              <NumberInputField
                {...register('points', { required: 'هذا الحقل مطلوب' })}
              />
            </NumberInput>
            <FormErrorMessage>
              {errors.points && errors.points.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.expiryDate}>
            <FormLabel>تاريخ الانتهاء</FormLabel>
            <Input
              type="date"
              {...register('expiryDate', { required: 'هذا الحقل مطلوب' })}
            />
            <FormErrorMessage>
              {errors.expiryDate && errors.expiryDate.message}
            </FormErrorMessage>
          </FormControl>
        </SimpleGrid>

        <Button
          colorScheme="blue"
          isLoading={isLoading}
          type="submit"
          size="lg"
          w="full"
        >
          حفظ العرض
        </Button>
      </VStack>
    </form>
  );
}
