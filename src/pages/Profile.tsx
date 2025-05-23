import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          <Typography variant="body1">
            Email: {user?.email}
          </Typography>
          {/* Add more profile information here */}
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile; 