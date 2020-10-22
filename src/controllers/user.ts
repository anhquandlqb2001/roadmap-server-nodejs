import { Request, Response } from "express";

/* 
      /user/...
*/
class UserController {
  
  // POST
  login(req: Request, res: Response) {
    req.session.res.json({
      errors: [
        { name: ["email"], errors: ["email has not exist"] },
        { name: ["password"], errors: ["wrong password"] },
      ],
    });
  }

  // GET: Get current user if exist
  current(req: Request, res: Response) {
    return res.json({ userid: req.session.userID });
  }

  // POST
  register(req: Request, res: Response) {

  }
}

export default new UserController();
