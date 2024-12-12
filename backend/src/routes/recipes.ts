import { Router } from "express";
import {
  getRecipes,
  getSpecificRecipe,
} from "../controllers/recipesController";

const router = Router();

router.get("/", getRecipes);
router.get("/:id", getSpecificRecipe);

export default router;
