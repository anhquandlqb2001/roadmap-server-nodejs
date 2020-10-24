import { Request, Response } from "express";
import { formValidate } from "../lib/util/formValidate";
import IUser, { FormErrorResponse } from "../lib/types/user.type";
import { COOKIE_NAME } from "../lib/util/constants";
import UserModel from "../models/user";
import findOneOrCreate from "../lib/util/findOneOrCreate";

/* 
      /user/...
*/
class UserController {
  // POST: Dang nhap voi tai khoan local
  login_local(req: Request, res: Response) {
    const { email, password } = req.body;
    // kiem tra thong tin dang nhap
    const errors = formValidate(email, password);
    if (errors) {
      return res.json(errors);
    }

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

      // dang nhap thanh cong
      req.session.userID = user._id;
      return res.json({ message: "ok" });
    });
  }

  // POST: Dang nhap voi facebook
  async login_facebook(req: Request, res: Response) {
    const { email } = req.body;
    const user = await findOneOrCreate(email, req.body);
    
    // dang nhap thanh cong
    req.session.userID = user._id;
    return res.json({ message: "ok" });
  }

  // GET: Kiem tra thong tin nguoi dung trong session neu ton tai
  current(req: Request, res: Response) {
    console.log(req.session);
    if (!req.session.userID) return res.json({ userid: null });
    return res.json({ userid: req.session.userID });
  }

  // POST: Dang ky - Provider: local
  async register(req: Request, res: Response) {
    const { email, password, provider } = req.body;
    const errors = formValidate(email, password);
    // kiem tra thong tin dang nhap
    if (errors) {
      return res.json(errors);
    }

    await UserModel.findOne({ email: email }, async (err, result) => {
      if (err) console.log(err);
      if (result) {
        return res.json({
          errors: [{ name: ["email"], errors: ["Email da ton tai"] }],
        } as FormErrorResponse);
      }

      const user = new UserModel({ email, password, provider });
      try {
        await user.save();
      } catch (error) {
        return res.json({ error });
      }
      req.session.userID = user._id;
      return res.json({
        success: true,
        message: "Dang ky tai khoan thanh cong",
      });
    });
  }

  // POST: Dang xuat
  logout(req: Request, res: Response) {
    return new Promise((_, __) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          return res.status(500).json({ message: "fail: ", err });
        }
        return res.json({ message: "ok" });
      });
    });
  }
}

export default new UserController();
