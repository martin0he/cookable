import { Router } from "express";
import {
  changePassword,
  deleteUser,
  friendUser,
  getCurrentUser,
  getFriends,
  getSpecificUser,
  getUsers,
  getUsersWhoFriendedMe,
  resetPassword,
  unfriendUser,
  updateUser,
} from "../controllers/usersController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getUsers);

router.get("/me", authenticateToken, getCurrentUser);
router.put("/update", authenticateToken, updateUser);
router.delete("/delete", authenticateToken, deleteUser);
router.post("/me/change-password", authenticateToken, changePassword);
router.get("/me/followers", authenticateToken, getUsersWhoFriendedMe);
router.get("/me/following", authenticateToken, getFriends);

router.post("/reset-password", resetPassword);

// Social features
router.post("/follow/:id", authenticateToken, friendUser);
router.delete("/unfollow/:id", authenticateToken, unfriendUser);

router.get("/:id", getSpecificUser);

export default router;
