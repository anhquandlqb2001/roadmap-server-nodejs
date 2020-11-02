import { Request, Response } from "express";
import Road from "../entities/Road";

class RoadMapController {
  async add_map(req: Request, res: Response) {
    await Road.insert({name: 'fontendroad'});
  }
}

export default new RoadMapController();
