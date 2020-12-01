import { NextFunction, Request, Response } from "express"

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const userID = req.session.userId
  if (!userID) {
    return res.status(404).json({success: false, message: "Ban phai dang nhap moi co the su dung chuc nang nay"})
  }
  return next(null)
}

export default isAuth