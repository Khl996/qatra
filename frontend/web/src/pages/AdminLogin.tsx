import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('All fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://172.20.10.4:4000/api/admin/login', {
        email,
        password,
      });
      alert('Login successful!');
      // توجيه المستخدم إلى لوحة التحكم بعد تسجيل الدخول بنجاح
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        تسجيل الدخول للإدارة
      </Typography>
      <TextField
        label="البريد الإلكتروني"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="كلمة المرور"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        تسجيل الدخول
      </Button>
    </Container>
  );
};

export default AdminLogin;
