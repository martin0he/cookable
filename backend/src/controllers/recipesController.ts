import { Request, Response } from "express";
import pool from "../db";

// Fetch all recipes
export const getRecipes = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM Recipes");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Fetch a specific recipe
export const getSpecificRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM Recipes WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      res.status(404).send("Recipe not found");
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Fetch recipes by cookbook
export const getRecipesByCookbook = async (req: Request, res: Response) => {
  const { cookbookId } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM Recipes WHERE cookbook_id = $1",
      [cookbookId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching recipes by cookbook:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Create a recipe
export const createRecipe = async (req: Request, res: Response) => {
  const {
    authorId,
    cookbookId,
    title,
    description,
    instructions,
    tags,
    expectedDuration,
    ingredients,
    imageUrl,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO Recipes 
      (author_id, cookbook_id, title, description, instructions, tags, expected_duration, ingredients, image_url) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING *`,
      [
        authorId,
        cookbookId,
        title,
        description || null,
        JSON.stringify(instructions) || null,
        JSON.stringify(tags) || "[]",
        expectedDuration || null,
        JSON.stringify(ingredients) || "[]",
        imageUrl || null,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Favorite a recipe
export const favoriteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { author_id } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO FavoritedRecipes (recipe_id, author_id) VALUES ($1, $2) RETURNING *",
      [id, author_id]
    );
    if (result.rows.length === 0) {
      res.status(404).send("Recipe not found");
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error favoriting recipe:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update a recipe
export const updateRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    title,
    description,
    instructions,
    tags,
    expectedDuration,
    ingredients,
  } = req.body;

  try {
    const result = await pool.query(
      "UPDATE Recipes SET title = $1, description = $2, instructions = $3, tags = $4, expected_duration = $5, ingredients = $6 WHERE id = $7 RETURNING *",
      [
        title,
        description,
        JSON.stringify(instructions),
        JSON.stringify(tags),
        expectedDuration,
        JSON.stringify(ingredients),
        id,
      ]
    );
    if (result.rows.length === 0) {
      res.status(404).send("Recipe not found");
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete a recipe
export const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM Recipes WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      res.status(404).send("Recipe not found");
      return;
    }
    res.send("Recipe deleted");
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Unfavorite a recipe
export const unfavoriteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { author_id } = req.body;

  try {
    const result = await pool.query(
      "DELETE FROM FavoritedRecipes WHERE recipe_id = $1 AND author_id = $2",
      [id, author_id]
    );
    if (result.rowCount === 0) {
      res.status(404).send("Recipe not found");
      return;
    }
    res.send("Recipe unfavorited");
  } catch (error) {
    console.error("Error unfavoriting recipe:", error);
    res.status(500).send("Internal Server Error");
  }
};
