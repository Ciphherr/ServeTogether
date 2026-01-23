import express from "express"
import {registerUser,loginUser,logoutUser} from "../controller/auth.controller.js"
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
  user: {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      contentstack_uid: req.user.contentstack_uid,
    },
  });
});

export default router;