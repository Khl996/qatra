import { Box, Typography, TextField, Button, Alert, Grid } from '@mui/material';
import { useState } from 'react';
import { useUpdatePointsSettingsMutation } from '../services/api';

export function PointsSettings() {
  const [settings, setSettings] = useState({
    pointsPerRiyal: 10,
    minimumAmount: 100,
    maximumPointsPerDay: 1000
  });

  const [updateSettings] = useUpdatePointsSettingsMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSettings(settings).unwrap();
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" mb={3}>إعدادات النقاط</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="نقاط لكل ريال"
            type="number"
            value={settings.pointsPerRiyal}
            onChange={(e) => setSettings({ ...settings, pointsPerRiyal: Number(e.target.value) })}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="الحد الأدنى للمبلغ"
            type="number"
            value={settings.minimumAmount}
            onChange={(e) => setSettings({ ...settings, minimumAmount: Number(e.target.value) })}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="الحد الأقصى للنقاط اليومية"
            type="number"
            value={settings.maximumPointsPerDay}
            onChange={(e) => setSettings({ ...settings, maximumPointsPerDay: Number(e.target.value) })}
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        حفظ الإعدادات
      </Button>
    </Box>
  );
}
