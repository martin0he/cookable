import { Router } from "express";
import bcrypt from "bcrypt";
import pool from "../db";
import { createUser, loginUser } from "../controllers/authController";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);

export default router;
