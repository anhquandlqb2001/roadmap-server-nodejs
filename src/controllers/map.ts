import { Request, Response } from "express";
import Map from "../models/map";

export const getListMaps = async (req: Request, res: Response) => {
  try {
    const maps = await Map.find({}).select(["_id", "name", "introduction"]);
    if (maps.length <= 0) {
      return res.json({
        success: true,
        message: "Khong co lo trinh nao ton tai!",
      });
    }

    return res.json({ success: true, maps });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: error });
  }
};

export const getMapInfo = async (req: Request, res: Response) => {
  const mapId = req.params.mapId;
  if (!mapId) {
    return res
      .status(404)
      .json({ success: false, message: "Khong tim thay lo trinh" });
  }
  try {
    const map = await Map.findById(mapId).select(["name", "description", "documentation", "introduction", "mapUrl"]);
    if (!map) {
      return res
        .status(404)
        .json({ success: false, message: "Khong tim thay lo trinh" });
    }

    return res.json({ success: true, data: map });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};

export const getMapDocumentPathById = async (req: Request, res: Response) => {
  try {
    const mapId = req.params.mapId;
    const map = await Map.findById(mapId).select("documentation");
    return res.json({ success: true, map });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};
