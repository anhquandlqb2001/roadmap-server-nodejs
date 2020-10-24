import express from "express";
import mongoose from "mongoose";
import Routes from './routers'
import appConfig from './lib/config/app.config'

const app = express();
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection

db.on("error", () => console.log("error"))

db.once("open", () => console.log("connected to database"))

appConfig(app)

Routes(app)

// app.get("/", async (req, res) => {
//   UserReactRoad.findOne({}, (err, result) => {
//     if (err) {
//       return console.log(err);
//     }
//     return res.json(result);
//   });
// });



// app.post("/", async (req, res) => {
//   console.log(req.body);
//   const user = await UserReactRoad.findOne({ username: req.body.username });
//   const newUser = recursiveSearch(user, req.body.field, !req.body.currentValue);
//   await UserReactRoad.replaceOne({ username: req.body.username }, newUser);

//   return res.json("update success");
// });

console.log("Test");



app.listen(PORT, () => console.log(`server on localhost:${PORT}`));

