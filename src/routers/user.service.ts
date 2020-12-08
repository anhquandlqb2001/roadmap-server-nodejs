import { Router } from "express";
import { current, logout } from "../controllers/user.service";

const router = Router();

router.get("/current", current);

router.post("/logout", logout);

export default router