import { DataGrid } from '@mui/x-data-grid';
import { Paper } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'الرقم', width: 90 },
  { field: 'name', headerName: 'اسم العميل', flex: 1 },
  { field: 'phone', headerName: 'رقم الجوال', width: 150 },
  { field: 'points', headerName: 'النقاط', width: 120 },
  { field: 'lastVisit', headerName: 'آخر زيارة', width: 180 },
  { field: 'status', headerName: 'الحالة', width: 120 }
];

interface CustomersTableProps {
  data: any[];
  loading?: boolean;
  onRowClick?: (params: any) => void;
}

export function CustomersTable({ data, loading, onRowClick }: CustomersTableProps) {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        loading={loading}
        onRowClick={onRowClick}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        pageSizeOptions={[10]}
      />
    </Paper>
  );
}
