import express from 'express'
import isAuth from '../middlewares/isAuth'
import RoadMapController from '../controllers/roadmap'

const router = express.Router()

// router.post("/add_map", RoadMapController.add_road)


// ghji chu
router.post("/:id/:ownerMapID/note", RoadMapController.note_post)

// tra loi binh luan
router.put("/:id/comment/:commentID/reply", isAuth, RoadMapController.reply_comment)

// vote binh luan
router.put("/:id/comment/:commentID/vote", isAuth, RoadMapController.vote_comment)

// them binh luan
router.put("/:id/comment", isAuth, RoadMapController.add_comment)

// binh chon road
router.put("/:id/star", isAuth, RoadMapController.star_map)

// lay thong tin road
router.get("/:id/info", RoadMapController.get_map)

// lay danh sach road
router.get("/list", RoadMapController.get_list_road)

// bat dau road moi
router.put("/:id/start", isAuth, RoadMapController.start_map)

//

// cap nhat lo trinh
router.put("/:id/:ownerMapID", RoadMapController.change_field_map)


router.get("/:id/:ownerMapID", RoadMapController.get_note)


export default router