import express from "express";
import UserController from "../controllers/user";

const router = express.Router();

router.post("/login", UserController.login);
router.get("/current", UserController.current);

export default router;
