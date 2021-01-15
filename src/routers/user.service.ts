import { Router } from "express";
import { handlePushNotificationSubscription, logout, sendPushNotification } from "../controllers/user.service";

const router = Router();

router.post("/logout", logout);

router.get("/subscription/:subscriptionId", sendPushNotification)

router.post("/subscription", handlePushNotificationSubscription)

export default router