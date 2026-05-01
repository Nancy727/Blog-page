import express from "express";
import {
  getBlogs,
  getBlog,
  createBlog,
  likeBlog,
  deleteBlog,
  downloadBlog,
} from "../controllers/blog.controller.js";

import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlog);
router.post("/", upload.single("file"), createBlog);
router.patch("/:id/like", likeBlog);
router.delete("/:id", deleteBlog);
router.get("/:id/download", downloadBlog);

export default router; // ✅ THIS LINE IS REQUIRED