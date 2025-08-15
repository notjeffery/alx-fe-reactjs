import React from "react";
import { useParams } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Recipe Detail - {id}</h1>
      <p className="text-gray-700">
        This is where the recipe details will go. You can add ingredients,
        steps, and more here.
      </p>
    </div>
  );
}
