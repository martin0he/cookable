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

const router = Router();

router.get("/", getUsers);
router.get("/:id", getSpecificUser);

// User management
router.get("/me", getCurrentUser);
router.put("/me", updateUser);
router.delete("/me", deleteUser);

// Password management
router.post("/me/change-password", changePassword);
router.post("/reset-password", resetPassword);

// Social features
router.post("/follow/:id", friendUser);
router.delete("/unfollow/:id", unfriendUser);
router.get("/me/followers", getUsersWhoFriendedMe);
router.get("/me/following", getFriends);

export default router;
