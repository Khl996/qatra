import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react';
import { useRef } from 'react';

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText?: string;
  onConfirm: () => void;
  isLoading?: boolean;
  type?: 'error' | 'warning' | 'info';
}

const AlertDialog = ({
  isOpen,
  onClose,
  title,
  message,
  confirmText = 'موافق',
  onConfirm,
  isLoading = false,
  type = 'warning'
}: AlertDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  
  const colorScheme = {
    error: 'red',
    warning: 'orange',
    info: 'blue'
  }[type];

  return (
    <ChakraAlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            {message}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              إلغاء
            </Button>
            <Button
              colorScheme={colorScheme}
              onClick={onConfirm}
              isLoading={isLoading}
              mr={3}
            >
              {confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </ChakraAlertDialog>
  );
};

export default AlertDialog;
