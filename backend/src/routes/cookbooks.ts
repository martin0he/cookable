import { Router } from "express";
import {
  getCookbooks,
  getCookbooksFromSpecificAuthor,
  getFavoritedCookbooks,
  getSpecificCookbook,
} from "../controllers/cookbooksController";

const router = Router();

router.get("/", getCookbooks);
router.get("/:id", getSpecificCookbook);
router.get("/author/:authorId", getCookbooksFromSpecificAuthor);
router.get("/favorited", getFavoritedCookbooks);

export default router;
