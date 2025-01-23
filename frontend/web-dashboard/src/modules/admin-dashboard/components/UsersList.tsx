import React from 'react';
import { Paper } from '@mui/material';
import { DataGridWrapper } from '@shared/components/tables/DataGridWrapper';
import { useGetUsersQuery } from '../services/api';

export default function UsersList() {
  const { data: users = [], isLoading } = useGetUsersQuery({});

  const columns = [
    { field: 'name', headerName: 'الاسم', flex: 1 },
    { field: 'email', headerName: 'البريد الإلكتروني', flex: 1 },
    { field: 'phone', headerName: 'رقم الجوال', flex: 1 }
  ];

  return (
    <Paper sx={{ p: 2, height: 400 }}>
      <DataGridWrapper
        rows={users}
        columns={columns}
        loading={isLoading}
        disableRowSelectionOnClick
      />
    </Paper>
  );
}
