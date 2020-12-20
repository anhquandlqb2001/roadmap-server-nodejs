import { Application } from "express";
import isAuth from "../middlewares/isAuth";

import UserRouter from "./user";
import MapRouter from "./map";
import CommentRouter from './comment'

import MapServiceRouter from './map.service'
import UserServiceRouter from './user.service'
import CommentServiceRouter from './comment.service'

import AdminRouter from './admin'

const routes = (app: Application) => {
  app.use("/api/node/user", UserRouter);

  app.use("/api/node/map", MapRouter);

  app.use("/api/node/comment", CommentRouter);

  app.use("/api/node/service/map", isAuth, MapServiceRouter)

  app.use("/api/node/service/user", isAuth, UserServiceRouter)

  app.use("/api/node/service/comment", isAuth, CommentServiceRouter)

  app.use("/api/node/admin", AdminRouter)

};

export default routes;
