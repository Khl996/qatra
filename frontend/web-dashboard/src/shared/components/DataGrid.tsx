import React from 'react';
import { DataGrid as MuiDataGrid, DataGridProps } from '@mui/x-data-grid';

export const DataGrid: React.FC<Omit<DataGridProps, 'pageSize'>> = (props) => {
  return (
    <MuiDataGrid
      {...props}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 5, page: 0 },
        },
      }}
      pageSizeOptions={[5, 10, 25]}
    />
  );
};
