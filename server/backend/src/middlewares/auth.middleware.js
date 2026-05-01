import jwt from "jsonwebtoken";

// 🔐 Protect routes
export const protect = (req, res, next) => {
  try {
    // ✅ TEST MODE BYPASS
    if (process.env.NODE_ENV === "test") {
      req.user = { id: "testUserId" }; // simple mock
      return next();
    }

    let token;

    // Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // No token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};