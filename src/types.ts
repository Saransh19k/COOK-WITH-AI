export interface Recipe {
  id: number;
  title: string;
  image: string;
  ingredients: string[];
  cookingTime: number;
  instructions: string;
  dietary: string[];
  servings: number;
  videoUrl?: string;
  sourceUrl: string;
  steps: RecipeStep[];
  nutrition: NutritionInfo;
}

export interface RecipeStep {
  number: number;
  step: string;
  ingredients?: string[];
  equipment?: Equipment[];
}

export interface Equipment {
  id: number;
  name: string;
  image: string;
}

export interface NutritionInfo {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

export interface RecipeFormData {
  ingredients: string[];
  dietary: string[];
  timeLimit: number;
  cuisine?: string[];
  intolerances?: string[];
  mealType?: string;
} 