import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PointsIcon from '@mui/icons-material/Stars';
import SettingsIcon from '@mui/icons-material/Settings';
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  role: 'merchant' | 'admin';
}

const Sidebar = ({ role }: SidebarProps) => {
  const navigate = useNavigate();
  
  const menuItems = role === 'merchant' ? [
    { text: 'لوحة التحكم', path: '/merchant', icon: <DashboardIcon /> },
    { text: 'النقاط', path: '/merchant/points', icon: <PointsIcon /> },
    { text: 'الإعدادات', path: '/merchant/settings', icon: <SettingsIcon /> }
  ] : [
    { text: 'لوحة التحكم', path: '/admin', icon: <DashboardIcon /> },
    { text: 'المتاجر', path: '/admin/stores', icon: <StoreIcon /> },
    { text: 'الإعدادات', path: '/admin/settings', icon: <SettingsIcon /> }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' }
      }}
    >
      <List sx={{ mt: 8 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
