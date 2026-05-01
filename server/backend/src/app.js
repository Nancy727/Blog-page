import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import blogRoutes from "./routes/blog.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/blogs", blogRoutes);

// Error handler
app.use("/api/users", userRoutes);
app.use(errorHandler);

export default app;