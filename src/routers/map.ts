import express from "express";
import {
  getListMaps, getMapInfo,
} from "../controllers/map";

const router = express.Router();

// lay danh sach road
router.get("/", getListMaps);

router.get("/:mapId", getMapInfo)

export default router;
