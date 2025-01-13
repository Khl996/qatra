import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

const StoreManagement: React.FC = () => {
  const [stores, setStores] = useState<any[]>([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await axios.get('http://172.20.10.4:4000/api/admin/stores');
      setStores(response.data.stores);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  const handleApproveStore = async (storeId: string) => {
    try {
      await axios.post(`http://172.20.10.4:4000/api/admin/approve-store/${storeId}`);
      alert('Store approved successfully!');
      fetchStores();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  const handleRejectStore = async (storeId: string) => {
    try {
      await axios.post(`http://172.20.10.4:4000/api/admin/reject-store/${storeId}`);
      alert('Store rejected successfully!');
      fetchStores();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        إدارة المتاجر
      </Typography>
      <List>
        {stores.map((store) => (
          <ListItem key={store.id}>
            <ListItemText primary={store.name} secondary={store.email} />
            <IconButton edge="end" aria-label="approve" onClick={() => handleApproveStore(store.id)}>
              <CheckIcon />
            </IconButton>
            <IconButton edge="end" aria-label="reject" onClick={() => handleRejectStore(store.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default StoreManagement;
