import { Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetStoresQuery } from '../services/api';

export default function StoresList() {
  const { data: stores = [] } = useGetStoresQuery();

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'اسم المتجر', flex: 1 },
    { field: 'email', headerName: 'البريد الإلكتروني', flex: 1 },
    { field: 'phone', headerName: 'رقم الجوال', width: 150 },
    { field: 'status', headerName: 'الحالة', width: 120 }
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>قائمة المتاجر</Typography>
      <DataGrid
        rows={stores}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10]}
      />
    </Paper>
  );
}
