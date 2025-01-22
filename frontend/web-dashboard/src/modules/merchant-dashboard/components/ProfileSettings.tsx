import { Box, TextField, Button } from '@mui/material';

export default function ProfileSettings() {
  return (
    <Box>
      <TextField fullWidth label="اسم المتجر" margin="normal" />
      <TextField fullWidth label="البريد الإلكتروني" margin="normal" />
      <TextField fullWidth label="رقم الجوال" margin="normal" />
      <Button variant="contained" sx={{ mt: 2 }}>حفظ التغييرات</Button>
    </Box>
  );
}
