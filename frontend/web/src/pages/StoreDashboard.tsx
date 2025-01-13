import React from 'react';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';

const StoreDashboard: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        لوحة التحكم للمتجر
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">إضافة النقاط للعملاء</Typography>
            <Button variant="contained" color="primary" fullWidth>
              إضافة النقاط
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">إدارة العروض</Typography>
            <Button variant="contained" color="primary" fullWidth>
              إدارة العروض
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">إدارة المنتجات</Typography>
            <Button variant="contained" color="primary" fullWidth>
              إدارة المنتجات
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">تقارير المبيعات</Typography>
            <Button variant="contained" color="primary" fullWidth>
              تقارير المبيعات
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">حساب العمولة</Typography>
            <Button variant="contained" color="primary" fullWidth>
              حساب العمولة
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StoreDashboard;
