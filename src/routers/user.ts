import express from "express";
import authenticateLocal from "../middlewares/authenticateLocal";
import UserController from "../controllers/user";
import User from "../models/user";

const router = express.Router();

router.post("/login", authenticateLocal, UserController.login);

router.post("/register", async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
  } catch (error) {
    console.log(error);
    
  }
  return res.json({message: "ok"})
})

router.get("/current", UserController.current);

export default router;
