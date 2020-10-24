import { Request, Response } from "express";
import IUser, { FormErrorResponse } from "../lib/types/user.type";
import { COOKIE_NAME } from "../lib/util/constants";
import UserModel from "../models/user";

/* 
      /user/...
*/
class UserController {
  login(req: Request & { info: string }, res: Response) {
    const { email, password } = req.body;
    UserModel.findOne({ email: email }, function (err, user: IUser) {
      if (err) {
        return console.log(err);
      }
      if (!user) {
        return res.json({
          errors: [
            { name: ["email"], errors: ["Sai tai khoan hoac mat khau"] },
            { name: ["password"], errors: ["Sai tai khoan hoac mat khau"] },
          ],
        } as FormErrorResponse);
      }
      if (!user.verifyPassword(password)) {
        return res.json({
          errors: [{ name: ["password"], errors: ["Sai mat khau"] }],
        } as FormErrorResponse);
      }

      return res.json({ message: "ok" });
    });
  }

  // GET: Get current user if exist
  current(req: Request, res: Response) {
    if (!req.session.userID) return res.json({ userid: null });
    return res.json({ userid: req.session.userID });
  }

  // POST
  register(req: Request, res: Response) {}

  // POST: Logout
  logout(req: Request, res: Response) {
    return new Promise((_, __) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          return res.json({ message: "fail: ", err });
        }
        return res.json({ message: "ok" });
      });
    });
  }
}

export default new UserController();
