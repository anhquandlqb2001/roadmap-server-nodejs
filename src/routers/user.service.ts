import { Router } from "express";
import { logout } from "../controllers/user.service";

const router = Router();


router.post("/logout", logout);

export default router