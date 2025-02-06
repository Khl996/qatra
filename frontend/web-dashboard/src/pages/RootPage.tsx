import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Center, Spinner } from '@chakra-ui/react';
import { useAppSelector } from '../hooks/useAppDispatch';

const RootPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      // إذا كان المستخدم مسجل الدخول، قم بتوجيهه إلى لوحة التحكم المناسبة
      navigate(`/${userRole}/dashboard`);
    } else {
      // إذا لم يكن مسجل الدخول، وجهه إلى صفحة تسجيل الدخول كتاجر
      navigate('/merchant/login');
    }
  }, [isAuthenticated, userRole, navigate]);

  return (
    <Center h="100vh">
      <Spinner size="xl" color="blue.500" />
    </Center>
  );
};

export default RootPage;
