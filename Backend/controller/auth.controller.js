import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
import { generateToken } from "../utils/generateToken.js";
import stack from "../config/contentstack.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const csEntry = await stack
      .contentType("users_chirag")
      .entry()
      .create({
        entry: {
          title: `User - ${Date.now()}`,
          name,
          email,
        },
      });

    const contentstackUID = csEntry.uid;

    await csEntry.publish({
        publishDetails: {
          environments: ["cvp"], // 👈 your env UID
          locales: ["en-us"],
        },
    });

    await User.create({
      name,
      email,
      password: hashedPassword,
      contentstack_uid: contentstackUID,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Missing credentials" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login successful",   
      user: {
      id: user._id,
      email: user.email,
      name: user.name,
      }, 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
