import { Router } from "express";
import { addComment, replyComment } from "../controllers/comment.service";
const router = Router();

router.post("/:mapId", addComment);

router.put("/:mapId/:commentId/reply", replyComment)

export default router;
