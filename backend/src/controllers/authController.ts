import bcrypt from "bcrypt";
import { Request, Response } from "express";
import pool from "../db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, firstName, lastName, email, password } = req.body;

  // validate input
  if (!username || !firstName || !lastName || !email || !password) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    // hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // insert user into the database
    const result = await pool.query(
      `
      INSERT INTO Users (username, first_name, last_name, email, password_hash) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING id
      `,
      [username, firstName, lastName, email, passwordHash]
    );

    // respond with the new user's ID
    res.status(201).json({ userId: result.rows[0].id });
  } catch (error: any) {
    console.error("Error registering user:", error);

    // handle specific database errors
    if (error.code === "23505") {
      // unique constraint violation (e.g., email or username already exists)
      res.status(409).json({ error: "Email or username already exists" });
    } else {
      // generic error handling
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  try {
    // Fetch user with all necessary fields
    const userQuery = await pool.query(
      `SELECT id, username, first_name, last_name, profile_picture_url, email, bio, password_hash 
       FROM Users WHERE email = $1`,
      [email]
    );

    if (userQuery.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const user = userQuery.rows[0];

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username }, // Include essential data only
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || "6h" }
    );

    // Respond with the token and user info
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
