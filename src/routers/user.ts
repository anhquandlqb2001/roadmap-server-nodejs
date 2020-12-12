import express from "express";
import {loginFacebook, loginLocal, register, current} from "../controllers/user";

const router = express.Router();

router.post("/login_local", loginLocal);

router.post("/login_facebook", loginFacebook)

router.post("/register", register);

router.get("/current", current);

export default router;
