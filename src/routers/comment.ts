import express from "express";
import { getComment, getReply } from "../controllers/comment";

const router = express.Router();

router.get("/:mapId/:page", getComment);

router.get("/:mapId/:commentId/reply/:page", getReply);

export default router;
