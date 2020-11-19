import express from 'express'
import isAuth from '../middlewares/isAuth'
import RoadMapController from '../controllers/roadmap'

const router = express.Router()

// router.post("/add_map", RoadMapController.add_road)

// them binh luan
router.put("/:id/comment", isAuth, RoadMapController.add_comment)

// tra loi binh luan
router.put("/:id/comment/:commentID/reply", isAuth, RoadMapController.reply_comment)

// vote binh luan
router.put("/:id/comment/:commentID/vote", isAuth, RoadMapController.vote_comment)

// binh chon road
router.put("/:id/star", isAuth, RoadMapController.star_map)

// lay du lieu road
router.get("/list", RoadMapController.get_list_road)

// bat dau road moi
router.put("/:id/start", isAuth, RoadMapController.start_map)

//
router.get("/:id", isAuth, RoadMapController.get_map)

// cap nhat lo trinh
router.put("/:id/:idMap", RoadMapController.change_field_map)

// ghji chu
router.post("/:id/:ownerMapID/note", RoadMapController.note_post)

router.get("/:id/:ownerMapID", RoadMapController.get_note)


export default router