// src/components/RecipeList.jsx
import React, { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const filterRecipes = useRecipeStore(state => state.filterRecipes);

  useEffect(() => {
    filterRecipes();
  }, [searchTerm, recipes]);

  const displayedRecipes = searchTerm ? filteredRecipes : recipes;

  return (
    <div>
      <h2>Recipes</h2>
      {displayedRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul>
          {displayedRecipes.map((recipe, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <Link to={`/recipes/${index}`}>
                <strong>{recipe.title}</strong>
              </Link>
              <p>{recipe.ingredients}</p>
              <p>{recipe.instructions}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
