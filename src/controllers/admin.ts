import Map from "../models/map";
import mongoose from "mongoose";
import { LaravelRoutingMap, PHPRoad, ReactRoad, TestMap } from "../lib/util/maps";
import { Request, Response } from "express";
import Common from "../models/common";

export const addRoad = async (req: Request, res: Response) => {
  const map = new Map();
  map._id = mongoose.Types.ObjectId("5ffd771da2da5438b5a83447");
  map.name = "test";
  map.introduction = "A complete road to become a REACT developer";
  map.description = {
    title: "Complete REACT Road",
    detail: "Become a REACT developer",
    mapId: "5ffd771da2da5438b5a83447",
  };
  map.documentation = {
    path: "https://paq19it5.github.io/roadmap-docs/php.md",
    mapId: "5ffd771da2da5438b5a83447",
  };

  map.map = JSON.stringify(LaravelRoutingMap);
  await map.save();
  res.json({ success: true });
};

export const updateHomepageContent = async (req: Request, res: Response) => {
  try {
    const { heading, detail } = req.body;
    console.log(req.body.heading);
    await Common.findOneAndUpdate(
      {},
      { heading: heading, detail: detail },
      { upsert: true }
    );
    // const cm = await Common.findOne({}, { upsert: true });
    // cm.heading = heading;
    // cm.detail = detail;
    // await cm.save();
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};


export const updateMapInfo = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const mapId = req.params.mapId
    await Map.findByIdAndUpdate(mapId,
      data
    );
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};
