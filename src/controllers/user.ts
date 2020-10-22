import { Request, Response } from "express";

/* 
      /user/...
*/
class UserController {

  // POST
  login(req: Request, res: Response) {
    return res.json({
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
    console.log("hello im a test branch register");
    console.log("hello im a test branch register");
    console.log("hello im a test branch register");
    console.log("hello im a test branch register");
    
  }
}

export default new UserController();
