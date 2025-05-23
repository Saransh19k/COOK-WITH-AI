import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Welcome: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" gutterBottom>
              Cook With AI
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Your personal AI-powered cooking assistant. Discover recipes, plan meals, and cook with confidence.
            </Typography>
            {!user && (
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/signup"
                  sx={{ mr: 2 }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/login"
                >
                  Sign In
                </Button>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
              }}
            >
              <Typography variant="h4" gutterBottom>
                Features
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">🔍 Smart Recipe Search</Typography>
                  <Typography>
                    Find recipes based on ingredients you have.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">🥗 Dietary Preferences</Typography>
                  <Typography>
                    Filter recipes by dietary restrictions and preferences.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">⏰ Time-based Suggestions</Typography>
                  <Typography>
                    Get recipe suggestions based on your available time.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">📱 Personal Profile</Typography>
                  <Typography>
                    Save favorites and track your cooking history.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Welcome; 