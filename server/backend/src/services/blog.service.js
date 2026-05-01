import mongoose from "mongoose";
import Blog from "../models/blog.model.js";


export const toggleLikeService = async (blogId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    throw new Error("Invalid blog ID");
  }

  if (!userId) {
    throw new Error("User ID required");
  }

  const blog = await Blog.findById(blogId);
  if (!blog) throw new Error("Blog not found");

  // ✅ normalize userId
  const userIdStr = userId.toString();

  const alreadyLiked = blog.likes.some(
    (id) => id.toString() === userIdStr
  );

  if (alreadyLiked) {
    await Blog.findByIdAndUpdate(blogId, {
      $pull: { likes: userId },
    });
  } else {
    await Blog.findByIdAndUpdate(blogId, {
      $addToSet: { likes: userId },
    });
  }

  return await Blog.findById(blogId);
};

export const createBlogService = async ({ title, file, author }) => {
  if (!title || title.trim() === "") {
    throw new Error("Title is required");
  }

  if (!file) {
    throw new Error("File is required");
  }

  if (!author) {
    throw new Error("Author is required");
  }

  return await Blog.create({
    title: title.trim(),
    author,
    filename: file.filename,
    filepath: file.path,
    mimetype: file.mimetype,
    size: file.size,
  });
};

export const deleteBlogService = async (id) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new Error("Blog not found");

  // optional: delete file from disk here

  await blog.deleteOne();
};