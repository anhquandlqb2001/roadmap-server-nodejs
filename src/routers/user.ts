import express from "express";
import isAuth from "../middlewares/isAuth";
import UserController from "../controllers/user";

const router = express.Router();

router.post("/note", isAuth, UserController.note_post)


router.post("/login_local", UserController.login_local);

router.post("/login_facebook", UserController.login_facebook)

router.post("/register", UserController.register);

router.get("/current", UserController.current);

router.post("/logout", UserController.logout)

router.post("/startmap", UserController.start_map)

router.get("/get_map/:map", UserController.get_map)

// router.post("/:map", UserController.change_field_map)

router.post("/react", UserController.change_field_react_map)


export default router;
