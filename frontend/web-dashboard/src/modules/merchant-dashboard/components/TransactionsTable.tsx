import { DataGrid } from '@mui/x-data-grid';
import { Paper, Typography } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'رقم العملية', width: 130 },
  { field: 'customerName', headerName: 'اسم العميل', width: 200 },
  { field: 'points', headerName: 'النقاط', width: 130 },
  { field: 'amount', headerName: 'المبلغ', width: 130 },
  { field: 'date', headerName: 'التاريخ', width: 180 },
  { field: 'status', headerName: 'الحالة', width: 130 }
];

export const TransactionsTable = () => {
  return (
    <Paper sx={{ p: 2, height: 400 }}>
      <Typography variant="h6" mb={2}>سجل المعاملات</Typography>
      <DataGrid
        rows={[]} // سيتم ملؤها من API
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Paper>
  );
};
