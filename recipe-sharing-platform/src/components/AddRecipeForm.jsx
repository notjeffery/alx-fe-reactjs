import React, { useState } from "react";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorMessages = "";

    if (!title.trim() || !ingredients.trim() || !steps.trim()) {
      errorMessages = "Please fill in all fields.";
    } else if (ingredients.split(",").length < 2) {
      errorMessages = "Please include at least two ingredients (comma separated).";
    }

    if (errorMessages) {
      setErrors(errorMessages);
      return;
    }

    // For now, we can just log it to console or simulate sending
    console.log({
      title,
      ingredients,
      steps
    });

    // Reset form
    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors("");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Add a New Recipe</h2>
      {errors && <p className="text-red-500 mb-4">{errors}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Recipe Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ingredients (comma separated)</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
            rows="3"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Preparation Steps</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
            rows="4"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
