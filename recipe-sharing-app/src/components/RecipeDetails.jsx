// src/components/RecipeDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore(state => state.recipes[parseInt(id)]);

  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetails;
