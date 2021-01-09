import Map from "../models/map";
import mongoose from "mongoose";
import { PHPRoad, ReactRoad } from "../lib/util/maps";
import { Request, Response } from "express";
import Common from "../models/common";

export const addRoad = async (req: Request, res: Response) => {
  const map = new Map();
  map._id = mongoose.Types.ObjectId("5fce651a4f9834cc1e3b135b");
  map.name = "PHP";
  map.introduction = "A complete road to become a PHP developer";
  map.description = {
    title: "Complete PHP Road",
    detail: "Become a PHP developer",
    mapId: "5fce651a4f9834cc1e3b135b",
  };
  map.documentation = {
    path: "https://paq19it5.github.io/roadmap-docs/php.md",
    mapId: "5fce651a4f9834cc1e3b135b",
  };

  map.map = JSON.stringify(PHPRoad);
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
