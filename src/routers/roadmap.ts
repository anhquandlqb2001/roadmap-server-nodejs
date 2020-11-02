import express from 'express'
import RoadMapController from '../controllers/roadmap'

const router = express.Router()

router.post("/add_map", RoadMapController.add_map)



export default router