# Cook With AI - Your Personal Recipe Assistant

A modern, AI-powered cooking assistant web application that helps you discover recipes based on your ingredients, preferences, and time constraints. Built with React, TypeScript, and Material-UI.

## Features

### Recipe Search & Discovery
- Smart recipe search based on available ingredients
- Advanced filtering options:
  - Dietary preferences and restrictions
  - Cuisine types (30+ international cuisines)
  - Cooking time constraints
  - Meal types (breakfast, lunch, dinner, snacks, etc.)
  - Food intolerances and allergies
- Time-based recipe suggestions
- Random recipe recommendations

### User Management
- Secure authentication system:
  - Email/Password registration and login
  - Google Sign-in integration
  - Password reset functionality
- Personalized user profiles
- Customizable dietary preferences
- Cooking history tracking
- Favorite recipes collection
- Protected routes for authenticated users

### Recipe Details
- Comprehensive recipe information:
  - Detailed ingredients list with measurements
  - Step-by-step cooking instructions
  - Cooking time and servings
  - Nutritional information
  - Cuisine type and dietary categories
- High-quality recipe images
- Original recipe source links
- Video tutorials integration

### User Interface
- Modern, responsive Material-UI design
- Intuitive navigation with header menu
- User-friendly recipe search form
- Interactive recipe cards
- Detailed recipe modal views
- Mobile-first approach for all screen sizes
- Loading states and error handling
- Favorite recipe functionality with one-click saving

## Tech Stack

- React 18
- TypeScript
- Material-UI (MUI)
- React Router v6
- Firebase Authentication
- Spoonacular API
- Context API for state management

## Prerequisites

- Node.js 16+ and npm
- Firebase account and project
- Spoonacular API key ([Get one here](https://spoonacular.com/food-api))

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cook-with-ai.git
cd cook-with-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your API keys:
```env
# Spoonacular API Key
REACT_APP_SPOONACULAR_API_KEY=your_spoonacular_api_key

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm start
```

The app will be available at `http://localhost:3000`

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  │   ├── Header.tsx
  │   ├── RecipeForm.tsx
  │   └── RecipeResults.tsx
  ├── contexts/      # React contexts
  │   └── AuthContext.tsx
  ├── pages/         # Page components
  │   ├── Dashboard.tsx
  │   ├── Login.tsx
  │   ├── Profile.tsx
  │   ├── Signup.tsx
  │   └── Welcome.tsx
  ├── services/      # API and other services
  │   └── recipeService.ts
  ├── types/         # TypeScript type definitions
  │   ├── auth.ts
  │   └── recipe.ts
  ├── config/        # Configuration files
  │   ├── firebase.ts
  │   └── theme.ts
  └── App.tsx        # Main app component
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and set up sign-in methods:
   - Email/Password
   - Google Sign-in
3. Copy your Firebase configuration to the `.env` file

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Spoonacular API](https://spoonacular.com/food-api) for recipe data
- [Material-UI](https://mui.com/) for the UI components
- [Firebase](https://firebase.google.com/) for authentication
- [React Router](https://reactrouter.com/) for routing 