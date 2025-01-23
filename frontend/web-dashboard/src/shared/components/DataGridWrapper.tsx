import React from 'react';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';

type DataGridWrapperProps = Omit<DataGridProps, 'pageSize'>;

export const DataGridWrapper: React.FC<DataGridWrapperProps> = (props) => {
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
};
