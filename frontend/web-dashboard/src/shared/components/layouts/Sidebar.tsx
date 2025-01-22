import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  role: 'merchant' | 'admin';
}

export default function Sidebar({ role }: SidebarProps) {
  const navigate = useNavigate();

  const merchantMenuItems = [
    { text: 'لوحة التحكم', icon: <DashboardIcon />, path: '/merchant' },
    { text: 'النقاط', icon: <ReceiptIcon />, path: '/merchant/points' },
    { text: 'العملاء', icon: <PeopleIcon />, path: '/merchant/customers' },
    { text: 'الإعدادات', icon: <SettingsIcon />, path: '/merchant/settings' }
  ];

  const adminMenuItems = [
    { text: 'لوحة التحكم', icon: <DashboardIcon />, path: '/admin' },
    { text: 'المتاجر', icon: <PeopleIcon />, path: '/admin/stores' },
    { text: 'التقارير', icon: <ReceiptIcon />, path: '/admin/reports' },
    { text: 'الإعدادات', icon: <SettingsIcon />, path: '/admin/settings' }
  ];

  const menuItems = role === 'merchant' ? merchantMenuItems : adminMenuItems;

  return (
    <Drawer variant="permanent" sx={{ width: 240 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.path} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
