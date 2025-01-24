import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Spinner, Center } from '@chakra-ui/react';

interface AuthGuardProps {
  children: ReactNode;
  isAuthenticated: boolean;
  isLoading?: boolean;
  loginPath?: string;
  roles?: string[];
  userRole?: string;
}

const AuthGuard = ({
  children,
  isAuthenticated,
  isLoading = false,
  loginPath = '/login',
  roles = [],
  userRole,
}: AuthGuardProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(loginPath, { replace: true });
    }

    if (roles.length > 0 && userRole && !roles.includes(userRole)) {
      navigate('/unauthorized', { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate, loginPath, roles, userRole]);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return isAuthenticated ? <Box>{children}</Box> : null;
};

export default AuthGuard;
