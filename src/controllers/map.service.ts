import { Request, Response } from "express";
import recursiveSearch from "../lib/util/searchMapChange";
import User from "../models/user";
import Map from "../models/map";

export const starMap = async (req: Request, res: Response) => {
  try {
    const mapId = req.params.mapId;
    const map = await Map.findById(mapId).select(["stars"]);
    if (!map)
      return res
        .status(404)
        .json({ success: false, message: "Khong ton tai lo trinh nay!" });

    const userId = req.session.userId;
    if (map.stars.findIndex((star) => star.toString() === userId) === -1) {
      map.stars.push(userId);
    } else {
      map.stars = map.stars.filter((star) => star.toString() !== userId);
    }
    await map.save();
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error });
  }
};

export const startMap = async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId;
    const mapId = req.params.mapId;
    if (!mapId) {
      return res.status(404);
    }

    const map = await Map.findById(mapId).select(["map"]);
    if (!map) {
      return res
        .status(404)
        .json({ success: false, message: "Khong tim thay lo trinh nay" });
    }
    const user = await User.findById(userId);

    if (user.maps.findIndex((map) => map.mapId.toString() === mapId) !== -1) {
      return res.json({
        success: false,
        message: "Ban da bat dau lo trinh nay roi!",
      });
    }

    user.maps.push({ mapId, map: map.map });

    await user.save();
    return res.json({
      success: true,
      message: "Bat dau lo trinh moi thanh cong",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error });
  }
};

export const getMap = async (req: Request, res: Response) => {
  const userId = req.session.userId;
  const mapId = req.params.mapId;

  if (!mapId) {
    return res
      .status(404)
      .json({ success: false, message: "Khong tim thay lo trinh nay" });
  }

  const map = await User.findOne({
    _id: userId,
    "maps.mapId": mapId,
  }).select(["maps.$"]);

  if (!map) {
    return res.json({
      success: false,
      message: "Ban chua bat dau lo trinh nay",
    });
  }
  return res.json({
    success: true,
    data: {
      map: JSON.parse(map.maps[0].map),
      ownerMapId: map.maps[0]._id,
    },
  });
};

export const updateMap = async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId;
    const mapId = req.params.mapId;

    if (!mapId) {
      return res.status(404).json({ success: false });
    }
    //  stringify
    const user = await User.findOne({
      _id: userId,
      "maps.mapId": mapId,
    }).select(["maps.$"]);
    if (!user) return res.status(404).json({ success: false });

    const { fieldChange, currentValue } = req.body;

    if (!fieldChange || !currentValue.toString()) {
      return res.json({ success: false });
    }

    const newMap = recursiveSearch(
      JSON.parse(user.maps[0].map),
      fieldChange,
      !currentValue
    );

    await User.findOneAndUpdate(
      { _id: userId, "maps.mapId": mapId },
      { $set: { "maps.$.map": JSON.stringify(newMap) } }
    );

    // await user.save();

    return res.json({
      success: true,
      message: "Cap nhat thanh cong",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error });
  }
};
