import { Router } from "express";
import {
  getMap,
  handlePushNotificationSubscription,
  logout,
  sendPushNotification,
  startMap,
  updateMap,
} from "../controllers/user.service";

const router = Router();

router.get("/subscription/:subscriptionId", sendPushNotification);

router.post("/subscription", handlePushNotificationSubscription);

router.post("/logout", logout);

// lay thong tin road
router.get("/:mapId", getMap);

// bat dau road moi
router.post("/:mapId", startMap);

// // cap nhat lo trinh
router.put("/:mapId", updateMap);

export default router;
