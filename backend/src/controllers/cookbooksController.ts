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
  const { userId } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM SavedCookbooks WHERE author_id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      res.status(404).send("No Cookbooks saved");
      return;
    }
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching cookbooks:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Create a cookbook
export const createCookbook = async (req: Request, res: Response) => {
  const { title, authorId, description, isPrivate, coverImageUrl } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO Cookbooks (title, author_id, description, is_private, cover_image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, authorId, description, isPrivate, coverImageUrl]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating cookbook:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Favorite a cookbook
export const addCookbookToFavorites = async (req: Request, res: Response) => {
  const { cookbookId } = req.params;
  const { userId } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO SavedCookbooks (cookbook_id, author_id) VALUES ($1, $2) RETURNING *",
      [cookbookId, userId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error favoriting cookbook:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update a cookbook
export const updateCookbook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, isPrivate, coverImage, viewsCount } = req.body;

  try {
    const result = await pool.query(
      "UPDATE Cookbooks SET title = $1, description = $2, is_private = $3, cover_image_url = $4, views_count = $5 WHERE id = $6 RETURNING *",
      [title, description, isPrivate, coverImage, viewsCount, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating cookbook:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete a cookbook
export const deleteCookbook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM Cookbooks WHERE id = $1", [id]);
    res.send("Cookbook deleted successfully");
  } catch (error) {
    console.error("Error deleting cookbook:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Remove a cookbook from favorites
export const removeCookbookFromFavorites = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    await pool.query(
      "DELETE FROM SavedCookbooks WHERE cookbook_id = $1 AND author_id = $2",
      [id, userId]
    );
    res.send("Cookbook removed from favorites successfully");
  } catch (error) {
    console.error("Error removing cookbook from favorites:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const file = req.file as Express.Multer.File;

    res.status(200).json({
      success: true,
      url: file.path,
    });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};
