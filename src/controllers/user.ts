import { ErrorRequestHandler, Request, Response } from "express";

/* 
      /user/...
*/
class UserController {
  login(req: Request & { info: string }, res: Response) {
    if (req.info) {
      return res.json(req.info);
    }
    return res.json({message: "ok"})
  }

  // GET: Get current user if exist
  current(req: Request, res: Response) {
    return res.json({ userid: req.session.userID });
  }

  // POST
  register(req: Request, res: Response) {}
}

export default new UserController();
