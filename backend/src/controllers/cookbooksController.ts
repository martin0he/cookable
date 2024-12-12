import { Request, Response } from "express";
import pool from "../db";

// Fetch all cookbooks
export const getCookbooks = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM Cookbooks");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching cookbooks:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Fetch a specific cookbook
export const getSpecificCookbook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM Cookbooks WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      res.status(404).send("Cookbook not found");
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching cookbook:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Fetch all cookbooks written by a specific author
export const getCookbooksFromSpecificAuthor = async (
  req: Request,
  res: Response
) => {
  const { authorId } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM Cookbooks WHERE author_id = $1",
      [authorId]
    );
    if (result.rows.length === 0) {
      res.status(404).send("No Cookbooks by this author");
      return;
    }
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching cookbooks:", error);
    res.status(500).send("Internal Server Error");
  }
};

// DO AUTH FIRST
// Fetch all cookbooks favorited by this user
export const getFavoritedCookbooks = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM Cookbooks");
    if (result.rows.length === 0) {
      res.status(404).send("No Cookbooks by this author");
      return;
    }
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching cookbooks:", error);
    res.status(500).send("Internal Server Error");
  }
};
