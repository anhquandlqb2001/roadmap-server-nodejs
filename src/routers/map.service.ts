import express from "express";
import {
  startMap,
  getMap,
  updateMap,
  starMap
} from "../controllers/map.service";

const router = express.Router();

// // binh chon road
router.put("/:mapId/star", starMap);

// lay thong tin road
router.get("/:mapId", getMap);


// bat dau road moi
router.post("/:mapId", startMap);

// // cap nhat lo trinh
router.put("/:mapId", updateMap);

export default router;
