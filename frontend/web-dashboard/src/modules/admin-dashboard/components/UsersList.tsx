import { Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetUsersQuery } from '../services/api';

export default function UsersList() {
  const { data: users = [], isLoading } = useGetUsersQuery();

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'الاسم', flex: 1 },
    { field: 'email', headerName: 'البريد الإلكتروني', flex: 1 },
    { field: 'role', headerName: 'الصلاحية', width: 120 },
    { field: 'status', headerName: 'الحالة', width: 120 }
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>المستخدمين</Typography>
      <DataGrid
        rows={users}
        columns={columns}
        loading={isLoading}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10]}
      />
    </Paper>
  );
}
