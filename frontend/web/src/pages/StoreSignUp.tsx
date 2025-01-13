import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const StoreSignUp: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [owner, setOwner] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignUp = async () => {
    if (!name || !owner || !phone || !email || !description || !category || !password) {
      alert('All fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://172.20.10.4:4000/api/stores/signup', {
        name,
        owner,
        phone,
        email,
        description,
        category,
        password,
      });
      alert('Store registration successful!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        تسجيل متجر جديد
      </Typography>
      <TextField
        label="اسم المتجر"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="اسم المسؤول"
        fullWidth
        margin="normal"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />
      <TextField
        label="رقم الجوال"
        fullWidth
        margin="normal"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        label="البريد الإلكتروني"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="وصف المتجر"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="تصنيف المتجر"
        fullWidth
        margin="normal"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <TextField
        label="كلمة المرور"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSignUp}>
        تسجيل
      </Button>
    </Container>
  );
};

export default StoreSignUp;
