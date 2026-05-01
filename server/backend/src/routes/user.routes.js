import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  getProfile,
  getUserBlogs,
  getLikedBlogs,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", protect, getProfile);
router.get("/me/blogs", protect, getUserBlogs);
router.get("/me/liked", protect, getLikedBlogs);

export default router;