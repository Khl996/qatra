import DataGridPro from '@shared/components/DataGridPro';
import { Paper, Typography, Button, Stack } from '@mui/material';
import { useState } from 'react';
import { useGetOffersQuery } from '../services/api';
import AddOfferModal from './AddOfferModal';

const columns = [
  { field: 'id', headerName: 'الرقم', width: 90 },
  { field: 'title', headerName: 'عنوان العرض', flex: 1 },
  { field: 'points', headerName: 'النقاط المطلوبة', width: 130 },
  { field: 'startDate', headerName: 'تاريخ البداية', width: 130 },
  { field: 'endDate', headerName: 'تاريخ النهاية', width: 130 },
  { field: 'status', headerName: 'الحالة', width: 100 }
];

export function OffersList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: offers = [], isLoading } = useGetOffersQuery();

  return (
    <Paper sx={{ p: 2, height: 500 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">العروض المتاحة</Typography>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          إضافة عرض جديد
        </Button>
      </Stack>
      <DataGridPro
        rows={offers}
        columns={columns}
        loading={isLoading}
        pageSizeOptions={[5]}
      />
      <AddOfferModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Paper>
  );
}
