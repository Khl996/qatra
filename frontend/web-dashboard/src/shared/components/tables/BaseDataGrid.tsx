import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface BaseDataGridProps {
  rows: any[];
  columns: GridColDef[];
  loading?: boolean;
}

export function BaseDataGrid({ rows, columns, loading }: BaseDataGridProps) {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 }
          }
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
