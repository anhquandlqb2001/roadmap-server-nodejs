import express from 'express'
import isAuth from '../middlewares/isAuth'
import RoadMapController from '../controllers/roadmap'

const router = express.Router()

router.post("/add_map", RoadMapController.add_road)


// ghji chu
router.post("/:mapId/:ownerMapId/note", RoadMapController.note_post)

// tra loi binh luan
router.put("/:mapId/comment/:commentId/reply", isAuth, RoadMapController.reply_comment)

// vote binh luan
router.put("/:mapId/comment/:commentId/vote", isAuth, RoadMapController.vote_comment)

// them binh luan
router.put("/:mapId/comment", isAuth, RoadMapController.add_comment)

// binh chon road
router.put("/:mapId/star", isAuth, RoadMapController.star_map)

// lay thong tin road
router.get("/:mapId/info", RoadMapController.get_map)

// lay danh sach road
router.get("/list", RoadMapController.get_list_road)

// bat dau road moi
router.put("/:mapId/start", isAuth, RoadMapController.start_map)

//

// cap nhat lo trinh
router.put("/:mapId/:ownerMapId", RoadMapController.change_field_map)

// lay ghi chu
router.get("/:mapId/:ownerMapId", RoadMapController.get_note)


export default router