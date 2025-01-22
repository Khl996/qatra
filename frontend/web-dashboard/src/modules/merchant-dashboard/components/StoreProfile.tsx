import { useState } from 'react';
import { 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  Typography, 
  Avatar,
  Alert
} from '@mui/material';
import { FileUploader } from './FileUploader';
import { useUpdateStoreMutation, useGetStoreProfileQuery } from '../services/api';

export function StoreProfile() {
  const { data: profile } = useGetStoreProfileQuery();
  const [updateStore] = useUpdateStoreMutation();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    try {
      await updateStore(formData).unwrap();
      setSuccess(true);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        بيانات المتجر
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          تم تحديث البيانات بنجاح
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Avatar
              src={profile?.logo}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <FileUploader
              onUpload={async (file) => {
                const formData = new FormData();
                formData.append('logo', file);
                await updateStore(formData);
              }}
              acceptedTypes={['image/*']}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="اسم المتجر"
              name="storeName"
              defaultValue={profile?.name}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="رقم الجوال"
              name="phone"
              defaultValue={profile?.phone}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="وصف المتجر"
              name="description"
              defaultValue={profile?.description}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              حفظ التغييرات
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
