import React, { useState } from 'react';
import {
  Container,
  Box,
  Alert,
  Snackbar,
  CircularProgress,
  Typography,
  Paper,
} from '@mui/material';
import RecipeForm from '../components/RecipeForm';
import RecipeResults from '../components/RecipeResults';
import { searchRecipes } from '../services/recipeService';
import { Recipe } from '../types/recipe';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handleSearch = async (
    ingredients: string[],
    dietary: string[],
    timeLimit: number,
    cuisine: string[],
    intolerances: string[],
    mealType: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const results = await searchRecipes(
        ingredients,
        dietary,
        timeLimit,
        cuisine,
        intolerances,
        mealType
      );
      setRecipes(results);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred while searching for recipes'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          What would you like to cook today?
        </Typography>
      </Paper>

      <RecipeForm
        onSearch={handleSearch}
        disabled={loading}
        defaultPreferences={user?.preferences}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <RecipeResults recipes={recipes} />
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard; 