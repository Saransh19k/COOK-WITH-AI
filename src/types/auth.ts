export interface User {
  id: string;
  email: string | null;
  name: string | null;
  avatar?: string;
  favorites: number[];
  history: {
    recipeId: number;
    date: string;
    rating?: number;
  }[];
  preferences?: {
    dietary: string[];
    intolerances: string[];
    cuisines: string[];
  };
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
} 