import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useSocket } from '@shared/hooks/useSocket';
import { useAuth } from '@shared/hooks/useAuth';

export default function NotificationSystem() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const socket = useSocket();

  useEffect(() => {
    if (!socket || !user) return;

    socket.on('notification', (data) => {
      enqueueSnackbar(data.message, {
        variant: data.type || 'info',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'left'
        }
      });
    });

    return () => {
      socket.off('notification');
    };
  }, [socket, user, enqueueSnackbar]);

  return null;
}
