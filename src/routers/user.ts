import express from "express";
import {loginFacebook, loginLocal, logout, current, register} from "../controllers/user";

const router = express.Router();

// router.post("/note", isAuth, UserController.note_post)


router.post("/login_local", loginLocal);

router.post("/login_facebook", loginFacebook)

router.post("/register", register);

router.get("/current", current);

router.post("/logout", logout)



// router.post("/:map", UserController.change_field_map)

// router.post("/react", UserController.change_field_react_map)


export default router;
