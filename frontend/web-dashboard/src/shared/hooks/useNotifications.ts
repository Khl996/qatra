import { useState, useEffect } from 'react';
import { api } from '@shared/services/api';

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const notificationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<Notification[], void>({
      query: () => '/notifications'
    }),
    markAsRead: builder.mutation<void, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: 'PUT'
      })
    })
  })
});

export const { useGetNotificationsQuery, useMarkAsReadMutation } = notificationsApi;

export function useNotifications() {
  const { data: notifications = [] } = useGetNotificationsQuery();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const count = notifications.filter((n: Notification) => !n.isRead).length;
    setUnreadCount(count);
  }, [notifications]);

  return {
    notifications,
    unreadCount
  };
}
