import { Paper, Typography } from '@mui/material';
import { BaseDataGrid } from '@shared/components/tables/BaseDataGrid';

const columns = [
  { field: 'date', headerName: 'التاريخ', width: 150 },
  { field: 'points', headerName: 'النقاط', width: 120 },
  { field: 'sales', headerName: 'المبيعات', width: 120 },
  { field: 'customers', headerName: 'العملاء', width: 120 }
];

export default function StoreReports() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        تقارير المتجر
      </Typography>
      <BaseDataGrid
        rows={[]}
        columns={columns}
        loading={false}
      />
    </Paper>
  );
}
