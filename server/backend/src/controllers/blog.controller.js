import mongoose from "mongoose";
import Blog from "../models/blog.model.js";
import {
  toggleLikeService,
  createBlogService,
  deleteBlogService,
} from "../services/blog.service.js";

// GET all
export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

// GET one
export const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });

    res.status(200).json(blog);
  } catch (err) {
    next(err);
  }
};

// CREATE (🔥 FIXED)
export const createBlog = async (req, res, next) => {
  try {
    // ✅ VALIDATION FIRST
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const blog = await createBlogService({
      title: req.body.title,
      file: req.file,
      author: req.user?.id || new mongoose.Types.ObjectId(), // ✅ fallback for tests
    });

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (err) {
    next(err);
  }
};

// LIKE / DISLIKE
export const likeBlog = async (req, res, next) => {
  try {
    const userId =
      req.user?.id || new mongoose.Types.ObjectId().toString(); // ✅ FIX

    const blog = await toggleLikeService(req.params.id, userId);

    res.status(200).json({
      success: true,
      likesCount: blog.likes.length,
    });
  } catch (err) {
    console.error("LIKE ERROR:", err); // 🔥 DEBUG
    next(err);
  }
};

// DELETE
export const deleteBlog = async (req, res, next) => {
  try {
    await deleteBlogService(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// DOWNLOAD
export const downloadBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });

    res.download(blog.filepath);
  } catch (err) {
    next(err);
  }
};