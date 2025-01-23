import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export interface DataGridComponentProps {
  rows: any[];
  columns: GridColDef[];
}

export const DataGridComponent: React.FC<DataGridComponentProps> = React.memo(({ rows, columns }) => {
  return (
    <DataGrid
      rows={rows}
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
      autoHeight
    />
  );
});

DataGridComponent.displayName = 'DataGridComponent';
