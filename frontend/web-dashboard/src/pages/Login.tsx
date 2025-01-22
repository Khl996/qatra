import { Box, Card, TextField, Button, Typography, Alert } from '@mui/material';
import { useState } from 'react';
import { useLoginMutation } from '@shared/services/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(credentials).unwrap();
      navigate(result.role === 'merchant' ? '/merchant' : '/admin');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default'
      }}
    >
      <Card sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" textAlign="center" mb={3}>
          تسجيل الدخول - قطرة
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            خطأ في تسجيل الدخول
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="البريد الإلكتروني"
            margin="normal"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          />
          <TextField
            fullWidth
            type="password"
            label="كلمة المرور"
            margin="normal"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
            disabled={isLoading}
          >
            {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
