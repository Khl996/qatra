import { Paper, Typography } from '@mui/material';
import { useGetPointsHistoryQuery } from '../services/api';
import DataGridPro from '@shared/components/DataGridPro';

const columns = [
  { field: 'id', headerName: 'رقم العملية', width: 120 },
  { field: 'customerName', headerName: 'اسم العميل', flex: 1 },
  { field: 'phone', headerName: 'رقم الجوال', width: 150 },
  { field: 'points', headerName: 'النقاط', width: 100 },
  { field: 'amount', headerName: 'المبلغ', width: 100 },
  { field: 'date', headerName: 'التاريخ', width: 180 }
];

export function PointsHistory() {
  const { data = [], isLoading } = useGetPointsHistoryQuery();

  return (
    <Paper sx={{ p: 2, height: 400 }}>
      <Typography variant="h6" mb={2}>سجل النقاط</Typography>
      <DataGridPro
        rows={data}
        columns={columns}
        loading={isLoading}
        pageSizeOptions={[5]}
      />
    </Paper>
  );
}
