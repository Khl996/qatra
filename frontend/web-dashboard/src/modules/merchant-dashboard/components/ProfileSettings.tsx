import React from 'react';
import { Paper, TextField, Button, Grid } from '@mui/material';

export default function ProfileSettings() {
  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth label="اسم المتجر" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="البريد الإلكتروني" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="رقم الجوال" />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" fullWidth>
            حفظ التغييرات
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
