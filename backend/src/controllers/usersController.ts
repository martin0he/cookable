import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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

  if (!id) {
    res.status(400).send("Invalid user ID");
    return;
  }

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

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.body.userId; // Set by authenticateToken middleware

    if (!userId) {
      res
        .status(401)
        .json({ error: "Unauthorized: No user ID found in request" });
      return;
    }

    const result = await pool.query("SELECT * FROM Users WHERE id = $1", [
      userId,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update the current user
export const updateUser = async (req: Request, res: Response) => {
  const userId = req.body.userId; // Trust only userId from the middleware
  const { username, firstName, lastName, profilePic, email, bio } = req.body;

  try {
    const result = await pool.query(
      "UPDATE Users SET username = $1, first_name = $2, last_name = $3, profile_picture_url = $4, email = $5, bio = $6 WHERE id = $7 RETURNING *",
      [username, firstName, lastName, profilePic, email, bio, userId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete the current user
export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    await pool.query("DELETE FROM Users WHERE id = $1", [userId]);
    res.send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const changePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, oldPassword, newPassword } = req.body;

  // Validate input
  if (!userId || !oldPassword || !newPassword) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    // Fetch user by ID
    const result = await pool.query(
      "SELECT password_hash FROM Users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const user = result.rows[0];

    // Compare old password with hashed password in the database
    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isMatch) {
      res.status(401).json({ error: "Incorrect password" });
      return;
    }

    // Hash the new password
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password
    await pool.query("UPDATE Users SET password_hash = $1 WHERE id = $2", [
      newPasswordHash,
      userId,
    ]);

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Reset a user's password
export const resetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // Fetch user by email
    const result = await pool.query("SELECT * FROM Users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const user = result.rows[0];

    // Generate a random password
    const newPassword = Math.random().toString(36).slice(-8);

    // Hash the new password
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password
    await pool.query("UPDATE Users SET password_hash = $1 WHERE id = $2", [
      newPasswordHash,
      user.id,
    ]);

    // Send the new password to the user
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add a friend
export const friendUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const { id } = req.params;

  try {
    await pool.query(
      "INSERT INTO Friends (user_id, friend_id) VALUES ($1, $2)",
      [userId, id]
    );
    res.status(200).json({ message: "Friend added successfully" });
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Remove a friend
export const unfriendUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const { id } = req.params;

  try {
    await pool.query(
      "DELETE FROM Friends WHERE user_id = $1 AND friend_id = $2",
      [userId, id]
    );
    res.status(200).json({ message: "Friend removed successfully" });
  } catch (error) {
    console.error("Error removing friend:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch a user's friends
export const getFriends = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM Users WHERE id IN (SELECT friend_id FROM Friends WHERE user_id = $1)",
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch users who friended me
export const getUsersWhoFriendedMe = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM Users WHERE id IN (SELECT user_id FROM Friends WHERE friend_id = $1)",
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users who friended me:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
