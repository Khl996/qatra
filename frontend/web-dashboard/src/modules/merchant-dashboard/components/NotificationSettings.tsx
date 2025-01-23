import React from 'react';
import { Paper, Switch, FormControlLabel, Typography, Grid } from '@mui/material';

export default function NotificationSettings() {
  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            إعدادات الإشعارات
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="إشعارات النقاط"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="إشعارات المبيعات"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="إشعارات العروض"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
