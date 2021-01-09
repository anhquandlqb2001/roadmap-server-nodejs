import "reflect-metadata";
import express from "express";
import Routes from "./routers";
import appConfig from "./lib/config/app.config";
import mongoose from 'mongoose'
import config from './lib/config/endpoints.config'

const main = async () => {
  
  
  mongoose.connect(config.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  
  const db = mongoose.connection
  
  db.on("error", () => console.log("error"))
  
  db.once("open", () => console.log("connected to database"))

  const app = express();
  const PORT = process.env.PORT || 5000;

  appConfig(app);
  Routes(app);
  app.listen(PORT, () => console.log(`server on localhost:${PORT}`));
};

main().catch((e) => console.log(e));
