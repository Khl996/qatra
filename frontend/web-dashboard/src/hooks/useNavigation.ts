import { useNavigate } from 'react-router-dom';
import { routes } from '../config/routes';

export const useNavigation = () => {
  const navigate = useNavigate();

  return {
    // التنقل للمتاجر
    goToDashboard: () => navigate(routes.merchant.dashboard),
    goToPoints: () => navigate(routes.merchant.points),
    goToOffers: () => navigate(routes.merchant.offers),
    goToSales: () => navigate(routes.merchant.sales),
    goToReports: () => navigate(routes.merchant.reports),
    goToSettings: () => navigate(routes.merchant.settings),

    // التنقل للمسؤولين
    goToAdminDashboard: () => navigate(routes.admin.dashboard),
    goToStores: () => navigate('/admin/stores'),
    goToUsers: () => navigate('/admin/users'),
    goToSystemReports: () => navigate('/admin/reports'),
  };
};
