import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const FinancialReports: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://172.20.10.4:4000/api/reports/financial');
      setReports(response.data.reports);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        التقارير المالية
      </Typography>
      <List>
        {reports.map((report) => (
          <ListItem key={report.id}>
            <ListItemText primary={`تاريخ: ${report.date}`} secondary={`الإيرادات: ${report.revenue} ريال`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default FinancialReports;
