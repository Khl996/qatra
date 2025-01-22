import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useRegisterStoreMutation } from '../services/api';

export default function StoreRegistration() {
  const [registerStore] = useRegisterStoreMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    try {
      await registerStore({
        storeName: formData.get('storeName'),
        ownerName: formData.get('ownerName'),
        email: formData.get('email'),
        phone: formData.get('phone')
      }).unwrap();
    } catch (error) {
      console.error('Failed to register store:', error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>تسجيل متجر جديد</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          name="storeName"
          label="اسم المتجر"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          name="ownerName"
          label="اسم المالك"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          name="email"
          label="البريد الإلكتروني"
          type="email"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          name="phone"
          label="رقم الجوال"
          margin="normal"
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
        >
          تسجيل المتجر
        </Button>
      </Box>
    </Paper>
  );
}
