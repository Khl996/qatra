import { useState } from 'react';
import { Paper, TextField, Button, Box, Typography, Grid } from '@mui/material';
import { useAddPointsMutation } from '../services/api';

export default function AddPointsForm() {
  const [formData, setFormData] = useState({
    customerPhone: '',
    amount: '',
  });
  const [addPoints] = useAddPointsMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addPoints({
        customerPhone: formData.customerPhone,
        amount: Number(formData.amount)
      });
    } catch (error) {
      console.error('Error adding points:', error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>إضافة نقاط</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="رقم الجوال"
              value={formData.customerPhone}
              onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="المبلغ"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              إضافة النقاط
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
