import { Request, Response } from "express";
import { COOKIE_NAME } from "../lib/util/constants";
import User from "../models/user";
import pushNotification from "../lib/util/pushNotification";
import recursiveSearch from "../lib/util/searchMapChange";
import Map from '../models/map'

// POST: Dang xuat
export const logout = (req: Request, res: Response) => {
  return new Promise((_, __) => {
    req.session.destroy((err: any) => {
      res.clearCookie(COOKIE_NAME);
      if (err) {
        return res.status(500).json({ success: false });
      }
      return res.json({ success: true });
    });
  });
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
    return res.json({
      success: true,
      message: "Cap nhat thanh cong",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error });
  }
};


export const handlePushNotificationSubscription = async (
  req: Request,
  res: Response
) => {
  const subscriptionRequest = req.body;
  const susbscriptionId = req.session.userId;
  await User.updateOne(
    { _id: susbscriptionId },
    { subscription: subscriptionRequest }
  );
  res.status(201).json({ id: susbscriptionId });
};

export const sendPushNotification = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(202).json({ success: true });
    const pushNotificationPromises = users.map(async (user) => {
      const payload = {
        title: "Lo trinh moi",
        text: `HEY ${
          users[0].email.split("@")[0]
        }! lotrinh vua cap nhat lo trinh moi. Xem ngay!`,
        image: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
        tag: "new-map",
        url: `/road/5fce651a4f9834cc1e3b135b`,
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
