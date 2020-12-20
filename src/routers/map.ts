import express from "express";
import {
  getListMaps, getMapDocumentPathById, getMapInfo,
} from "../controllers/map";

const router = express.Router();

// lay danh sach road
router.get("/docs/:mapId", getMapDocumentPathById)

router.get("/:mapId", getMapInfo)

router.get("/", getListMaps);


export default router;
