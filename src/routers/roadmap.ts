import express from "express";
import isAuth from "../middlewares/isAuth";
import {
  addComment,
  starMap,
  startMap,
  addRoad,
  notePost,
  replyComment,
  voteComment,
  getListRoad,
  getMap,
  getNote,
  changeFieldMap,
  getTest,
  postTest
} from "../controllers/roadmap";

const router = express.Router();

router.post("/add_map", addRoad);

// ghji chu
router.post("/:mapId/:ownerMapId/note", notePost);

// tra loi binh luan
router.put("/:mapId/comment/:commentId/reply", isAuth, replyComment);

// vote binh luan
router.put("/:mapId/comment/:commentId/vote", isAuth, voteComment);

// them binh luan
router.put("/:mapId/comment", isAuth, addComment);

// binh chon road
router.put("/:mapId/star", isAuth, startMap);

// lay thong tin road
router.get("/:mapId/info", getMap);

// lay danh sach road
router.get("/list", getListRoad);

// bat dau road moi
router.put("/:mapId/start", isAuth, startMap);

// cap nhat lo trinh
router.put("/:mapId/:ownerMapId", changeFieldMap);

// lay ghi chu
router.get("/:mapId/:ownerMapId", getNote);


router.get("/test", getTest)

router.post("/test", postTest)

export default router;
