import { Request, Response } from "express";
import { formValidate } from "../lib/util/formValidate";
import findOneAndUpdateOrCreate from "../lib/util/findOneAndUpdateOrCreate";
import User from "../models/user.model";
import logoutFn from "../lib/util/logout";
import {
  IFormDataToClientFail,
  IFormDataToClientSuccess,
  EProvider,
} from "../lib/types/form.type";

import { IDataCurrentUserToClient } from "../lib/types/user.type";
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        errors: [
          { name: "email", error: "Sai tai khoan hoac mat khau" },
          { name: "password", error: "Sai tai khoan hoac mat khau" },
        ],
      } as IFormDataToClientFail);
    }

    // Kiem tra mat khau
    if (!(await user.verifyPassword(password))) {
      return res.json({
        success: false,
        errors: [{ name: "password", error: "Sai mat khau" }],
      } as IFormDataToClientFail);
    }

    // dang nhap thanh cong
    req.session.userId = user._id;
    return res.json({
      success: true,
      data: { email: user.email, provider: user.provider },
    } as IFormDataToClientSuccess);
  }

  // POST: Dang nhap voi facebook
  async login_facebook(req: Request, res: Response) {
    const user = await findOneAndUpdateOrCreate(req.body);
    // dang nhap thanh cong
    req.session.userId = user._id;
    return res.json({
      success: true,
      data: { email: user.email, provider: EProvider.Facebook },
    } as IFormDataToClientSuccess);
  }

  // GET: Kiem tra thong tin nguoi dung trong session neu ton tai
  async current(req: Request, res: Response) {
    const userId = req.session.userId;
    if (!userId) return res.json({ user: null });

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ user: null });
    }

    const extend = {
      name: user.extend?.name,
      picture: user.extend?.picture,
    };

    const mapArr = user.maps.map((map) => {
      return { mapHasStarted: map.mapId, ownerMapId: map._id };
    });

    return res.json({
      success: true,
      user: {
        email: user.email,
        extend: extend,
        jwt: "aloalo123",
        provider: user.provider,
      },
      map: mapArr
    } as IDataCurrentUserToClient);
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
    const _user = await User.findOne({ email });
    if (_user) {
      return res.json({
        success: false,
        errors: [{ name: "email", error: "Email da ton tai" }],
      } as IFormDataToClientFail);
    }

    // thuc hien tao user moi
    const user = new User();
    user.email = email;
    user.password = password;
    user.provider = EProvider.Local;
    await user.save();

    return res.json({
      success: true,
      message: "Dang ky tai khoan thanh cong",
    });
  }

  // POST: Dang xuat
  logout(req: Request, res: Response) {
    return logoutFn(req, res);
  }
}

export default new UserController();
