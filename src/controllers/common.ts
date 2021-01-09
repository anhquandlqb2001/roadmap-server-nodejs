import { Request, Response } from "express";
import Common from "../models/common";

export const getHomepageContent = async (req: Request, res: Response) => {
  try {
    const data = await Common.findOne({});
    // const cm = await Common.findOne({}, { upsert: true });
    // cm.heading = heading;
    // cm.detail = detail;
    // await cm.save();
    return res.json({ success: true, data });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};
