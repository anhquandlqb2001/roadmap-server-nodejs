import { Application } from 'express'
import UserRouter from './user'

const routes = (app: Application) => {
  app.use("/api/user", UserRouter)
}

export default routes