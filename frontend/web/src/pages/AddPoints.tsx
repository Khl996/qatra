import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const AddPoints: React.FC = () => {
  const [identifier, setIdentifier] = useState<string>('');
  const [points, setPoints] = useState<number>(0);

  const handleAddPoints = async () => {
    if (!identifier || points <= 0) {
      alert('All fields are required and points must be greater than 0!');
      return;
    }

    try {
      const response = await axios.post('http://172.20.10.4:4000/api/points/add', {
        identifier,
        points,
      });
      alert('Points added successfully!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        إضافة النقاط للعملاء
      </Typography>
      <TextField
        label="رقم الجوال أو البريد الإلكتروني أو الرقم الفريد"
        fullWidth
        margin="normal"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <TextField
        label="عدد النقاط"
        type="number"
        fullWidth
        margin="normal"
        value={points}
        onChange={(e) => setPoints(Number(e.target.value))}
      />
      <Button variant="contained" color="primary" onClick={handleAddPoints}>
        إضافة النقاط
      </Button>
    </Container>
  );
};

export default AddPoints;
