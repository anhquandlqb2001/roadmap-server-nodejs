import { Request, Response } from "express";
import { EMap } from "../lib/types/map.type";
import Road from "../entities/Road";

class RoadMapController {
  async add_map(req: Request, res: Response) {
    const map: EMap = req.body.map;
    if (!map) {
      return res.status(404);
    }
    await Road.insert({ name: map });
  }
}

export default new RoadMapController();
