import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import registrationRoutes from "./router/registration.route.js"
import connectDB from "./config/db.js";
import authRoutes from "./router/auth.route.js"
import certificateRouter from "./router/certificate.route.js"

dotenv.config();

const app = express();
app.use(cookieParser());
connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true, 
}));
app.use(express.json());

app.get("/" ,(req, res)=>{
  res.send("Backend is running");
});
app.use("/api", registrationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/certificates", certificateRouter)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
