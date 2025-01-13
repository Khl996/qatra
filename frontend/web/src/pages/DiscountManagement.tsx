import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const DiscountManagement: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [discounts, setDiscounts] = useState<any[]>([]);

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const response = await axios.get('http://172.20.10.4:4000/api/discounts');
      setDiscounts(response.data.discounts);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  const handleAddDiscount = async () => {
    if (!code || discount <= 0) {
      alert('All fields are required and discount must be greater than 0!');
      return;
    }

    try {
      const response = await axios.post('http://172.20.10.4:4000/api/discounts', {
        code,
        discount,
      });
      alert('Discount added successfully!');
      fetchDiscounts();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  const handleDeleteDiscount = async (discountId: string) => {
    try {
      await axios.delete(`http://172.20.10.4:4000/api/discounts/${discountId}`);
      alert('Discount deleted successfully!');
      fetchDiscounts();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        إدارة الأكواد والخصومات
      </Typography>
      <TextField
        label="كود الخصم"
        fullWidth
        margin="normal"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <TextField
        label="نسبة الخصم"
        type="number"
        fullWidth
        margin="normal"
        value={discount}
        onChange={(e) => setDiscount(Number(e.target.value))}
      />
      <Button variant="contained" color="primary" onClick={handleAddDiscount}>
        إضافة الخصم
      </Button>
      <List>
        {discounts.map((discount) => (
          <ListItem key={discount.id}>
            <ListItemText primary={discount.code} secondary={`${discount.discount}%`} />
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteDiscount(discount.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DiscountManagement;
