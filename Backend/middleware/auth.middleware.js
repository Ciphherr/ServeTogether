import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded = { id: "...", iat, exp }

    const user = await User.findById(decoded.id).lean();

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // ✅ full Mongo user
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
export default authMiddleware;
