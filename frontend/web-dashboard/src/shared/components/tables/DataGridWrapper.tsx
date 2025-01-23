import React from 'react';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';

export function DataGridWrapper(props: Omit<DataGridProps, 'pageSize'>) {
  return (
    <DataGrid
      {...props}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 5, page: 0 },
        },
      }}
      pageSizeOptions={[5, 10, 25]}
    />
  );
}
