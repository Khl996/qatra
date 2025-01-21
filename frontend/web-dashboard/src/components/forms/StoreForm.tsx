import React from 'react';
import {
  VStack,
  FormControl,
  Input,
  Button,
  useToast,
  FormLabel,
  FormErrorMessage,
  SimpleGrid,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

interface StoreFormData {
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  commercialRecord: string;
}

interface StoreFormProps {
  initialData?: Partial<StoreFormData>;
  onSubmit: (data: StoreFormData) => Promise<void>;
  isLoading?: boolean;
}

export const StoreForm: React.FC<StoreFormProps> = ({
  initialData,
  onSubmit,
  isLoading
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<StoreFormData>({
    defaultValues: initialData
  });

  const toast = useToast();

  const onFormSubmit = async (data: StoreFormData) => {
    try {
      await onSubmit(data);
      toast({
        title: 'تم الحفظ بنجاح',
        status: 'success',
        duration: 3000,
        position: 'top'
      });
    } catch (error) {
      toast({
        title: 'حدث خطأ',
        description: 'يرجى المحاولة مرة أخرى',
        status: 'error',
        duration: 3000,
        position: 'top'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <VStack spacing={6}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>اسم المتجر</FormLabel>
            <Input
              {...register('name', { required: 'هذا الحقل مطلوب' })}
              placeholder="اسم المتجر"
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.ownerName}>
            <FormLabel>اسم المالك</FormLabel>
            <Input
              {...register('ownerName', { required: 'هذا الحقل مطلوب' })}
              placeholder="اسم المالك"
            />
            <FormErrorMessage>
              {errors.ownerName && errors.ownerName.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.phone}>
            <FormLabel>رقم الجوال</FormLabel>
            <Input
              {...register('phone', {
                required: 'هذا الحقل مطلوب',
                pattern: {
                  value: /^(05\d{8}|5\d{8})$/,
                  message: 'رقم جوال غير صحيح'
                }
              })}
              placeholder="05xxxxxxxx"
              dir="ltr"
            />
            <FormErrorMessage>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel>البريد الإلكتروني</FormLabel>
            <Input
              {...register('email', {
                required: 'هذا الحقل مطلوب',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'بريد إلكتروني غير صحيح'
                }
              })}
              placeholder="example@domain.com"
              dir="ltr"
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
        </SimpleGrid>

        <FormControl isInvalid={!!errors.address}>
          <FormLabel>العنوان</FormLabel>
          <Input
            {...register('address', { required: 'هذا الحقل مطلوب' })}
            placeholder="عنوان المتجر"
          />
          <FormErrorMessage>
            {errors.address && errors.address.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.commercialRecord}>
          <FormLabel>رقم السجل التجاري</FormLabel>
          <Input
            {...register('commercialRecord', { required: 'هذا الحقل مطلوب' })}
            placeholder="رقم السجل التجاري"
            dir="ltr"
          />
          <FormErrorMessage>
            {errors.commercialRecord && errors.commercialRecord.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          colorScheme="blue"
          isLoading={isLoading}
          type="submit"
          size="lg"
        >
          حفظ
        </Button>
      </VStack>
    </form>
  );
};
