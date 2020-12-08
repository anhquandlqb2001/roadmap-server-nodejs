import express from "express";
import {loginFacebook, loginLocal, register} from "../controllers/user";

const router = express.Router();

router.post("/login_local", loginLocal);

router.post("/login_facebook", loginFacebook)

router.post("/register", register);

export default router;
