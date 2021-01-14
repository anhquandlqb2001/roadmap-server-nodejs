import { Request, Response } from "express";
import { COOKIE_NAME } from "../lib/util/constants";



// POST: Dang xuat
export const logout = (req: Request, res: Response) => {
  return new Promise((_, __) => {
    req.session.destroy((err: any) => {
      res.clearCookie(COOKIE_NAME);
      if (err) {
        return res.status(500).json({ success: false });
      }
      return res.json({ success: true });
    });
  });
};
