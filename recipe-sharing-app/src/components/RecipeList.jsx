// src/components/RecipeList.jsx
import React from 'react';
import { useRecipeStore } from './recipeStore';
import RecipeDetails from './RecipeDetails';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

  return (
    <div>
      <h2>Recipe List</h2>
      {filteredRecipes.length === 0 && <p>No recipes found.</p>}
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeDetails recipeId={recipe.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
