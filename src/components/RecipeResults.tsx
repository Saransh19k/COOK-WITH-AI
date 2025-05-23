import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Link,
} from '@mui/material';
import {
  Timer as TimerIcon,
  Restaurant as RestaurantIcon,
  LocalDining as LocalDiningIcon,
  Favorite as FavoriteIcon,
  Close as CloseIcon,
  PlayArrow as PlayArrowIcon,
} from '@mui/icons-material';
import { Recipe } from '../types/recipe';
import { useAuth } from '../contexts/AuthContext';

interface RecipeResultsProps {
  recipes: Recipe[];
}

const RecipeResults: React.FC<RecipeResultsProps> = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const { user, updateProfile } = useAuth();

  const handleOpenRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null);
  };

  const handleFavorite = async (recipe: Recipe) => {
    if (!user) return;

    try {
      const isFavorited = user.favorites.includes(recipe.id);
      const updatedFavorites = isFavorited
        ? user.favorites.filter((id) => id !== recipe.id)
        : [...user.favorites, recipe.id];

      await updateProfile({
        ...user,
        favorites: updatedFavorites,
      });
    } catch (error) {
      console.error('Failed to update favorites:', error);
    }
  };

  if (recipes.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="text.secondary">
          No recipes found. Try adjusting your search criteria.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid item key={recipe.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={recipe.image}
                alt={recipe.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {recipe.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Chip
                    icon={<TimerIcon />}
                    label={`${recipe.readyInMinutes} mins`}
                    size="small"
                  />
                  <Chip
                    icon={<RestaurantIcon />}
                    label={`${recipe.servings} servings`}
                    size="small"
                  />
                </Box>
                {recipe.diets.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {recipe.diets.map((diet) => (
                      <Chip
                        key={diet}
                        label={diet}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                )}
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleOpenRecipe(recipe)}>
                  View Recipe
                </Button>
                {user && (
                  <IconButton
                    onClick={() => handleFavorite(recipe)}
                    color={
                      user.favorites.includes(recipe.id) ? 'primary' : 'default'
                    }
                  >
                    <FavoriteIcon />
                  </IconButton>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={!!selectedRecipe}
        onClose={handleCloseRecipe}
        maxWidth="md"
        fullWidth
      >
        {selectedRecipe && (
          <>
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{selectedRecipe.title}</Typography>
                <IconButton onClick={handleCloseRecipe}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.title}
                    style={{ width: '100%', borderRadius: 8 }}
                  />
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Ready in: {selectedRecipe.readyInMinutes} minutes
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Servings: {selectedRecipe.servings}
                        </Typography>
                      </Grid>
                      {selectedRecipe.cuisines.length > 0 && (
                        <Grid item xs={12}>
                          <Typography variant="body2" color="text.secondary">
                            Cuisine: {selectedRecipe.cuisines.join(', ')}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Ingredients
                  </Typography>
                  <List dense>
                    {selectedRecipe.extendedIngredients.map((ingredient) => (
                      <ListItem key={ingredient.id}>
                        <ListItemIcon>
                          <LocalDiningIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={ingredient.originalString}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Instructions
                  </Typography>
                  {selectedRecipe.analyzedInstructions.map((instruction, index) => (
                    <Box key={index}>
                      {instruction.name && (
                        <Typography variant="subtitle1" gutterBottom>
                          {instruction.name}
                        </Typography>
                      )}
                      <List>
                        {instruction.steps.map((step) => (
                          <ListItem key={step.number}>
                            <ListItemText
                              primary={
                                <Typography variant="body1">
                                  Step {step.number}
                                </Typography>
                              }
                              secondary={step.step}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              {selectedRecipe.sourceUrl && (
                <Button
                  startIcon={<PlayArrowIcon />}
                  component={Link}
                  href={selectedRecipe.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Original Recipe
                </Button>
              )}
              <Button onClick={handleCloseRecipe}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default RecipeResults; 