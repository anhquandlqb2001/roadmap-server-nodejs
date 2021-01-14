import express from "express";
import { addRoad, updateHomepageContent, updateMapInfo, auth, deleteMap } from "../controllers/admin";
import {upload} from '../lib/config/multer.config'
const router = express.Router();

router.post("/map", upload.single("mapImage"), addRoad);

router.post("/homepage", updateHomepageContent);

router.put("/map/:mapId", updateMapInfo)

router.delete("/map/:mapId", deleteMap)

router.post("/auth", auth)

export default router;
