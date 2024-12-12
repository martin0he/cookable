import { Request, Response } from "express";
import pool from "../db";

// Fetch all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM Users");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Fetch a specific user
export const getSpecificUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM Users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Create a new user
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, first_name, last_name, email } = req.body;

  if (!username || !first_name || !last_name || !email) {
    res.status(400).send("Missing required fields");
    return;
  }

  try {
    const result = await pool.query(
      "INSERT INTO Users (username, first_name, last_name, email) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, first_name, last_name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
};
