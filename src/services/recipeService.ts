import axios from 'axios';
import { Recipe } from '../types/recipe';

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const BASE_URL = process.env.REACT_APP_API_URL || 'https://api.spoonacular.com/recipes';
const IMAGE_BASE_URL = 'https://spoonacular.com/recipeImages/';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

const processRecipeImage = (recipe: any): Recipe => {
  // If the image URL doesn't start with http/https, prepend the Spoonacular base URL
  if (recipe.image && !recipe.image.startsWith('http')) {
    recipe.image = `${IMAGE_BASE_URL}${recipe.image}`;
  }
  
  // Process ingredient images
  if (recipe.extendedIngredients) {
    recipe.extendedIngredients = recipe.extendedIngredients.map((ingredient: any) => {
      if (ingredient.image && !ingredient.image.startsWith('http')) {
        ingredient.image = `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`;
      }
      return ingredient;
    });
  }

  return recipe as Recipe;
};

export const searchRecipes = async (
  ingredients: string[],
  dietary: string[],
  timeLimit: number,
  cuisine: string[],
  intolerances: string[],
  mealType: string
): Promise<Recipe[]> => {
  try {
    const params = {
      ingredients: ingredients.join(','),
      diet: dietary.join(','),
      maxReadyTime: timeLimit,
      cuisine: cuisine.join(','),
      intolerances: intolerances.join(','),
      type: mealType,
      number: 12,
      instructionsRequired: true,
      fillIngredients: true,
      addRecipeInformation: true,
    };

    const response = await api.get('/complexSearch', { params });
    return response.data.results.map(processRecipeImage);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch recipes');
    }
    throw error;
  }
};

export const getRecipeById = async (id: number): Promise<Recipe> => {
  try {
    const response = await api.get(`/${id}/information`, {
      params: {
        instructionsRequired: true,
      },
    });
    return processRecipeImage(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch recipe details');
    }
    throw error;
  }
};

export const getRandomRecipes = async (
  number: number = 6,
  tags: string[] = []
): Promise<Recipe[]> => {
  try {
    const response = await api.get('/random', {
      params: {
        number,
        tags: tags.join(','),
      },
    });
    return response.data.recipes.map(processRecipeImage);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch random recipes');
    }
    throw error;
  }
}; 