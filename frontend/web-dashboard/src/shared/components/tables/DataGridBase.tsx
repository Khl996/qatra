import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';
import { Paper } from '@mui/material';

interface DataGridBaseProps extends Omit<DataGridProps, 'rows' | 'columns'> {
  rows: any[];
  columns: GridColDef[];
  loading?: boolean;
  height?: number | string;
}

export function DataGridBase({ 
  rows, 
  columns, 
  loading, 
  height = 400,
  ...props 
}: DataGridBaseProps) {
  return (
    <Paper sx={{ height, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        {...props}
      />
    </Paper>
  );
}
