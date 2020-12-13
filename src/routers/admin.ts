import express from "express";
import { addRoad } from "../controllers/admin";

const router = express.Router();

router.post("/road", addRoad);

export default router;
