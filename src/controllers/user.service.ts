import { Request, Response } from "express";
import { COOKIE_NAME } from "../lib/util/constants";
import UserModel from '../models/user'

// GET: Kiem tra thong tin nguoi dung trong session neu ton tai
export const current = async (req: Request, res: Response) => {
  const userId = req.session.userId;
  if (!userId) return res.json({ user: null });

  const user = await UserModel.findById(userId);
  if (!user) {
    return res.json({ user: null });
  }

  const mapArr = user.maps.map((map) => {
    return { mapHasStarted: map.mapId, ownerMapId: map._id };
  });

  return res.json({
    success: true,
    user: {
      email: user.email,
      jwt: user?.jwt,
      provider: user.provider,
    },
    map: mapArr,
  });
};

// POST: Dang xuat
export const logout = (req: Request, res: Response) => {
  return new Promise((_, __) => {
    req.session.destroy((err: any) => {
      res.clearCookie(COOKIE_NAME);
      if (err) {
        return res.status(500).json({ message: "fail: ", err });
      }
      return res.json({ message: "ok" });
    });
  });
};
