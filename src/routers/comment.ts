import express from "express";
import {getComment
} from "../controllers/comment";

const router = express.Router();

router.get("/:mapId/:page", getComment);

export default router;
