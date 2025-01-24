import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage
} from '@chakra-ui/react';
import { useState } from 'react';

interface LoginFormProps {
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  isLoading?: boolean;
}

const LoginForm = ({ onSubmit, isLoading = false }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // التحقق من البيانات
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'البريد الإلكتروني مطلوب' }));
      return;
    }
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'كلمة المرور مطلوبة' }));
      return;
    }

    await onSubmit({ email, password });
  };

  return (
    <VStack as="form" spacing={4} onSubmit={handleSubmit}>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel>البريد الإلكتروني</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="أدخل البريد الإلكتروني"
        />
        {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel>كلمة المرور</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="أدخل كلمة المرور"
        />
        {errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
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
  );
};

export default LoginForm;
