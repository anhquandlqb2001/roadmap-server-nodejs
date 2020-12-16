import Map from "../models/map";
import mongoose from "mongoose";
import { PHPRoad, ReactRoad } from "../lib/util/maps";
import { Request, Response } from "express";

export const addRoad = async (req: Request, res: Response) => {
  const map = new Map();
  map._id = mongoose.Types.ObjectId("5fb12e6e581d3b79b1362e13");
  map.name = "REACT";
  map.introduction = "A complete road to become a React developer"
  map.description = {
    title: "Complete React Road",
    detail: "Become a React developer",
    mapId: "5fb12e6e581d3b79b1362e13"
  }
  map.map = JSON.stringify(ReactRoad);
  await map.save();
  res.json({ success: true });
};
