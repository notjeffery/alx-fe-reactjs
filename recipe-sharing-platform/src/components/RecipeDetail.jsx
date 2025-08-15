import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => {
        const foundRecipe = data.find((item) => item.id.toString() === id);
        setRecipe(foundRecipe);
      });
  }, [id]);

  if (!recipe) {
    return <p className="text-lg font-semibold">Loading...</p>;
  }

  return (
    <div className="shadow p-6 bg-white rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-64 object-cover rounded-md mb-6"
      />

      <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc pl-5 mb-4">
        {recipe.ingredients &&
          recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-lg">
              {ingredient}
            </li>
          ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
      <p className="text-base">{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetail;
