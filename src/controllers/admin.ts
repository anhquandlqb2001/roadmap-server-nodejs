import Map from "../models/map";
import { Request, Response } from "express";
import Common from "../models/common";
import Admin from "../models/admin";
import { uploadMapImage } from "../lib/config/cloudinary.config";
import User from "../models/user";
import pushNotification from "../lib/util/pushNotification";

export const addRoad = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.json({ success: false });
    }
    const data = req.body;
    const result = await uploadMapImage(req.file.path);
    const map = new Map();
    map.name = data.name;
    map.introduction = data.introduction;
    map.description = {
      title: data.title,
      detail: data.detail,
      mapId: map._id,
    };
    map.documentation = {
      path: data.path,
      mapId: map._id,
    };

    map.map = data.map
    map.mapUrl = result.url;
    await map.save();
    res.json({ success: true });

    const users = await User.find({})
    const pushNotificationPromises = users.map(async (user) => {
      const payload = {
        title: `Lộ trình mới!!! ${map.name}`,
        text: `HEY ${
          users[0].email.split("@")[0]
        }! lotrinh vừa cập nhật lộ trình mới. Xem ngay!`,
        tag: "new-map",
        url: `/road/${map._id}`,
      };
      if (!user.subscription) {
        return;
      }
      const pushNotificationPromise = pushNotification(
        user.subscription,
        payload
      );
      return pushNotificationPromise
    });

    Promise.all(pushNotificationPromises);
  } catch (error) {
    return res.json({ success: false });
  }
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

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};

export const updateMapInfo = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const mapId = req.params.mapId;
    await Map.findByIdAndUpdate(mapId, data);
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};

export const auth = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const admin = await Admin.findOne({
      email: data.email,
      password: data.password,
    });
    return !admin ? res.json({ success: false }) : res.json({ success: true });
  } catch (error) {}
};

export const deleteMap = async (req: Request, res: Response) => {
  try {
    const mapId = req.params.mapId;

    await Map.deleteOne({ _id: mapId });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false });
  }
};
