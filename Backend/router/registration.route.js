import express from "express";
import { registerForEvent } from "../controller/registration.controller.js";

const router = express.Router();

router.post("/register", registerForEvent);

export default router;
