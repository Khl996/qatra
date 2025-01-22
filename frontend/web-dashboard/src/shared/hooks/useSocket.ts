import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAuth } from '@shared/hooks/useAuth';

export function useSocket() {
  const { token } = useAuth();
  const socketRef = useRef<Socket>();

  useEffect(() => {
    if (!token) return;

    socketRef.current = io(process.env.REACT_APP_WS_URL!, {
      auth: { token },
      autoConnect: true
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [token]);

  return socketRef.current;
}
