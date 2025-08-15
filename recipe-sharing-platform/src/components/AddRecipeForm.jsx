import React, { useState } from "react";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});


  const validate = () => {
    const errs = {};

    if (!title.trim()) {
      errs.title = "Recipe title is required.";
    }

    if (!ingredients.trim()) {
      errs.ingredients = "Ingredients are required.";
    } else {
      const items = ingredients
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (items.length < 2) {
        errs.ingredients =
          "Please include at least two ingredients (comma separated).";
      }
    }

    if (!steps.trim()) {
      errs.steps = "Preparation steps are required.";
    }

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }

    // Simulate submit
    console.log({
      title,
      ingredients,
      steps,
    });

    // Reset
    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Add a New Recipe</h2>


      {Object.keys(errors).length > 0 && (
        <div className="mb-4 text-red-600 text-sm">
          Please fix the errors below.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Recipe Title
          </label>
          <input
            id="title"
            type="text"
            className={`w-full border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p id="title-error" className="mt-1 text-sm text-red-600">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="ingredients"
          >
            Ingredients <span className="text-gray-500">(comma separated)</span>
          </label>
          <textarea
            id="ingredients"
            rows="3"
            className={`w-full border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300 ${
              errors.ingredients ? "border-red-500" : "border-gray-300"
            }`}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            aria-invalid={Boolean(errors.ingredients)}
            aria-describedby={errors.ingredients ? "ingredients-error" : undefined}
          />
          {errors.ingredients && (
            <p id="ingredients-error" className="mt-1 text-sm text-red-600">
              {errors.ingredients}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="steps">
            Preparation Steps
          </label>
          <textarea
            id="steps"
            rows="4"
            className={`w-full border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300 ${
              errors.steps ? "border-red-500" : "border-gray-300"
            }`}
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            aria-invalid={Boolean(errors.steps)}
            aria-describedby={errors.steps ? "steps-error" : undefined}
          />
          {errors.steps && (
            <p id="steps-error" className="mt-1 text-sm text-red-600">
              {errors.steps}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
