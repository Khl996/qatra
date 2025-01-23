import { lazy } from 'react';

export const merchantRoutes = [
  {
    path: '/merchant',
    element: lazy(() => import('../modules/merchant-dashboard/pages/Dashboard')),
    children: [
      // ...merchant routes
    ]
  }
];

export const adminRoutes = [
  {
    path: '/admin',
    element: lazy(() => import('../modules/admin-dashboard/pages/Dashboard')),
    children: [
      // ...admin routes
    ]
  }
];

export {};
