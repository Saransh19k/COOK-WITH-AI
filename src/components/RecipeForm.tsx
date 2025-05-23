import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Chip,
  Typography,
  Slider,
  Autocomplete,
  Grid,
} from '@mui/material';
import { User } from '../types/auth';

interface RecipeFormProps {
  onSearch: (
    ingredients: string[],
    dietary: string[],
    timeLimit: number,
    cuisine: string[],
    intolerances: string[],
    mealType: string
  ) => void;
  disabled: boolean;
  defaultPreferences?: User['preferences'];
}

const cuisineOptions = [
  'African',
  'American',
  'British',
  'Cajun',
  'Caribbean',
  'Chinese',
  'Eastern European',
  'European',
  'French',
  'German',
  'Greek',
  'Indian',
  'Irish',
  'Italian',
  'Japanese',
  'Jewish',
  'Korean',
  'Latin American',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Nordic',
  'Southern',
  'Spanish',
  'Thai',
  'Vietnamese',
];

const dietaryOptions = [
  'Gluten Free',
  'Ketogenic',
  'Vegetarian',
  'Lacto-Vegetarian',
  'Ovo-Vegetarian',
  'Vegan',
  'Pescetarian',
  'Paleo',
  'Primal',
  'Low FODMAP',
  'Whole30',
];

const intoleranceOptions = [
  'Dairy',
  'Egg',
  'Gluten',
  'Grain',
  'Peanut',
  'Seafood',
  'Sesame',
  'Shellfish',
  'Soy',
  'Sulfite',
  'Tree Nut',
  'Wheat',
];

const mealTypeOptions = [
  'main course',
  'side dish',
  'dessert',
  'appetizer',
  'salad',
  'bread',
  'breakfast',
  'soup',
  'beverage',
  'sauce',
  'marinade',
  'fingerfood',
  'snack',
  'drink',
];

const RecipeForm: React.FC<RecipeFormProps> = ({
  onSearch,
  disabled,
  defaultPreferences,
}) => {
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [dietary, setDietary] = useState<string[]>(defaultPreferences?.dietary || []);
  const [timeLimit, setTimeLimit] = useState<number>(30);
  const [cuisine, setCuisine] = useState<string[]>(defaultPreferences?.cuisines || []);
  const [intolerances, setIntolerances] = useState<string[]>(
    defaultPreferences?.intolerances || []
  );
  const [mealType, setMealType] = useState<string>('main course');

  const handleAddIngredient = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && ingredient.trim()) {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient('');
    }
  };

  const handleDeleteIngredient = (ingredientToDelete: string) => {
    setIngredients(ingredients.filter((ing) => ing !== ingredientToDelete));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(ingredients, dietary, timeLimit, cuisine, intolerances, mealType);
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Ingredients Section */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Ingredients
          </Typography>
          <TextField
            fullWidth
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            onKeyPress={handleAddIngredient}
            placeholder="Type an ingredient and press Enter"
            disabled={disabled}
          />
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {ingredients.map((ing) => (
              <Chip
                key={ing}
                label={ing}
                onDelete={() => handleDeleteIngredient(ing)}
                disabled={disabled}
              />
            ))}
          </Box>
        </Grid>

        {/* Cuisine Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Cuisine Types
          </Typography>
          <Autocomplete
            multiple
            options={cuisineOptions}
            value={cuisine}
            onChange={(_, newValue) => setCuisine(newValue)}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select cuisines" />
            )}
            disabled={disabled}
          />
        </Grid>

        {/* Dietary Restrictions Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Dietary Restrictions
          </Typography>
          <Autocomplete
            multiple
            options={dietaryOptions}
            value={dietary}
            onChange={(_, newValue) => setDietary(newValue)}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select dietary restrictions" />
            )}
            disabled={disabled}
          />
        </Grid>

        {/* Intolerances Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Intolerances
          </Typography>
          <Autocomplete
            multiple
            options={intoleranceOptions}
            value={intolerances}
            onChange={(_, newValue) => setIntolerances(newValue)}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select intolerances" />
            )}
            disabled={disabled}
          />
        </Grid>

        {/* Meal Type Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Meal Type
          </Typography>
          <Autocomplete
            options={mealTypeOptions}
            value={mealType}
            onChange={(_, newValue) => setMealType(newValue || 'main course')}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select meal type" />
            )}
            disabled={disabled}
          />
        </Grid>

        {/* Time Limit Section */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Maximum Cooking Time (minutes)
          </Typography>
          <Slider
            value={timeLimit}
            onChange={(_, newValue) => setTimeLimit(newValue as number)}
            min={15}
            max={120}
            step={15}
            marks
            valueLabelDisplay="auto"
            disabled={disabled}
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={disabled || ingredients.length === 0}
          >
            {disabled ? 'Searching...' : 'Find Recipes'}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RecipeForm; 