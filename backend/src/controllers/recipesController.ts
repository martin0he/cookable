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
