import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';

interface AddPromotionModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddPromotionModal({ open, onClose }: AddPromotionModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>إضافة عرض جديد</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="عنوان العرض" margin="normal" />
        <TextField fullWidth label="الوصف" margin="normal" multiline rows={4} />
        <Button fullWidth variant="contained" color="primary">
          إضافة
        </Button>
      </DialogContent>
    </Dialog>
  );
}
