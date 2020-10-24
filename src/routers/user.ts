import express from "express";
import UserController from "../controllers/user";
import User from "../models/user";

const router = express.Router();

router.post("/login", UserController.login);

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
  return res.json({ message: "ok" });
});

router.get("/current", UserController.current);

router.post("/logout", UserController.logout)

export default router;
