import { Request, Response } from "express";
import { COOKIE_NAME } from "../lib/util/constants";
import User from "../models/user";
import pushNotification from "../lib/util/pushNotification";

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

export const handlePushNotificationSubscription = async (
  req: Request,
  res: Response
) => {
  const subscriptionRequest = req.body;
  const susbscriptionId = req.session.userId;
  // subscriptions[susbscriptionId] = subscriptionRequest;
  await User.updateOne(
    { _id: susbscriptionId },
    { subscription: subscriptionRequest }
  );
  res.status(201).json({ id: susbscriptionId });
};

export const sendPushNotification = async (req: Request, res: Response) => {
  try {
    // const subscriptionId = req.params.subscriptionId;
    // const userId = req.session.userId;
    // const pushSubscription = subscriptions[subscriptionId];
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
