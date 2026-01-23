import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import registrationRoutes from "./router/registration.route.js"
import connectDB from "./config/db.js";
import authRoutes from "./router/auth.route.js"

dotenv.config();

const app = express();
app.use(cookieParser());
connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
}));
app.use(express.json());

app.use("/api", registrationRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
