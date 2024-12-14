import { Router } from "express";
import {
  createRecipe,
  deleteRecipe,
  favoriteRecipe,
  getRecipes,
  getRecipesByCookbook,
  getSpecificRecipe,
  unfavoriteRecipe,
  updateRecipe,
} from "../controllers/recipesController";

const router = Router();

// GET routes
router.get("/", getRecipes);
router.get("/:id", getSpecificRecipe);
router.get("/cookbook/:cookbookId", getRecipesByCookbook);

// POST routes
router.post("/", createRecipe);
router.post("/favorites/:id", favoriteRecipe);

// PUT routes
router.put("/:id", updateRecipe);

// DELETE routes
router.delete("/:id", deleteRecipe);
router.delete("/favorites/:id", unfavoriteRecipe);

export default router;
