import Map from "../models/map";
import mongoose from "mongoose";
import { PHPRoad } from "../lib/util/maps";
import { Request, Response } from "express";

export const addRoad = async (req: Request, res: Response) => {
  const map = new Map();
  map._id = mongoose.Types.ObjectId("5fce651a4f9834cc1e3b135b");
  map.name = "PHP";
  map.map = JSON.stringify(PHPRoad);
  await map.save();
  res.json({ success: true });
};
