import { Application } from 'express'
import UserRouter from './user'
import RoadMapRouter from './roadmap'

const routes = (app: Application) => {
  app.use("/api/node/user", UserRouter)

  app.use("/api/node/roadmap", RoadMapRouter)
}

export default routes