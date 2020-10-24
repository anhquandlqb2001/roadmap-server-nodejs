import express from "express";
import UserController from "../controllers/user";

const router = express.Router();

router.post("/login_local", UserController.login_local);

router.post("/login_facebook", UserController.login_facebook)

router.post("/register", UserController.register);

router.get("/current", UserController.current);

router.post("/logout", UserController.logout)

export default router;
