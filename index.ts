import "reflect-metadata";
import express from "express";
import Routes from "./src/routers";
import appConfig from "./src/lib/config/app.config";
import mongoose from 'mongoose'

const main = async () => {
  mongoose.connect(process.env.DATABASE_URI_DEV, {
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
