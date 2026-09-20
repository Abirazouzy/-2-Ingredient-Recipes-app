export type RecipeCategory = 'all' | 'sweet' | 'savory' | 'breakfast' | 'drink' | 'under5';

export type CookingMethod = 'Skillet' | 'Microwave' | 'Air Fryer' | 'Blender' | 'No-Cook' | 'Toaster';

export interface NutritionInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  highlight?: string;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  category: 'sweet' | 'savory' | 'breakfast' | 'drink';
  totalTimeMinutes: number; // strictly <= 10
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  method: CookingMethod;
  ingredient1: {
    name: string;
    amount: number;
    unit: string;
    notes?: string;
  };
  ingredient2: {
    name: string;
    amount: number;
    unit: string;
    notes?: string;
  };
  optionalPantryBonus?: string; // e.g. "Pinch of sea salt" or "Dash of cinnamon"
  servings: number;
  steps: string[];
  bunnyChefTip: string;
  tags: string[];
  nutrition: NutritionInfo;
  imageUrl?: string;
  isCustom?: boolean;
}

export interface PantryIngredient {
  id: string;
  name: string;
  icon: string;
  category: 'pantry' | 'fridge' | 'bakery' | 'fruit';
}
