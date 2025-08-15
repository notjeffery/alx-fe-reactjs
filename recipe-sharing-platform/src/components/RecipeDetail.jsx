import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const foundRecipe = data.find((item) => item.id.toString() === id);
        setRecipe(foundRecipe);
      })
      .catch((err) => console.error("Error fetching recipe data:", err));
  }, [id]);

  if (!recipe) {
    return <p className="text-center mt-10">Loading recipe...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-96 object-cover rounded mb-6"
      />
      <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
      <p className="text-gray-700 leading-relaxed">{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetail;
