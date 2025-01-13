import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const AdManagement: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [ads, setAds] = useState<any[]>([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await axios.get('http://172.20.10.4:4000/api/ads');
      setAds(response.data.ads);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  const handleAddAd = async () => {
    if (!title || !description) {
      alert('All fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://172.20.10.4:4000/api/ads', {
        title,
        description,
      });
      alert('Ad added successfully!');
      fetchAds();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  const handleDeleteAd = async (adId: string) => {
    try {
      await axios.delete(`http://172.20.10.4:4000/api/ads/${adId}`);
      alert('Ad deleted successfully!');
      fetchAds();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        إدارة الإعلانات
      </Typography>
      <TextField
        label="عنوان الإعلان"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="وصف الإعلان"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAddAd}>
        إضافة الإعلان
      </Button>
      <List>
        {ads.map((ad) => (
          <ListItem key={ad.id}>
            <ListItemText primary={ad.title} secondary={ad.description} />
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAd(ad.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AdManagement;
