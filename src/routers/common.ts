import express from "express";
import { getHomepageContent } from "../controllers/common";

const router = express.Router();

router.get("/homepage", getHomepageContent)

export default router;
