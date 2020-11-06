import { Request, Response } from "express";
import { formValidate } from "../lib/util/formValidate";
import {
  EProvider,
  IResponseError,
  IResponseServer,
  IResponseLoginSuccess,
  IResponseCurrentUser,
} from "../lib/types/user.type";
import findOneAndUpdateOrCreate from "../lib/util/findOneAndUpdateOrCreate";
import mongoose from "mongoose";
import User from "../entities/User";
import { ReactRoad } from "../lib/util/maps";
import recursiveSearch from "../lib/util/searchMapChange";
import { EMap } from "../lib/types/map.type";
import logoutFn from "../lib/util/logout";

/**
 * /user/...
 **/

// kiem tra xem nguoi dung da dang ki lo trinh chua
// neu chua => return false
function checkStartMap(user: User, map: EMap) {
  switch (map) {
    case EMap.React:
      if (user.maps?.react) return { isTrue: true, _map: user.maps?.react };
      break;
    case EMap.FrontEnd:
      if (user.maps?.frontend)
        return { isTrue: true, _map: user.maps?.frontend };
      break;

    default:
      return { isTrue: false, _map: null };
  }
}

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
        success: false,
        errors: [
          { name: "email", error: "Sai tai khoan hoac mat khau" },
          { name: "password", error: "Sai tai khoan hoac mat khau" },
        ],
      } as IResponseError);
    }

    // Kiem tra mat khau
    if (!(await user.verifyPassword(password))) {
      return res.json({
        success: false,
        errors: [{ name: "password", error: "Sai mat khau" }],
      } as IResponseError);
    }

    // dang nhap thanh cong
    req.session.userID = user._id;
    return res.json({
      success: true,
      data: { email: user.email },
    } as IResponseLoginSuccess);
  }

  // POST: Dang nhap voi facebook
  async login_facebook(req: Request, res: Response) {
    const user = await findOneAndUpdateOrCreate(req.body);
    // dang nhap thanh cong
    req.session.userID = user._id;
    return res.json({
      success: true,
      data: { email: user.email },
    } as IResponseLoginSuccess);
  }

  // GET: Kiem tra thong tin nguoi dung trong session neu ton tai
  async current(req: Request, res: Response) {
    const userID = req.session.userID;
    if (!userID) return res.json({ userid: null });
    const user = await User.findOne({
      where: { _id: mongoose.Types.ObjectId(userID) },
    });
    if (!user) {
      return res.json({ success: false, user: null });
    }
    const extend = {
      name: user.extend?.name,
      picture: user.extend?.picture,
    };

    return res.json({
      success: true,
      user: {
        email: user.email,
        extend: extend,
        jwt: "aloalo123",
        provider: user.provider,
      },
    } as IResponseCurrentUser);
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
        success: false,
        errors: [{ name: "email", error: "Email da ton tai" }],
      } as IResponseError);
    }

    // thuc hien tao user moi
    try {
      const user = User.create({ email, password, provider: EProvider.Local });
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
    return logoutFn(req, res);
  }

  //
  async start_map(req: Request, res: Response) {
    const map = req.body.map;
    if (!map) {
      return res.status(404);
    }
    const userID = req.session.userID;
    let user;
    switch (map) {
      case EMap.React:
        user = await User.findOne({
          where: { _id: mongoose.Types.ObjectId(userID) },
        });
        break;

      default:
        break;
    }

    user.maps = { ...user.maps, react: ReactRoad as any };

    await user.save();
    return res.json({
      success: true,
      message: "Bat dau lo trinh moi thanh cong",
    } as IResponseServer);
  }

  async get_map(req: Request, res: Response) {
    const userID = req.session.userID;
    const map = req.params.map;
    const user = await User.findOne({
      where: { _id: mongoose.Types.ObjectId(userID) },
    });
    if (!user) {
      return logoutFn(req, res);
    }
    const { isTrue, _map } = checkStartMap(user, map as any);
    if (!isTrue) {
      return res.json({
        success: false,
        message: "Ban chua dang ky lo trinh nay",
      } as IResponseServer);
    }
    return res.json({
      success: true,
      map: _map,
    } as IResponseServer);
  }

  async change_field_react_map(req: Request, res: Response) {
    const userID = req.session.userID;
    const userObjectID = mongoose.Types.ObjectId(userID);
    const user = await User.findOne({ where: { _id: userObjectID } });

    const newMap = recursiveSearch(
      user.maps.react,
      req.body.field,
      !req.body.currentValue
    );
    await User.update({ _id: userObjectID }, { maps: { react: newMap } });

    return res.json("update success");
  }

  async change_field_map(req: Request, res: Response) {
    const userID = req.session.userID;
    const userObjectID = mongoose.Types.ObjectId(userID);
    const map = req.params.map;

    const user = await User.findOne({ where: { _id: userObjectID } });
    if (!user) return logoutFn(req, res);

    const { isTrue, _map } = checkStartMap(user, map as any);

    if (!isTrue) {
      return res.json({
        success: false,
        message: "Ban chua dang ky lo trinh nay",
      } as IResponseServer);
    }

    const newMap = recursiveSearch(_map, req.body.field, !req.body.currentValue);
    await User.update({ _id: userObjectID }, { maps: { react: newMap } });

    return res.json({
      success: true,
      message: "Cap nhat thanh cong",
    } as IResponseServer);
  }
}

export default new UserController();
