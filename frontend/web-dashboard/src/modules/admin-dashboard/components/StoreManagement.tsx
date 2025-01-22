import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import { useGetStoresQuery, useApproveStoreMutation } from '../services/api';

export default function StoreManagement() {
  const { data: stores = [] } = useGetStoresQuery();
  const [approveStore] = useApproveStoreMutation();

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'اسم المتجر', flex: 1 },
    { field: 'phone', headerName: 'رقم الجوال', flex: 1 },
    { field: 'email', headerName: 'البريد الإلكتروني', flex: 1 },
    { field: 'status', headerName: 'الحالة', flex: 1 },
    {
      field: 'actions',
      headerName: 'الإجراءات',
      flex: 1,
      renderCell: (params: any) => (
        <Button 
          variant="contained" 
          onClick={() => approveStore(params.row.id)}
          disabled={params.row.status === 'approved'}
        >
          موافقة
        </Button>
      )
    }
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant="h6" mb={2}>إدارة المتاجر</Typography>
      <DataGrid
        rows={stores}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 }
          }
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
