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
  uploadImage,
} from "../controllers/cookbooksController";
import upload from "../upload";

const router = Router();

// GET routes
router.get("/", getCookbooks);
router.get("/:id", getSpecificCookbook);
router.get("/author/:authorId", getCookbooksFromSpecificAuthor);
router.get("/favorited", getFavoritedCookbooks);

// POST routes
router.post("/", createCookbook);
router.post("/uploadImage", upload.single("image"), uploadImage);
router.post("/favorites/:id", addCookbookToFavorites);

// PUT routes
router.put("/:id", updateCookbook);

// DELETE routes
router.delete("/:id", deleteCookbook);
router.delete("/favorites/:id", removeCookbookFromFavorites);

export default router;
