import express from "express";
import {
  loginFacebook,
  loginLocal,
  register,
  current,
} from "../controllers/user";
import passport from "passport";

const router = express.Router();

router.post("/login_local", loginLocal);

// router.post("/login_facebook", loginFacebook)

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook"),
  function (req, res) {
    req.session.userId = (req.user as any)._id
    res.redirect(process.env.CORS_ORIGIN)
  }
);

router.post("/register", register);

router.get("/", current);

export default router;
