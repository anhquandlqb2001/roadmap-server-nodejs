import { Request, Response } from "express";
import { formValidate } from "../lib/util/formValidate";
import { FormErrorResponse } from "../lib/types/user.type";
import { COOKIE_NAME } from "../lib/util/constants";
import findOneAndUpdateOrCreate from "../lib/util/findOneAndUpdateOrCreate";
import mongoose from "mongoose";
import User from "../entities/User";
import { ReactRoad } from "../lib/util/maps";
import recursiveSearch from "../lib/util/searchMapChange";

/**
 * /user/...
 **/
class UserController {
  // POST: Dang nhap voi tai khoan local
  async login_local(req: Request, res: Response) {
    const { email, password } = req.body;
    // kiem tra thong tin dang nhap
    const errors = formValidate(email, password);
    if (errors) {
      return res.json(errors);
    }

    // Kiem tra email co ton tai
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.json({
        errors: [
          { name: "email", errors: "Sai tai khoan hoac mat khau" },
          { name: "password", errors: "Sai tai khoan hoac mat khau" },
        ],
      } as FormErrorResponse);
    }

    // Kiem tra mat khau
    if (!(await user.verifyPassword(password))) {
      return res.json({
        errors: [{ name: "password", errors: "Sai mat khau" }],
      } as FormErrorResponse);
    }

    // dang nhap thanh cong
    req.session.userID = user._id;
    return res.json({ message: "ok" });
  }

  // POST: Dang nhap voi facebook
  async login_facebook(req: Request, res: Response) {
    const user = await findOneAndUpdateOrCreate(req.body);
    // dang nhap thanh cong
    req.session.userID = user._id;
    return res.json({ success: true });
  }

  // GET: Kiem tra thong tin nguoi dung trong session neu ton tai
  async current(req: Request, res: Response) {
    const userID = req.session.userID;
    if (!userID) return res.json({ userid: null });
    const user = await User.findOne({
      where: { _id: mongoose.Types.ObjectId(userID) },
    });
    if (!user) {
      return res.json({ user: null });
    }
    const extend = {
      name: user.extend?.name,
      picture: user.extend?.picture,
    };

    return res.json({ email: user.email, extend: extend });
  }

  // POST: Dang ky - Provider: local
  async register(req: Request, res: Response) {
    const { email, password } = req.body;
    const errors = formValidate(email, password);
    // kiem tra thong tin dang nhap
    if (errors) {
      return res.json(errors);
    }

    // kiem tra xem email da ton tai chua
    const _user = await User.findOne({ where: { email } });
    if (_user) {
      return res.json({
        errors: [{ name: "email", errors: "Email da ton tai" }],
      } as FormErrorResponse);
    }

    // thuc hien tao user moi
    try {
      const user = User.create({ email, password, provider: "local" });
      await user.save();
    } catch (error) {
      console.log(error);
      return error;
    }
    return res.json({
      success: true,
      message: "Dang ky tai khoan thanh cong",
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

  async react_start(req: Request, res: Response) {
    console.log("here");
    const userID = req.session.userID;
    const user = await User.findOne({
      where: { _id: mongoose.Types.ObjectId(userID) },
    });
    user.maps = { ...user.maps, reactroad: ReactRoad as any };

    await user.save();
  }

  async get_react_map(req: Request, res: Response) {
    const userID = req.session.userID;
    const user = await User.findOne({
      where: { _id: mongoose.Types.ObjectId(userID) },
    });

    if (!user.maps?.reactroad) {
      return res.json({
        success: false,
        message: "Ban chua dang ky lo trinh nay",
      });
    }
    return res.json({
      success: true,
      data: user.maps.reactroad,
    });
  }

  async change_field_react_map(req: Request, res: Response) {
    const userID = req.session.userID;
    const userObjectID = mongoose.Types.ObjectId(userID);
    const user = await User.findOne({ where: { _id: userObjectID } });

    const newMap = recursiveSearch(
      user.maps.reactroad,
      req.body.field,
      !req.body.currentValue
    );
    await User.update({ _id: userObjectID }, { maps: { reactroad: newMap } });

    return res.json("update success");
  }
}

export default new UserController();
