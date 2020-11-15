import express from 'express'
import isAuth from '../middlewares/isAuth'
import RoadMapController from '../controllers/roadmap'

const router = express.Router()

router.post("/add_map", RoadMapController.add_road)

router.post("/add_comment", isAuth, RoadMapController.add_comment)

router.post("/reply_comment", isAuth, RoadMapController.reply_comment)


router.post("/vote_comment", isAuth, RoadMapController.vote_comment)

router.post("/star_map", isAuth, RoadMapController.star_map)

export default router