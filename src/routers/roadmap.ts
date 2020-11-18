import express from 'express'
import isAuth from '../middlewares/isAuth'
import RoadMapController from '../controllers/roadmap'

const router = express.Router()

router.post("/add_map", RoadMapController.add_road)

// them binh luan
router.put("/:id/comment", isAuth, RoadMapController.add_comment)

// tra loi binh luan
router.put("/:id/comment/:commentID/reply", isAuth, RoadMapController.reply_comment)

// vote binh luan
router.put("/:id/comment/:commentID/vote", isAuth, RoadMapController.vote_comment)

// binh chon road
router.put("/:id/star", isAuth, RoadMapController.star_map)

// lay du lieu road
router.get("/:id/list", RoadMapController.get_list_road)

export default router