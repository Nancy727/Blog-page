import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

// profile
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

// blogs created by user
export const getUserBlogs = async (req, res) => {
  const blogs = await Blog.find({ author: req.user.id });
  res.json(blogs);
};

// blogs liked by user
export const getLikedBlogs = async (req, res) => {
  const blogs = await Blog.find({ likes: req.user.id });
  res.json(blogs);
};