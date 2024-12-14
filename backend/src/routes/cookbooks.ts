import { Router } from "express";
import {
  addCookbookToFavorites,
  createCookbook,
  deleteCookbook,
  getCookbooks,
  getCookbooksFromSpecificAuthor,
  getFavoritedCookbooks,
  getSpecificCookbook,
  removeCookbookFromFavorites,
  updateCookbook,
} from "../controllers/cookbooksController";

const router = Router();

// GET routes
router.get("/", getCookbooks);
router.get("/:id", getSpecificCookbook);
router.get("/author/:authorId", getCookbooksFromSpecificAuthor);
router.get("/favorited", getFavoritedCookbooks);

// POST routes
router.post("/", createCookbook);
router.post("/favorites/:id", addCookbookToFavorites);

// PUT routes
router.put("/:id", updateCookbook);

// DELETE routes
router.delete("/:id", deleteCookbook);
router.delete("/favorites/:id", removeCookbookFromFavorites);

export default router;
