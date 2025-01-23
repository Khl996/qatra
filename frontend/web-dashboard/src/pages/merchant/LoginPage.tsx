import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Box, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

export default function MerchantLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    
    try {
      const response = await fetch('/api/merchant/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const { token } = await response.json();
        login(token, 'merchant');
        navigate('/merchant/dashboard');
      } else {
        setError('بيانات الدخول غير صحيحة');
      }
    } catch (error) {
      setError('حدث خطأ في الاتصال');
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" align="center" gutterBottom>
          تسجيل دخول المتجر
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="البريد الإلكتروني"
            name="email"
            type="email"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="كلمة المرور"
            name="password"
            type="password"
            required
          />
          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
          >
            دخول
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
