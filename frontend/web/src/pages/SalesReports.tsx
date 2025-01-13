import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const SalesReports: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://172.20.10.4:4000/api/reports/sales');
      setReports(response.data.reports);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        تقارير المبيعات
      </Typography>
      <List>
        {reports.map((report) => (
          <ListItem key={report.id}>
            <ListItemText primary={`تاريخ: ${report.date}`} secondary={`المبيعات: ${report.sales} ريال`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default SalesReports;
