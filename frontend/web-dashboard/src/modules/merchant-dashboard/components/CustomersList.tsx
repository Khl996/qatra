import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Paper, Typography, Button } from '@mui/material';
import { useGetCustomerStatsQuery } from '../services/api';

const columns = [
  { field: 'id', headerName: 'الرقم', width: 90 },
  { field: 'name', headerName: 'اسم العميل', flex: 1 },
  { field: 'phone', headerName: 'رقم الجوال', flex: 1 },
  { field: 'totalPoints', headerName: 'مجموع النقاط', flex: 1 },
  { field: 'lastVisit', headerName: 'آخر زيارة', flex: 1 },
  {
    field: 'actions',
    headerName: 'إجراءات',
    flex: 1,
    renderCell: (params) => (
      <Button
        variant="contained"
        size="small"
        onClick={() => console.log('إضافة نقاط', params.row.id)}
      >
        إضافة نقاط
      </Button>
    )
  }
];

export function CustomersList() {
  const { data: customers = [], isLoading } = useGetCustomerStatsQuery();

  return (
    <Paper sx={{ p: 2, height: 400 }}>
      <Typography variant="h6" mb={2}>قائمة العملاء</Typography>
      <DataGrid
        rows={customers}
        columns={columns}
        loading={isLoading}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 }
          }
        }}
        pageSizeOptions={[10]}
      />
    </Paper>
  );
}
