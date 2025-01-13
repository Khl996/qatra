import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://172.20.10.4:4000/api/admin/users');
      setUsers(response.data.users);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://l172.20.10.4:4000/api/admin/users/${userId}`);
      alert('User deleted successfully!');
      fetchUsers();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  const handleEditUser = (userId: string) => {
    // توجيه المستخدم إلى صفحة تعديل المستخدم
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        إدارة المستخدمين
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={user.name} secondary={user.email} />
            <IconButton edge="end" aria-label="edit" onClick={() => handleEditUser(user.id)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteUser(user.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UserManagement;
