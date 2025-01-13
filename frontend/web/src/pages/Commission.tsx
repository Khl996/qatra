import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const Commission: React.FC = () => {
  const [commissions, setCommissions] = useState<any[]>([]);

  useEffect(() => {
    fetchCommissions();
  }, []);

  const fetchCommissions = async () => {
    try {
      const response = await axios.get('http://172.20.10.4:4000/api/commissions');
      setCommissions(response.data.commissions);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        حساب العمولة
      </Typography>
      <List>
        {commissions.map((commission) => (
          <ListItem key={commission.id}>
            <ListItemText primary={`تاريخ: ${commission.date}`} secondary={`العمولة: ${commission.amount} ريال`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Commission;
