import { Application } from "express";
import isAuth from "../middlewares/isAuth";
import UserRouter from "./user";
import MapRouter from "./map";
import MapServiceRouter from './map.service'
import UserServiceRouter from './user.service'
import CommentServiceRouter from './comment.service'


const routes = (app: Application) => {
  app.use("/api/node/user", UserRouter);

  app.use("/api/node/road", MapRouter);

  app.use("/api/node/service/road", isAuth, MapServiceRouter)

  app.use("/api/node/service/user", isAuth, UserServiceRouter)

  app.use("/api/node/service/comment", isAuth, CommentServiceRouter)

};

export default routes;
