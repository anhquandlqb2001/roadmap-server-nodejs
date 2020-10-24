import { NextFunction, Request, Response } from "express";
import passport from "passport";
import IUser from "../lib/types/user.type";

const authenticateLocal = (
  req: Request & { info: string },
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("local", { session: false }, function (
    err,
    user: IUser,
    info
  ) {
    if (err) return next(err);
    if (info) {
      // console.log(info);
      req.info = info;
      return next();
    }

    if (!user) return res.redirect("/login");
    // return next()
    req.session.userID = user._id;
    console.log("session: ", req.session);
    console.log("user: ", req.user);
    
    req.logIn(user, function (err) {
      if (err) return next(err);
      return next();
    });
  })(req, res, next);
};

export default authenticateLocal;
