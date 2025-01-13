import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const ManageOffers: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [offers, setOffers] = useState<any[]>([]);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get('http://172.20.10.4:4000/api/offers');
      setOffers(response.data.offers);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  const handleAddOffer = async () => {
    if (!title || !description || discount <= 0) {
      alert('All fields are required and discount must be greater than 0!');
      return;
    }

    try {
      const response = await axios.post('http://172.20.10.4:4000/api/offers', {
        title,
        description,
        discount,
      });
      alert('Offer added successfully!');
      fetchOffers();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  const handleDeleteOffer = async (offerId: string) => {
    try {
      await axios.delete(`http://172.20.10.4:4000/api/offers/${offerId}`);
      alert('Offer deleted successfully!');
      fetchOffers();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        إدارة العروض
      </Typography>
      <TextField
        label="عنوان العرض"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="وصف العرض"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="نسبة الخصم"
        type="number"
        fullWidth
        margin="normal"
        value={discount}
        onChange={(e) => setDiscount(Number(e.target.value))}
      />
      <Button variant="contained" color="primary" onClick={handleAddOffer}>
        إضافة العرض
      </Button>
      <List>
        {offers.map((offer) => (
          <ListItem key={offer.id}>
            <ListItemText primary={offer.title} secondary={`${offer.description} - ${offer.discount}%`} />
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteOffer(offer.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ManageOffers;
