import { Paper, Typography, Grid, Switch, FormControlLabel } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { useGetStoresMonitoringQuery, useUpdateStoreStatusMutation } from '../services/api';

export function StoresMonitoring() {
  const { data: stores = [] } = useGetStoresMonitoringQuery({});
  const [updateStatus] = useUpdateStoreStatusMutation();

  const columns = [
    { field: 'name', headerName: 'اسم المتجر', flex: 1 },
    { field: 'totalPoints', headerName: 'إجمالي النقاط', width: 150 },
    { field: 'activeCustomers', headerName: 'العملاء النشطين', width: 150 },
    { field: 'lastActivity', headerName: 'آخر نشاط', width: 200 },
    {
      field: 'status',
      headerName: 'الحالة',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <FormControlLabel
          control={
            <Switch
              checked={params.value === 'active'}
              onChange={(e) => updateStatus({
                id: params.row.id,
                status: e.target.checked ? 'active' : 'inactive'
              })}
            />
          }
          label={params.value === 'active' ? 'نشط' : 'معطل'}
        />
      )
    }
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        مراقبة المتاجر
      </Typography>
      <DataGrid
        rows={stores}
        columns={columns}
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
              page: 0
            },
          },
        }}
        pageSizeOptions={[10]}
      />
    </Paper>
  );
}
