import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
  error?: string;
  type?: 'admin' | 'merchant';
}

const LoginForm = ({ onSubmit, isLoading, error, type = 'admin' }: LoginFormProps) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // تحقق من وجود البيانات قبل الإرسال
    if (formData.email && formData.password) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>{type === 'admin' ? 'البريد الإلكتروني' : 'البريد الإلكتروني أو رقم الهاتف'}</FormLabel>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={type === 'admin' ? 'أدخل البريد الإلكتروني' : 'أدخل البريد الإلكتروني أو رقم الهاتف'}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>كلمة المرور</FormLabel>
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="أدخل كلمة المرور"
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          isLoading={isLoading}
        >
          تسجيل الدخول
        </Button>
      </VStack>
    </form>
  );
};

export default LoginForm;
