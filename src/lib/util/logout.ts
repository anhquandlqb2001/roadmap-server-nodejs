import { COOKIE_NAME } from "./constants";

 const logout = (req: any, res: any) => {
  new Promise((_, __) => {
    req.session.destroy((err: any) => {
      res.clearCookie(COOKIE_NAME);
      if (err) {
        return res.status(500).json({ message: "fail: ", err });
      }
      return res.json({ message: "ok" });
    });
  });
} 

export default logout