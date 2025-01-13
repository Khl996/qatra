import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const ManageProducts: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://172.20.10.4:4000/api/products');
      setProducts(response.data.products);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  const handleAddProduct = async () => {
    if (!name || price <= 0) {
      alert('All fields are required and price must be greater than 0!');
      return;
    }

    try {
      const response = await axios.post('http://172.20.10.4:4000/api/products', {
        name,
        price,
      });
      alert('Product added successfully!');
      fetchProducts();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await axios.delete(`http://172.20.10.4:4000/api/products/${productId}`);
      alert('Product deleted successfully!');
      fetchProducts();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        إدارة المنتجات
      </Typography>
      <TextField
        label="اسم المنتج"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="السعر"
        type="number"
        fullWidth
        margin="normal"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <Button variant="contained" color="primary" onClick={handleAddProduct}>
        إضافة المنتج
      </Button>
      <List>
        {products.map((product) => (
          <ListItem key={product.id}>
            <ListItemText primary={product.name} secondary={`${product.price} ريال`} />
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProduct(product.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ManageProducts;
