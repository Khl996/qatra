import { 
  Popover, 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Box,
  IconButton,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNotifications } from '@shared/hooks/useNotifications';

interface Notification {
  id: string | number;
  title: string;
  message: string;
}

interface NotificationsPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export default function NotificationsPopover({ anchorEl, onClose }: NotificationsPopoverProps) {
  const { notifications } = useNotifications();

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Box sx={{ width: 300, p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">الإشعارات</Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 1 }} />
        <List>
          {notifications.map((notification: Notification) => (
            <ListItem key={notification.id}>
              <ListItemText 
                primary={notification.title}
                secondary={notification.message}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Popover>
  );
}
