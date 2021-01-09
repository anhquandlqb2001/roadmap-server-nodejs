import express from "express";
import { addRoad, updateHomepageContent, updateMapInfo } from "../controllers/admin";

const router = express.Router();

router.post("/road", addRoad);

router.post("/homepage", updateHomepageContent);

router.put("/map/:mapId", updateMapInfo)

export default router;
