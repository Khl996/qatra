import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid
} from '@mui/material';
import { useState } from 'react';

interface StoreApprovalModalProps {
  open: boolean;
  onClose: () => void;
  store: {
    id: string;
    name: string;
    ownerName: string;
    email: string;
    phone: string;
    documents: string[];
  };
  onApprove: (id: string, data: any) => void;
}

export function StoreApprovalModal({ open, onClose, store, onApprove }: StoreApprovalModalProps) {
  const [notes, setNotes] = useState('');

  const handleApprove = () => {
    onApprove(store.id, { notes, status: 'approved' });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>مراجعة طلب المتجر</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="اسم المتجر"
              value={store?.name}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="اسم المالك"
              value={store?.ownerName}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="ملاحظات"
              multiline
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>إلغاء</Button>
        <Button onClick={handleApprove} variant="contained" color="primary">
          موافقة
        </Button>
      </DialogActions>
    </Dialog>
  );
}
