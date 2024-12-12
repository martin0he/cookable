import { Router } from "express";
import {
  createUser,
  getSpecificUser,
  getUsers,
} from "../controllers/usersController";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getSpecificUser);

router.post("/", createUser);

export default router;
