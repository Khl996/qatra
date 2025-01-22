import { lazy } from 'react';

// استخدام مسارات مطلقة
const MerchantDashboard = lazy(() => import('../modules/merchant-dashboard/pages/Dashboard'));
const AdminDashboard = lazy(() => import('../modules/admin-dashboard/pages/Dashboard'));

export const merchantRoutes = [
  {
    path: '/merchant',
    element: MerchantDashboard,
    children: [
      { 
        path: 'points', 
        element: lazy(() => import('../modules/merchant-dashboard/pages/Points'))
      },
      { 
        path: 'sales', 
        element: lazy(() => import('../modules/merchant-dashboard/pages/Sales'))
      },
      { path: 'settings', element: lazy(() => import('@merchant/pages/Settings')) }
    ]
  }
];

export const adminRoutes = [
  {
    path: '/admin',
    element: AdminDashboard,
    children: [
      { path: 'stores', element: lazy(() => import('@admin/pages/Stores')) },
      { 
        path: 'users', 
        element: lazy(() => import('../modules/admin-dashboard/pages/Users'))
      },
      { path: 'reports', element: lazy(() => import('@admin/pages/Reports')) }
    ]
  }
];
