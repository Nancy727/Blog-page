import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import Blog from "../src/models/blog.model.js";

beforeAll(async () => {
  // Use a separate test DB
  const uri = "mongodb://127.0.0.1:27017/blog_test";
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Blog.deleteMany();
});

describe("Blog API", () => {
  it("should return empty blog list", async () => {
    const res = await request(app).get("/api/blogs");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("should fail to create blog without file", async () => {
    const res = await request(app)
      .post("/api/blogs")
      .send({ title: "Test Blog" });

    expect(res.statusCode).toBe(400);
  });

  it("should create blog with file", async () => {
    const res = await request(app)
      .post("/api/blogs")
      .field("title", "Test Blog")
      .attach("file", Buffer.from("test content"), "test.txt");

    expect(res.statusCode).toBe(201);
  });

  it("should toggle like", async () => {
    const blog = await Blog.create({
      title: "Like Test",
      author: new mongoose.Types.ObjectId(),
      filename: "a.txt",
      filepath: "uploads/a.txt",
      likes: [],
    });

    const res = await request(app)
      .patch(`/api/blogs/${blog._id}/like`);

    expect(res.statusCode).toBe(200);
  });

  it("should delete blog", async () => {
    const blog = await Blog.create({
      title: "Delete Test",
      author: new mongoose.Types.ObjectId(),
      filename: "a.txt",
      filepath: "uploads/a.txt",
      likes: [],
    });

    const res = await request(app)
      .delete(`/api/blogs/${blog._id}`);

    expect(res.statusCode).toBe(200);
  });
});